// ══════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE: Displays ONE task row. It receives its data from TaskList via
//          props and fires callback events back up to TaskBoard when the
//          user toggles or deletes. It owns no state — it is a pure
//          "presentational" component driven entirely by its props.
// TYPE: Client Component ('use client') — it wires up onClick handlers,
//       which only exist in the browser.
// PROPS:
//   id        — unique task identifier (from crypto.randomUUID). Sent back
//               up in the callbacks so TaskBoard knows WHICH task to change.
//   title     — the task text the user typed.
//   done      — boolean; true = completed. Drives the "done" styling.
//   onToggle  — callback fired with this task's id when Toggle is clicked.
//   onDelete  — callback fired with this task's id when Delete is clicked.
// ══════════════════════════════════════════════════════
"use client";

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  // CONDITIONAL STYLING (a form of conditional rendering): when `done` is
  // true we strike the text through and mute it so completed tasks are
  // instantly distinguishable at a glance. The condition is the `done`
  // prop; the value flows down from TaskBoard's state.
  const titleClass = done
    ? "line-through text-violet-300/40"
    : "text-violet-50";

  return (
    <li className="flex items-center gap-3 rounded-xl border border-violet-500/15 bg-violet-950/40 px-4 py-3 transition hover:border-violet-400/40">
      {/* The checkbox is the toggle control. It's a controlled input:
          `checked` is driven by the `done` prop, and onChange reports the
          click UP via onToggle(id). We send the id (not the whole task) so
          TaskBoard can find and flip exactly this row with .map(). */}
      <input
        type="checkbox"
        checked={done}
        onChange={() => onToggle(id)}
        className="h-5 w-5 shrink-0 cursor-pointer accent-fuchsia-500"
        aria-label={done ? "Mark task as active" : "Mark task as done"}
      />

      {/* Clicking the text is a second, larger tap-target for toggling —
          nicer on touch screens than only the small checkbox. */}
      <span
        onClick={() => onToggle(id)}
        className={"flex-1 cursor-pointer text-sm " + titleClass}
      >
        {title}
      </span>

      {/* Delete button: fires onDelete with this id so TaskBoard removes
          exactly this task from state with .filter(). */}
      <button
        onClick={() => onDelete(id)}
        className="shrink-0 rounded-lg px-2 py-1 text-xs font-medium text-rose-300/70 transition hover:bg-rose-500/15 hover:text-rose-200"
        aria-label="Delete task"
      >
        Delete
      </button>
    </li>
  );
}
