export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body style={{ background: "#2a1c14" }}>{children}</body>
    </html>
  );
}
