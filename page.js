// PURPOSE: The home route. Its ONLY job is to render the page shell
//          and drop in the <TaskBoard/>. It intentionally holds no
//          state and defines no handlers.
// TYPE: Server Component — notice there is NO 'use client' at the top.
// ══════════════════════════════════════════════════════
import TaskBoard from "@/components/TaskBoard";

export default function Home() {
  return (
    // A centered, max-width column. The gradient + generous vertical
    // padding is part of the custom "Midnight Violet" look.
    <main className="min-h-screen bg-gradient-to-b from-[#0b0713] to-[#160d29] px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-2xl">
        {/* Static header — pure presentation, so it stays on the server. */}
        <header className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl">
            Nova Tasks
          </h1>
          <p className="mt-2 text-sm text-violet-200/60">
            Focus after dark. Your tasks, saved right in your browser.
          </p>
        </header>

        {/* The single Client "island" that owns all interactivity. */}
        <TaskBoard />
      </div>
    </main>
  );
}
