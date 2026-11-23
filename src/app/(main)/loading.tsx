export default function Loading() {
  return (
    <div className="fixed top-0 inset-x-0 z-[9999] h-1 overflow-hidden bg-ieee-primary/10 pointer-events-none" role="status" aria-label="Loading">
      <div className="h-full w-full bg-gradient-to-r from-ieee-primary via-ieee-cyan to-amber-400 animate-progress origin-left" />
    </div>
  );
}
