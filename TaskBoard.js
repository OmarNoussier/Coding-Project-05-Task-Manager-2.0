// PURPOSE: Owns ALL task state and the current filter. Passes data
//          DOWN to children as props, and receives events UP from
//          children through callback props. This one-way flow is the
//          "lifting state up" pattern — every child stays dumb/reusable
//          while this component is the single source of truth.
// PROPS: none — it is the top of the interactive tree.
// ══════════════════════════════════════════════════════
"use client";

import { useState, useEffect } from "react";
import AddTaskForm from "./AddTaskForm";
import FilterBar from "./FilterBar";
import TaskList from "./TaskList";
import TaskStats from "./TaskStats";

// A tiny constant so the localStorage key is defined in exactly one
// place. If we typo it in one spot but not another, persistence breaks
// silently — centralising it removes that whole class of bug.
const STORAGE_KEY = "nova-tasks";

export default function TaskBoard() {
  // ── STATE #1: the tasks array ───────────────────────────────
  // Tasks MUST be state because they change over the app's lifetime
  // (add/toggle/delete) and every change must trigger a re-render.
  //
  // The function form of useState is a "lazy initializer": React calls
  // it only on the FIRST render, so we read localStorage once instead
  // of on every render.
  const [tasks, setTasks] = useState(() => {
    // typeof window guard: Next.js runs this component on the SERVER
    // first (SSR) to produce HTML. On the server there is no `window`
    // and no `localStorage`, so touching it would throw and crash the
    // render. The guard returns a safe empty list during SSR; the real
    // data is read once we're in the browser.
    if (typeof window === "undefined") return [];

    const saved = localStorage.getItem(STORAGE_KEY);
    // localStorage only stores strings, so we JSON.parse back into an
    // array. If nothing was saved yet, fall back to an empty list.
    return saved ? JSON.parse(saved) : [];
  });

  // ── STATE #2: the active filter ─────────────────────────────
  // Kept in its OWN useState call because it changes independently of
  // the tasks — clicking "Active" must not touch the task data, and
  // adding a task must not reset the filter. Separate concerns → separate
  // state. Valid values: "all" | "active" | "done".
  const [filter, setFilter] = useState("all");

  // ── EFFECT: persist tasks to localStorage ───────────────────
  // useEffect runs AFTER the DOM has painted, syncing our React state
  // with an EXTERNAL system (the browser's localStorage). We can't write
  // during render because render must stay pure/side-effect-free.
  //
  // Dependency array [tasks]: the effect re-runs only when `tasks`
  // actually changes. If we passed [] it would save only once and never
  // update; if we omitted the array entirely it would save on every
  // render (including filter changes) — wasteful and wrong.
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  // ── DERIVED VALUES (computed on every render, NEVER stored in state) ──
  // These are calculated fresh from `tasks` each render. Storing them in
  // their own useState would create two sources of truth that could drift
  // out of sync (e.g. counts that don't match the visible list). Deriving
  // them guarantees they are always correct by construction.
  const total = tasks.length;
  const completed = tasks.filter((t) => t.done).length;
  const active = total - completed; // cheap subtraction; no second scan

  // The subset of tasks to show, derived from the current filter.
  // Also derived (not state) for the same reason as the counts above.
  const visibleTasks =
    filter === "active"
      ? tasks.filter((t) => !t.done)
      : filter === "done"
        ? tasks.filter((t) => t.done)
        : tasks; // "all"

  // ── HANDLERS (callbacks passed DOWN to children) ────────────
  // Every handler produces a BRAND-NEW array rather than mutating the
  // existing one. React decides whether to re-render by comparing the
  // OLD state reference to the NEW one (Object.is). If we mutated
  // `tasks` in place, the reference would be identical, React would
  // think nothing changed, and the UI would silently not update.

  // ADD: spread the old tasks into a new array and append the new one.
  // crypto.randomUUID() gives a collision-free id we use as the React key.
  function handleAdd(title) {
    setTasks((prev) => [
      ...prev,
      { id: crypto.randomUUID(), title, done: false },
    ]);
  }

  // TOGGLE: .map() returns a NEW array. For the matching task we build a
  // NEW object with the spread `{ ...t }` and flip `done`; all other
  // tasks are returned untouched. New array + new object = React re-renders.
  function handleToggle(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }

  // DELETE: .filter() returns a NEW array excluding the matching id.
  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  // CLEAR COMPLETED: keep only the tasks that are NOT done. One .filter()
  // removes them all at once, again producing a fresh array.
  function handleClearCompleted() {
    setTasks((prev) => prev.filter((t) => !t.done));
  }

  // ── RENDER ──────────────────────────────────────────────────
  return (
    <section className="rounded-3xl border border-violet-500/20 bg-violet-950/30 p-5 shadow-2xl shadow-violet-900/40 backdrop-blur sm:p-7">
      {/* AddTaskForm owns the text input locally; it only tells us the
          finished title via the onAdd callback. Data flows UP. */}
      <AddTaskForm onAdd={handleAdd} />

      {/* Stats + the clear-completed action. We pass the derived counts
          down (read-only) and a callback up for the clear action. */}
      <TaskStats
        total={total}
        active={active}
        completed={completed}
        onClearCompleted={handleClearCompleted}
      />

      {/* FilterBar is a "controlled" set of buttons: it doesn't own the
          filter, it just renders the current one and reports clicks up. */}
      <FilterBar filter={filter} onChangeFilter={setFilter} />

      {/* The list receives ONLY the already-filtered tasks plus the two
          per-task callbacks. It never sees the full task array or the
          filter logic — it just renders what it's given. */}
      <TaskList
        tasks={visibleTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </section>
  );
}
