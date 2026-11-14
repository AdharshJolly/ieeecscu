export default function GlobalLoading() {
  return (
    <div className="fixed top-0 inset-x-0 z-[9999] h-1 overflow-hidden bg-ieee-primary/10 pointer-events-none" role="status" aria-label="Loading">
      <div className="h-full w-1/3 bg-ieee-primary rounded-full animate-pulse" />
    </div>
  );
}
