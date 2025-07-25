"use client";

import { useEffect } from "react";

export default function BrowserExtensionCleanup() {
  useEffect(() => {
    // Remove browser extension attributes that cause hydration mismatches
    const cleanup = () => {
      // Remove Kantu and similar extension attributes
      const elements = document.querySelectorAll("[data-kantu]");
      elements.forEach((element) => {
        element.removeAttribute("data-kantu");
      });

      // Remove other common extension attributes
      const extensionAttributes = [
        "data-gramm",
        "data-gramm_editor",
        "data-gramm_id",
        "data-gramm_editor_plugin",
        "data-gramm_editor_plugin_gramm_id",
        "data-gramm_editor_plugin_gramm_editor",
        "data-gramm_editor_plugin_gramm_editor_plugin",
        "data-gramm_editor_plugin_gramm_editor_plugin_gramm_id",
        "data-gramm_editor_plugin_gramm_editor_plugin_gramm_editor",
        "data-gramm_editor_plugin_gramm_editor_plugin_gramm_editor_plugin",
      ];

      extensionAttributes.forEach((attr) => {
        const elements = document.querySelectorAll(`[${attr}]`);
        elements.forEach((element) => {
          element.removeAttribute(attr);
        });
      });
    };

    // Run cleanup after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(cleanup, 100);

    // Also run cleanup on DOM changes
    const observer = new MutationObserver(cleanup);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-kantu", "data-gramm"],
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  return null;
}
