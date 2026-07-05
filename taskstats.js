// PURPOSE: Shows the live counts (total / active / done) and hosts the
//          "Clear completed" action. The numbers update automatically
//          because they are DERIVED in TaskBoard and passed down fresh on
//          every render — this component never calculates or stores them.
// TYPE: Client Component ('use client') — it renders a button with an
//       onClick handler.
// PROPS:
//   total             — number of tasks overall (derived in TaskBoard).
//   active            — number of not-done tasks (derived in TaskBoard).
//   completed         — number of done tasks (derived in TaskBoard).
//   onClearCompleted  — callback owned by TaskBoard; removes all done
//                       tasks at once when clicked. Data/action flows UP.
// ══════════════════════════════════════════════════════
"use client";

export default function TaskStats({
  total,
  active,
  completed,
  onClearCompleted,
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      {/* The three little stat chips. Each just prints a prop — because the
          props are derived values in the parent, they re-render with the
          correct number every time a task is added/toggled/deleted, with
          zero extra bookkeeping here. */}
      <div className="flex gap-2 text-xs">
        <span className="rounded-full bg-violet-500/15 px-3 py-1 font-medium text-violet-200">
          {total} total
        </span>
        <span className="rounded-full bg-sky-500/15 px-3 py-1 font-medium text-sky-200">
          {active} active
        </span>
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 font-medium text-emerald-200">
          {completed} done
        </span>
      </div>

      {/* CONDITIONAL RENDER: the "Clear completed" button only appears when
          there is at least one completed task (completed > 0). Hiding it
          when it would do nothing keeps the UI honest and uncluttered.
          The && short-circuits: if the condition is false, React renders
          nothing in this slot. */}
      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="rounded-lg border border-rose-500/30 px-3 py-1.5 text-xs font-medium text-rose-200/80 transition hover:bg-rose-500/15 hover:text-rose-100"
        >
          Clear completed ({completed})
        </button>
      )}
    </div>
  );
}
