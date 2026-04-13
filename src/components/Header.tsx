export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white px-4 py-6 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 sm:text-3xl">
          🌍 Time Zone Meeting Planner
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Find the best meeting time across up to 10 cities worldwide
        </p>
      </div>
    </header>
  );
}
