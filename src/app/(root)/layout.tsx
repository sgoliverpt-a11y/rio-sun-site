export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body style={{ background: "#3f000b" }}>{children}</body>
    </html>
  );
}
