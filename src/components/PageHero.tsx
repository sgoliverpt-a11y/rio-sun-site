import type { ReactNode } from "react";
import { Bands } from "./Bands";
import { SplitHeading } from "./ui";

/** Dark cinematic opener shared by inner pages. */
export function PageHero({ eyebrow, title, lead, children, bands = true }: {
  eyebrow?: string; title: string[]; lead?: string; children?: ReactNode; bands?: boolean;
}) {
  return (
    <section data-header="dark" className="surface-dark grain relative overflow-hidden pb-16 pt-[calc(var(--header-h)+5rem)] md:pb-24 md:pt-[calc(var(--header-h)+8rem)]">
      {bands && <Bands moment="transition" className="absolute -right-[18%] top-[18%] h-[70%] w-[80%] md:-right-[8%] md:w-[55%]" opacity={0.35} align="right" />}
      <div className="gutter relative mx-auto max-w-[1600px]">
        {eyebrow && <p className="eyebrow text-accent" data-reveal="fade">{eyebrow}</p>}
        <SplitHeading as="h1" lines={title} accentLast={title.length > 1} className="display-xl mt-6 max-w-5xl" />
        {lead && <p className="lede mt-10 max-w-2xl text-muted" data-reveal="fade" data-reveal-delay="1">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
