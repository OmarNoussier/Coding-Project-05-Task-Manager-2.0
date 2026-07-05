// PURPOSE: Renders the three filter buttons (All / Active / Done) and
//          highlights whichever one is currently selected. It is a
//          "controlled" component — it does NOT own the filter value,
//          it just displays the one it's given and reports clicks up.
// TYPE: Client Component ('use client') — it has onClick handlers.
// PROPS:
//   filter          — the currently active filter string, owned by
//                     TaskBoard. Used to decide which button looks active.
//   onChangeFilter  — callback owned by TaskBoard (it is setFilter). We
//                     call it with the chosen filter so TaskBoard updates
//                     its state; the new value then flows back DOWN to us.
// ══════════════════════════════════════════════════════
"use client";

const OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "done", label: "Done" },
];

export default function FilterBar({ filter, onChangeFilter }) {
  return (
    <div className="my-4 flex gap-1 rounded-xl border border-violet-500/20 bg-violet-950/40 p-1">
      {OPTIONS.map((opt) => {
        // Derived-per-button boolean: is THIS button the active filter?
        // Computed on the fly from the `filter` prop rather than stored,
        // so it can never disagree with the real selected value.
        const isActive = filter === opt.value;

        return (
          <button
            key={opt.value}
            // Clicking sends the chosen value UP to TaskBoard. We never
            // mutate the filter here; the parent owns it.
            onClick={() => onChangeFilter(opt.value)}
            // Conditional rendering via className: the active button gets
            // the solid violet pill; the others stay muted. This is how
            // the user sees which filter is applied.
            className={
              "flex-1 rounded-lg px-3 py-2 text-sm font-medium transition " +
              (isActive
                ? "bg-violet-500 text-white shadow"
                : "text-violet-300/70 hover:bg-violet-500/10 hover:text-violet-100")
            }
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
