import { site } from "@/content/site";

/** Floating WhatsApp shortcut. Sits above the mobile booking bar; hidden under the intro overlay. */
export function WhatsAppButton({ label, message }: { label: string; message: string }) {
  const url = `${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
  return (
    <a href={url} target="_blank" rel="noopener" aria-label={label} title={label} data-contact="whatsapp"
      className="wa-float fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-4 z-[41] flex h-14 w-14 items-center justify-center rounded-full bg-[#1f8f4e] text-white shadow-[0_12px_30px_-8px_rgba(20,0,6,.55)] ring-1 ring-white/15 transition-transform duration-500 ease-[var(--ease-silk)] hover:scale-105 md:bottom-8 md:right-8">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden fill="currentColor">
        <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.64c-2.02 0-4-.54-5.72-1.57l-.41-.24-3.96 1.04 1.06-3.86-.27-.4A10.6 10.6 0 0 1 5.4 16c0-5.87 4.77-10.64 10.64-10.64S26.66 10.13 26.66 16s-4.76 10.64-10.62 10.64Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.3-.1-.51-.16-.72.16-.21.32-.83 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.99-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66 0 1.57 1.14 3.08 1.3 3.3.16.21 2.25 3.43 5.44 4.81.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z"/>
      </svg>
    </a>
  );
}
