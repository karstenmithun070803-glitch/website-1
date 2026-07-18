"use client";

import { useState } from "react";
import type { StubHomePage } from "@/lib/stubContent";
import { track } from "@/lib/analytics";
import { TopRightPill } from "./TopRightPill";
import { MenuPanel } from "./MenuPanel";
import { ContactModal } from "./ContactModal";
import { BottomHints } from "./BottomHints";

export function ChromeShell({ content }: { content: StubHomePage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <TopRightPill
        onOpenMenu={() => {
          track("menu_opened");
          setMenuOpen(true);
        }}
        onOpenContact={() => {
          track("contact_modal_opened", { source: "pill" });
          setContactOpen(true);
        }}
      />
      <BottomHints />
      <MenuPanel
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onOpenContact={() => {
          track("contact_modal_opened", { source: "menu" });
          setContactOpen(true);
        }}
      />
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        content={content.contactModal}
      />
    </>
  );
}
