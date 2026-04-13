interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export default function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  const dateStr = toLocalDateString(value);
  const timeStr = toLocalTimeString(value);

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [y, m, d] = e.target.value.split('-').map(Number);
    const next = new Date(value);
    next.setFullYear(y, m - 1, d);
    onChange(next);
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [h, min] = e.target.value.split(':').map(Number);
    const next = new Date(value);
    next.setHours(h, min, 0, 0);
    onChange(next);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div>
        <label htmlFor="meeting-date" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
          Date
        </label>
        <input
          id="meeting-date"
          type="date"
          value={dateStr}
          onChange={handleDateChange}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                     dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100
                     dark:focus:border-blue-400 dark:focus:ring-blue-800"
        />
      </div>
      <div>
        <label htmlFor="meeting-time" className="mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400">
          Time
        </label>
        <input
          id="meeting-time"
          type="time"
          value={timeStr}
          onChange={handleTimeChange}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                     dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100
                     dark:focus:border-blue-400 dark:focus:ring-blue-800"
        />
      </div>
    </div>
  );
}

function toLocalDateString(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function toLocalTimeString(d: Date): string {
  const h = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${min}`;
}
