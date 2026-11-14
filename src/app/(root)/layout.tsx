export default function RootRedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body style={{ background: "#3d1c0c" }}>{children}</body>
    </html>
  );
}
