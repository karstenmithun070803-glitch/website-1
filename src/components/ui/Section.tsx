import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  /** Background variant. `dark` inverts for hero video sections. */
  variant?: "page" | "dark";
  /** Min-height. Static skeleton uses `100vh`. Motion at M4 will replace with pin-scroll tall containers. */
  minH?: "screen" | "auto" | "tall";
};

const bgVariants = {
  page: "bg-page text-ink",
  dark: "bg-modal-bg text-page",
} as const;

const heightVariants = {
  screen: "min-h-dvh",
  tall: "min-h-[200dvh]",
  auto: "",
} as const;

/**
 * Base `<section>` wrapper for every home-page section.
 * Handles background/height defaults and consistent id/scroll anchoring.
 *
 * At M2 (static skeleton) every section renders at natural height — no pin,
 * no sticky. Motion primitives at M3/M4 will layer sticky stages inside these.
 */
export function Section({
  id,
  children,
  className,
  variant = "page",
  minH = "screen",
}: SectionProps) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn(bgVariants[variant], heightVariants[minH], "relative w-full", className)}
    >
      {children}
    </section>
  );
}
