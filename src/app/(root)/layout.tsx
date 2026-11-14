export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body style={{ background: "#343f2b" }}>{children}</body>
    </html>
  );
}
