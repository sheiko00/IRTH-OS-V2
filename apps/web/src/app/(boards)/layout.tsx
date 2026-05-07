// Route group layout: no admin sidebar wrapper — these pages own their full screen
export default function BoardsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
