export const IndeterminateProgress = () => (
  <div
    className="w-full bg-neutral-200 h-2 rounded-full overflow-hidden"
    role="progressbar"
    aria-busy="true"
    aria-label="Loading"
  >
    <div className="h-full w-[40%] bg-gradient-to-r from-green via-light-blue to-blue rounded-full animate-indeterminate"></div>
  </div>
);
