export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-white/80 dark:bg-[#0a0f1c]/80 backdrop-blur-sm flex flex-col items-center justify-center transition-all duration-300">
      <div className="relative flex items-center justify-center w-24 h-24 mb-6">
        <div className="absolute inset-0 border-[3px] border-ieee-primary/10 dark:border-ieee-primary/20 rounded-full"></div>
        <div className="absolute inset-0 border-[3px] border-ieee-primary rounded-full border-t-transparent animate-spin"></div>
        <div className="w-10 h-10 bg-ieee-secondary/20 rounded-full animate-pulse shadow-[0_0_20px_rgba(0,181,226,0.3)]"></div>
      </div>
      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight animate-pulse mb-1">
        Loading...
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Fetching latest data
      </p>
    </div>
  );
}
