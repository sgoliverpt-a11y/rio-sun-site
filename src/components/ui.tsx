import Link from "next/link";
import type { ReactNode } from "react";

export const Arrow = () => (
  <svg className="btn-arrow" width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden>
    <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.2" />
  </svg>
);

export function ButtonLink({ href, children, variant = "gold", external = false, className = "" }: {
  href: string; children: ReactNode; variant?: "gold" | "ghost-light" | "burgundy" | "ghost-dark"; external?: boolean; className?: string;
}) {
  const cls = `btn btn-${variant} ${className}`;
  if (external) return <a href={href} target="_blank" rel="noopener" className={cls}>{children}<Arrow /></a>;
  return <Link href={href} className={cls}>{children}<Arrow /></Link>;
}

/** Chapter marker: "01 — The Philosophy". */
export function ChapterLabel({ n, children, className = "" }: { n?: string; children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-4 text-accent ${className}`} data-reveal="fade">
      {n && <span className="font-display text-[0.95rem] tracking-normal normal-case italic">{n}</span>}
      <span aria-hidden className="h-px w-10 bg-current opacity-60" />
      <span>{children}</span>
    </p>
  );
}

/** Large editorial heading split into lines, each revealed with a mask. */
export function SplitHeading({ lines, as: Tag = "h2", className = "", accentLast = false }: {
  lines: string[]; as?: "h1" | "h2" | "h3"; className?: string; accentLast?: boolean;
}) {
  return (
    <Tag className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em]">
          <span data-reveal="mask" data-reveal-delay={String(Math.min(i, 3))}
            className={`block ${accentLast && i === lines.length - 1 ? "italic text-gold-metal pr-[.1em]" : ""}`}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
