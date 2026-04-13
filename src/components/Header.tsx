interface HeaderProps {
  onNewMeeting?: () => void;
}

export default function Header({ onNewMeeting }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white px-4 py-6 dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 sm:text-3xl">
            🌍 Time Zone Meeting Planner
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Find the best meeting time across up to 10 cities worldwide
          </p>
        </div>
        {onNewMeeting && (
          <button
            onClick={onNewMeeting}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2
                       text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50
                       focus:outline-none focus:ring-2 focus:ring-blue-300
                       dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700
                       dark:focus:ring-blue-800"
            aria-label="Start a new meeting comparison"
          >
            <span>✨</span> New Meeting
          </button>
        )}
      </div>
    </header>
  );
}
