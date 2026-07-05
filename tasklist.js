// ══════════════════════════════════════════════════════
// COMPONENT: TaskList
// PURPOSE: Renders the (already-filtered) collection of tasks as a list
//          of <TaskCard> rows. It contains NO business logic — it just
//          maps data to markup and forwards the per-task callbacks down
//          to each card. TaskBoard decides *which* tasks arrive here.
// TYPE: Client Component ('use client'). It is rendered inside a client
//       tree and forwards event callbacks, so it is marked client too.
// PROPS:
//   tasks     — the filtered array of task objects to display.
//   onToggle  — callback (owned by TaskBoard) passed straight through to
//               each TaskCard's Toggle button.
//   onDelete  — callback (owned by TaskBoard) passed straight through to
//               each TaskCard's Delete button.
// ══════════════════════════════════════════════════════
"use client";

import TaskCard from "./TaskCard";

export default function TaskList({ tasks, onToggle, onDelete }) {
  // CONDITIONAL RENDER: when the filtered list is empty we show a friendly
  // empty-state instead of a blank box. The trigger is simply "there are
  // no tasks to show" (which happens on first load, or when a filter
  // matches nothing). Returning early keeps the happy path below clean.
  if (tasks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-violet-500/25 py-10 text-center text-sm text-violet-300/50">
        Nothing here yet. Add a task above to get started ✨
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {/* .map() turns each task object into a TaskCard. The `key` MUST be
          a stable unique id (not the array index) so React can match each
          element across re-renders — this is what makes toggling/deleting
          update only the affected row instead of re-rendering the world. */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          done={task.done}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
