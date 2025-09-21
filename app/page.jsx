import Terminal from '@/components/Terminal';

/**
 * The main page of the application.
 * This is a server component that renders the Terminal component in the center of the screen.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-base-300 p-4">
      <Terminal />
    </main>
  );
}