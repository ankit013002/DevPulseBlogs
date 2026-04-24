export default function SettingsLoading() {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 animate-pulse">
      <div className="h-9 w-32 rounded-lg bg-base-300 mb-8" />

      {/* Profile picture card */}
      <div className="bg-base-100 border border-border rounded-2xl p-6 mb-6">
        <div className="h-5 w-32 rounded bg-base-300 mb-4" />
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-base-300 shrink-0" />
          <div className="space-y-2">
            <div className="h-8 w-36 rounded-xl bg-base-300" />
            <div className="h-3.5 w-44 rounded bg-base-300" />
          </div>
        </div>
      </div>

      {/* Personal info card */}
      <div className="bg-base-100 border border-border rounded-2xl p-6 space-y-5">
        <div className="h-5 w-28 rounded bg-base-300" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-base-300" />
            <div className="h-10 rounded-xl bg-base-300" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-base-300" />
            <div className="h-10 rounded-xl bg-base-300" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-4 w-10 rounded bg-base-300" />
          <div className="h-24 rounded-xl bg-base-300" />
        </div>
      </div>
    </div>
  );
}
