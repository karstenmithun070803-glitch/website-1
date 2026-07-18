"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import type { StubHomePage, StubTourRoom } from "@/lib/stubContent";
import { createTourRenderer, type TourRenderer } from "@/lib/tourShader";
import { track } from "@/lib/analytics";

export function VirtualTour({ tour }: { tour: StubHomePage["tour"] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<TourRenderer | null>(null);
  const hiddenImgRef = useRef<HTMLImageElement>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const [webglAvailable, setWebglAvailable] = useState(true);

  const activeRoomRef = useRef<StubTourRoom | null>(null);
  const roomExitingRef = useRef(false);
  const roomOpenTimeRef = useRef(0);
  const [displayRoom, setDisplayRoom] = useState<StubTourRoom | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = createTourRenderer(canvas, tour.aerialImagePath);
    if (!renderer) {
      setWebglAvailable(false);
      return;
    }
    rendererRef.current = renderer;
    renderer.start();

    return () => {
      renderer.dispose();
      rendererRef.current = null;
    };
  }, [tour.aerialImagePath]);

  const openRoom = useCallback(
    (room: StubTourRoom, xPct: number, yPct: number) => {
      if (activeRoomRef.current || roomExitingRef.current) return;
      const renderer = rendererRef.current;
      const hiddenImg = hiddenImgRef.current;
      const hiddenVideo = hiddenVideoRef.current;

      activeRoomRef.current = room;
      roomOpenTimeRef.current = Date.now();
      track("tour_room_opened", { room_name: room.name });
      setDisplayRoom(room);

      if (!renderer) return;

      const ox = xPct / 100;
      const oy = Math.max(0.88, yPct / 100);
      renderer.uniforms.uOrigin.value = [ox, oy];
      renderer.uniforms.uSeed.value = Math.random() * 100;

      const isVideo = room.reveal === "video" && !!room.revealVideoPath;
      if (isVideo && hiddenVideo) {
        hiddenVideo.src = room.revealVideoPath!;
        hiddenVideo.load();
        renderer.setRoomSource(hiddenVideo);
        const play = () => hiddenVideo.play().catch(() => {});
        if (hiddenVideo.readyState >= 2) play();
        else hiddenVideo.addEventListener("canplay", play, { once: true });
      } else if (hiddenImg) {
        if (hiddenVideo) {
          hiddenVideo.pause();
          hiddenVideo.removeAttribute("src");
          hiddenVideo.load();
        }
        hiddenImg.src = room.revealImagePath || "";
        renderer.setRoomSource(hiddenImg);
      }

      gsap.set(renderer.uniforms.uRoomScale, { value: 1.06 });
      gsap.killTweensOf(renderer.uniforms.uProgress);
      gsap.killTweensOf(renderer.uniforms.uRoomScale);

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (pillsRef.current) {
        gsap.to(pillsRef.current, {
          autoAlpha: 0,
          duration: prefersReduced ? 0.1 : 0.5,
          ease: "power2.out",
        });
      }
      if (overlayRef.current) {
        gsap.to(overlayRef.current, {
          autoAlpha: 1,
          duration: prefersReduced ? 0.1 : 0.5,
          ease: "power2.out",
        });
      }
      if (closeBtnRef.current) {
        gsap.to(closeBtnRef.current, {
          autoAlpha: 1,
          duration: prefersReduced ? 0.1 : 0.5,
          ease: "power2.out",
        });
      }

      const isKenBurns = room.reveal === "kenBurnsStill" && !prefersReduced;

      if (prefersReduced) {
        gsap.to(renderer.uniforms.uProgress, {
          value: 1,
          duration: 0.2,
          ease: "linear",
          overwrite: true,
        });
        gsap.set(renderer.uniforms.uRoomScale, { value: 1.0 });
      } else {
        gsap.to(renderer.uniforms.uProgress, {
          value: 1,
          duration: 3.0,
          ease: "power4.out",
          overwrite: true,
        });
        gsap.to(renderer.uniforms.uRoomScale, {
          value: 1.0,
          duration: 3.0,
          ease: "power4.out",
          onComplete: isKenBurns
            ? () => {
                gsap.to(renderer.uniforms.uRoomScale, {
                  value: 0.93,
                  duration: 10,
                  ease: "sine.inOut",
                });
              }
            : undefined,
        });
      }

      if (descRef.current) {
        gsap.fromTo(
          descRef.current,
          { autoAlpha: 0, y: 20, filter: "blur(6px)" },
          {
            autoAlpha: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            delay: prefersReduced ? 0.1 : 2.4,
            ease: "power2.out",
          },
        );
      }
    },
    [],
  );

  const closeRoom = useCallback(() => {
    if (!activeRoomRef.current || roomExitingRef.current) return;
    const renderer = rendererRef.current;

    roomExitingRef.current = true;
    const roomName = activeRoomRef.current.name;
    const durationMs = Date.now() - roomOpenTimeRef.current;
    track("tour_room_duration_ms", { room_name: roomName, duration_ms: durationMs });

    // ── Immediately kill all room UI ────────────────────────────
    // These must vanish the instant the user clicks close — no
    // waiting for the 3 s shader tween or a React re-render.
    if (descRef.current) gsap.set(descRef.current, { autoAlpha: 0 });
    if (closeBtnRef.current) gsap.set(closeBtnRef.current, { autoAlpha: 0 });
    // Kill the custom ✕ cursor and restore the native pointer.
    const cursorEl = stageRef.current?.querySelector<HTMLElement>(
      "[data-room-cursor]",
    );
    if (cursorEl) gsap.set(cursorEl, { autoAlpha: 0 });
    if (stageRef.current) stageRef.current.style.cursor = "";

    if (!renderer) {
      activeRoomRef.current = null;
      roomExitingRef.current = false;
      setDisplayRoom(null);
      if (pillsRef.current) gsap.set(pillsRef.current, { autoAlpha: 1 });
      if (overlayRef.current) gsap.set(overlayRef.current, { autoAlpha: 0 });
      return;
    }

    gsap.killTweensOf(renderer.uniforms.uProgress);
    gsap.killTweensOf(renderer.uniforms.uRoomScale);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      const hiddenVideo = hiddenVideoRef.current;
      if (hiddenVideo) hiddenVideo.pause();
      activeRoomRef.current = null;
      roomExitingRef.current = false;
      setDisplayRoom(null);
      if (overlayRef.current) gsap.set(overlayRef.current, { autoAlpha: 0 });
      if (closeBtnRef.current) gsap.set(closeBtnRef.current, { autoAlpha: 0 });
      if (descRef.current) gsap.set(descRef.current, { autoAlpha: 0 });
      if (pillsRef.current) gsap.set(pillsRef.current, { autoAlpha: 1 });
    };

    // Fade overlay out and pills in
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        duration: prefersReduced ? 0.1 : 0.6,
        delay: prefersReduced ? 0 : 2.0,
        ease: "power2.out",
      });
    }
    if (pillsRef.current) {
      gsap.to(pillsRef.current, {
        autoAlpha: 1,
        duration: prefersReduced ? 0.1 : 0.8,
        delay: prefersReduced ? 0 : 2.0,
        ease: "power2.out",
      });
    }

    if (prefersReduced) {
      gsap.to(renderer.uniforms.uProgress, {
        value: 0,
        duration: 0.2,
        ease: "linear",
        overwrite: true,
        onComplete: finish,
      });
    } else {
      gsap.to(renderer.uniforms.uProgress, {
        value: 0,
        duration: 3.0,
        ease: "power4.out",
        overwrite: true,
        onComplete: finish,
      });
      gsap.to(renderer.uniforms.uRoomScale, {
        value: 1.06,
        duration: 3.0,
        ease: "power4.out",
      });
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeRoomRef.current) closeRoom();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeRoom]);

  return (
    <section
      id="tour"
      data-section="tour"
      ref={stageRef}
      className="relative h-dvh w-full overflow-hidden bg-modal-bg"
    >
      <canvas
        ref={canvasRef}
        aria-label="Aerial view of a completed Karst home"
        className="absolute inset-0 block h-full w-full"
      />

      {!webglAvailable && (
        <img
          src={tour.aerialImagePath}
          alt="Aerial view of a completed Karst home"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <img
        ref={hiddenImgRef}
        alt=""
        aria-hidden
        crossOrigin="anonymous"
        style={{
          position: "absolute",
          left: -9999,
          top: -9999,
          width: 1,
          height: 1,
          opacity: 0,
        }}
      />
      <video
        ref={hiddenVideoRef}
        muted
        playsInline
        crossOrigin="anonymous"
        style={{
          position: "absolute",
          left: -9999,
          top: -9999,
          width: 1,
          height: 1,
          opacity: 0,
        }}
      />

      {/* Hotspot pills — always in DOM, visibility animated by GSAP */}
      <div ref={pillsRef} className="absolute inset-0">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-modal-bg/20"
        />
        {tour.rooms.map((room) => (
          <button
            key={room.slug}
            onClick={() =>
              openRoom(room, room.aerialPosition.xPct, room.aerialPosition.yPct)
            }
            className="group absolute flex max-w-[calc(100vw-4rem)] items-center gap-2.5 rounded-full bg-modal-bg/60 py-1.5 pl-1.5 pr-4 backdrop-blur-sm transition-all duration-200 hover:bg-modal-bg/80 hover:shadow-lg"
            style={{
              left: `${room.aerialPosition.xPct}%`,
              top: `${room.aerialPosition.yPct}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <span className="block h-8 w-8 overflow-hidden rounded-full">
              <img
                src={room.thumbnailPath}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </span>
            <span className="truncate font-body text-xs font-medium text-page/90 md:text-sm">
              {room.name}
            </span>
          </button>
        ))}
      </div>

      {/* Room overlay — click-to-close surface + gradient + description.
          Always in DOM, starts hidden. */}
      <div
        ref={overlayRef}
        role="button"
        tabIndex={0}
        aria-label="Close room view"
        className="absolute inset-0"
        onClick={closeRoom}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") closeRoom(); }}
        style={{ visibility: "hidden", opacity: 0 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-modal-bg/50 via-transparent to-transparent"
        />
        <p
          ref={descRef}
          className="pointer-events-none absolute bottom-12 left-6 max-w-lg font-body text-sm leading-relaxed text-page/80 md:bottom-16 md:left-12 md:text-base lg:left-16"
          style={{ opacity: 0, visibility: "hidden" }}
        >
          {displayRoom?.description}
        </p>
      </div>

      {/* Mobile close button — OUTSIDE overlay so parent visibility
          can't be overridden by its own inline styles. */}
      <button
        ref={closeBtnRef}
        onClick={closeRoom}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-modal-bg/60 text-copper backdrop-blur-sm"
        style={{ visibility: "hidden", opacity: 0 }}
        aria-label="Close room view"
      >
        ✕
      </button>

      {/* Desktop custom cursor — OUTSIDE overlay so parent visibility
          can't mask it or cause stale inline visibility. */}
      <RoomCursor active={!!displayRoom && !roomExitingRef.current} stageRef={stageRef} />
    </section>
  );
}

function RoomCursor({
  active,
  stageRef,
}: {
  active: boolean;
  stageRef: React.RefObject<HTMLDivElement | null>;
}) {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const stage = stageRef.current;
    if (!cursor || !stage) return;

    if (!active) {
      stage.style.cursor = "";
      gsap.set(cursor, { autoAlpha: 0 });
      return;
    }

    const isTouchDevice = "ontouchstart" in window;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      gsap.set(cursor, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        autoAlpha: 1,
      });
    };

    const onLeave = () => {
      gsap.set(cursor, { autoAlpha: 0 });
    };

    stage.style.cursor = "none";
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseleave", onLeave);

    return () => {
      stage.style.cursor = "";
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseleave", onLeave);
      gsap.set(cursor, { autoAlpha: 0 });
    };
  }, [active, stageRef]);

  return (
    <div
      ref={cursorRef}
      data-room-cursor
      className="pointer-events-none fixed left-0 top-0 z-50 hidden h-10 w-10 items-center justify-center rounded-full border border-copper/60 bg-modal-bg/70 backdrop-blur-sm md:flex"
      style={{ visibility: "hidden", opacity: 0 }}
    >
      <span className="text-sm text-copper">✕</span>
    </div>
  );
}
