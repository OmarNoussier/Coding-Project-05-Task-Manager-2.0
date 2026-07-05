# Nova Tasks — Midnight Task Manager

A dark-themed task manager built for **Coding Project 5**. It implements all seven
required features using **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4**.

Live features: add tasks (validated), toggle done, delete, filter (All / Active / Done),
a live stats bar, clear-completed, and localStorage persistence that survives a refresh.

## Getting started

> **Prerequisite:** Node.js 18.18+ (or 20+) and npm must be installed.

# 1. Install dependencies
npm install

# 2. run the dev server
npm run dev

# 3. Open the app
# visit http://localhost:3000
```

Build for production with `npm run build` then `npm start`.

---

## Project structure

```
src/
  app/
    layout.js        Root layout (Server Component) — html/body shell + global CSS
    page.js          Home route (Server Component) — renders <TaskBoard/> only
    globals.css      Tailwind v4 import + a couple of theme tokens
  components/
    TaskBoard.js     Client Component — owns ALL state (tasks + filter)
    AddTaskForm.js   Controlled form for adding tasks
    FilterBar.js     All / Active / Done buttons (controlled)
    TaskList.js      Maps the filtered tasks to TaskCards
    TaskCard.js:      A single task row (toggle + delete)
    TaskStats.js     Live counts + clear-completed button
```

Data flows **down** as props and events flow **up** through callbacks — state lives in exactly one place (`TaskBoard`), which is the "lifting state up" pattern from the lectures.

---

## Design decisions

I chose the **Dark Mode** direction and committed to a "Midnight Violet" identity so the
app looks meaningfully different from the workshop example.

- **Colour palette:** deep near-black violet background (`#0b0713` → `#160d29` gradient)
  with violet/fuchsia accents and colour-coded stat chips (violet = total, sky = active,
  emerald = done, rose = destructive actions).
- **Typography:** large gradient-clipped `text-transparent` heading, tighter tracking, and
  A smaller muted body scale for a calm, focused feel.
- **Spacing & shape:** generous padding, rounded-3xl card, soft violet shadow, and a
  frosted `backdrop-blur` panel.
- **Layout change vs. the workshop:** the whole app sits in a single centered card, the
  Filters are a segmented "pill" control instead of plain buttons; tasks use a checkbox
  (not a text "Toggle" button), And the clear-completed button is tucked into the stats
  bar and only appears when there is something to clear.

---

## How the seven required features map to the code

| Feature | Where |
| Add tasks (validated, no blanks) | `AddTaskForm.js` `handleSubmit` → `TaskBoard.handleAdd` |
| Toggle done (visual difference) | `TaskCard.js` checkbox → `TaskBoard.handleToggle` (`.map`) |
| Delete a task | `TaskCard.js` Delete → `TaskBoard.handleDelete` (`.filter`) |
| Filter (All / Active / Done) | `FilterBar.js` → `TaskBoard.filter` + `visibleTasks` |
| Live stats bar | `TaskStats.js` fed by derived `total/active / completed` |
| Clear completed | `TaskStats.js` button → `TaskBoard.handleClearCompleted` |
| Persist on refresh | `TaskBoard.js` lazy `useState` init + `useEffect([tasks])` → localStorage |

---

## AI Usage Log

- **Scaffolding the components.** I asked an AI assistant to generate the initial
  `TaskBoard` / `TaskCard` split following the App Router structure. I then read it line by
  line, renamed things to my own "Nova Tasks" naming, and rewrote every comment in my own
  words so I could explain the why e.g.map() returns a new array and why direct
  Mutation would skip the re-render.
- **Tailwind palette options.** I asked for several dark-mode Tailwind colour palettes for a
  "focused productivity" app, then picked and tuned the violet/fuchsia combination myself,
  Adjusting the exact background hex values until the contrast felt right.
- **Comment accuracy check.** I wrote the `typeof window` / SSR explanation in plain English
  first, then asked the AI to confirm it was technically accurate for Next.js Server
  Components, and tightened the wording based on its feedback.
