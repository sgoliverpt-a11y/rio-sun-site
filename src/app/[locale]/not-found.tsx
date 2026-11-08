import Link from "next/link";

export default function NotFound() {
  return (
    <section data-header="dark" className="surface-dark grain flex min-h-[80svh] flex-col items-center justify-center gap-8 px-6 text-center">
      <p className="display-md">This page has drifted away.</p>
      <Link href="/en/" className="btn btn-gold">Back to home</Link>
    </section>
  );
}
