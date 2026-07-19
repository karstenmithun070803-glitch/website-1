/**
 * Virtual Tour cloud-dissipation shader.
 *
 * Single-directional wispy reveal — the room texture grows outward from
 * a click origin through a noise-perturbed mask, cross-fading over the
 * aerial that is otherwise fully visible. Absolutely no cream layer:
 * the aerial IS the outgoing canvas, the room IS the incoming canvas,
 * and the only visible motion is the mask boundary sweeping outward
 * through fractal noise.
 */

import { Renderer, Program, Mesh, Triangle, Texture } from "ogl";

const vertexShader = /* glsl */ `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uAerial;
  uniform sampler2D uRoom;

  uniform vec2  uResolution;
  uniform vec2  uAerialSize;
  uniform vec2  uRoomSize;
  uniform vec2  uOrigin;
  uniform float uProgress;
  uniform float uTime;
  uniform float uNoiseScale;
  uniform float uNoiseSpeed;
  uniform float uEdgeSoftness;
  uniform float uYBias;
  uniform float uSeed;
  uniform float uRoomScale;

  // --- Ashima simplex noise ---------------------------------------
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(
      0.211324865405187, 0.366025403784439,
     -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                            + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // 3-octave FBM.
  float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    vec2 shift = vec2(uTime * uNoiseSpeed);
    for (int i = 0; i < 3; i++) {
      v += amp * snoise(p + shift);
      p *= 2.0;
      amp *= 0.5;
      shift *= 1.3;
    }
    return v;
  }

  vec4 sampleCover(sampler2D tex, vec2 texSize, vec2 canvasSize, vec2 uv, float scale) {
    vec2 s = canvasSize / texSize;
    float coverScale = max(s.x, s.y);
    vec2 scaled = texSize * coverScale;
    vec2 offset = (canvasSize - scaled) * 0.5;
    vec2 tuv = (uv * canvasSize - offset) / scaled;
    tuv = (tuv - 0.5) / scale + 0.5;
    return texture2D(tex, tuv);
  }

  void main() {
    vec2 uv = vUv;

    vec4 aerial = sampleCover(uAerial, uAerialSize, uResolution, uv, 1.0);
    vec4 room   = sampleCover(uRoom,   uRoomSize,   uResolution, uv, uRoomScale);

    vec2 delta = uv - uOrigin;
    float dist = length(delta * vec2(1.0, uYBias));

    float noise = fbm(vec2(uv.x, uv.y * 0.25) * uNoiseScale + vec2(uSeed));
    float amp = 0.45 * smoothstep(0.0, 0.55, uProgress);
    float perturbed = dist - noise * amp;

    float thresh = mix(-0.4, 2.0, uProgress);
    float roomOpacity = smoothstep(perturbed - uEdgeSoftness, perturbed + uEdgeSoftness, thresh);

    gl_FragColor = vec4(mix(aerial.rgb, room.rgb, roomOpacity), 1.0);
  }
`;

export type TourUniforms = {
  uProgress: { value: number };
  uOrigin: { value: [number, number] };
  uRoomScale: { value: number };
  uSeed: { value: number };
};

export type TourRenderer = {
  uniforms: TourUniforms;
  setRoomSource: (el: HTMLImageElement | HTMLVideoElement | null) => void;
  start: () => void;
  dispose: () => void;
  resize: () => void;
};

export function createTourRenderer(
  canvas: HTMLCanvasElement,
  aerialSrc: string,
): TourRenderer | null {
  try {
    const testGl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    if (!testGl) return null;
  } catch {
    return null;
  }

  const renderer = new Renderer({
    canvas,
    dpr: Math.min(window.devicePixelRatio, 2),
    alpha: false,
    antialias: false,
  });
  const gl = renderer.gl;

  // OGL 1.x doesn't reliably upload textures set via .image after the
  // first render pass. Workaround: always create a new Texture with the
  // image passed at construction time.
  const placeholder = document.createElement("canvas");
  placeholder.width = 1;
  placeholder.height = 1;

  let aerialTex = new Texture(gl, { generateMipmaps: false, image: placeholder as any });
  let roomTex = new Texture(gl, { generateMipmaps: false, image: placeholder as any });

  const uniforms: TourUniforms & {
    uAerial: { value: Texture };
    uRoom: { value: Texture };
    uResolution: { value: [number, number] };
    uAerialSize: { value: [number, number] };
    uRoomSize: { value: [number, number] };
    uTime: { value: number };
    uNoiseScale: { value: number };
    uNoiseSpeed: { value: number };
    uEdgeSoftness: { value: number };
    uYBias: { value: number };
  } = {
    uAerial: { value: aerialTex },
    uRoom: { value: roomTex },
    uResolution: { value: [canvas.width, canvas.height] },
    uAerialSize: { value: [1, 1] },
    uRoomSize: { value: [1, 1] },
    uOrigin: { value: [0.5, 0.65] },
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uNoiseScale: { value: 2.8 },
    uNoiseSpeed: { value: 0.1 },
    uEdgeSoftness: { value: 0.035 },
    uYBias: { value: 1.8 },
    uSeed: { value: 7.0 },
    uRoomScale: { value: 1.06 },
  };

  const program = new Program(gl, {
    vertex: vertexShader,
    fragment: fragmentShader,
    uniforms,
  });
  const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

  const aerialImg = new Image();
  if (aerialSrc.startsWith("http")) aerialImg.crossOrigin = "anonymous";
  aerialImg.onload = () => {
    const newAerial = new Texture(gl, {
      generateMipmaps: false,
      image: aerialImg,
    });
    aerialTex = newAerial;
    uniforms.uAerial.value = newAerial;
    uniforms.uAerialSize.value = [aerialImg.naturalWidth, aerialImg.naturalHeight];

    const newRoom = new Texture(gl, {
      generateMipmaps: false,
      image: aerialImg,
    });
    roomTex = newRoom;
    uniforms.uRoom.value = newRoom;
    uniforms.uRoomSize.value = [aerialImg.naturalWidth, aerialImg.naturalHeight];
  };
  aerialImg.onerror = () => {
    if (aerialImg.crossOrigin) {
      aerialImg.crossOrigin = "";
      aerialImg.src = aerialSrc;
    }
  };
  aerialImg.src = aerialSrc;

  const resize = () => {
    const parent = canvas.parentElement;
    const w = parent?.clientWidth || window.innerWidth;
    const h = parent?.clientHeight || window.innerHeight;
    renderer.setSize(w, h);
    uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
  };
  resize();

  const ro = new ResizeObserver(resize);
  if (canvas.parentElement) ro.observe(canvas.parentElement);
  else ro.observe(canvas);
  requestAnimationFrame(resize);

  let rafId = 0;
  let startTime = 0;
  let running = false;

  const setRoomSource = (
    el: HTMLImageElement | HTMLVideoElement | null,
  ) => {
    if (!el) {
      uniforms.uRoomSize.value = [1, 1];
      return;
    }
    if (el instanceof HTMLImageElement) {
      const apply = () => {
        const newTex = new Texture(gl, {
          generateMipmaps: false,
          image: el,
        });
        roomTex = newTex;
        uniforms.uRoom.value = newTex;
        uniforms.uRoomSize.value = [el.naturalWidth, el.naturalHeight];
      };
      if (el.complete && el.naturalWidth) apply();
      else el.addEventListener("load", apply, { once: true });
    } else {
      const newTex = new Texture(gl, {
        generateMipmaps: false,
        image: el,
      });
      roomTex = newTex;
      uniforms.uRoom.value = newTex;
      const applyMeta = () => {
        uniforms.uRoomSize.value = [el.videoWidth, el.videoHeight];
      };
      if (el.readyState >= 1) applyMeta();
      else el.addEventListener("loadedmetadata", applyMeta, { once: true });
    }
  };

  const frame = () => {
    if (!running) return;
    const el = roomTex.image as
      | HTMLImageElement
      | HTMLVideoElement
      | undefined;
    if (el instanceof HTMLVideoElement && el.readyState >= 2) {
      roomTex.needsUpdate = true;
    }
    uniforms.uTime.value = (performance.now() - startTime) / 1000;
    renderer.render({ scene: mesh });
    rafId = requestAnimationFrame(frame);
  };

  const start = () => {
    if (running) return;
    running = true;
    startTime = performance.now();
    frame();
  };

  const dispose = () => {
    running = false;
    cancelAnimationFrame(rafId);
    ro.disconnect();
  };

  return { uniforms, setRoomSource, start, dispose, resize };
}
