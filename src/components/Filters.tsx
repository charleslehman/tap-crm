import type { FilterState, ViewMode, Contact } from '../types/contact';

interface FiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  contacts: Contact[];
}

export function Filters({
  filters,
  onFilterChange,
  viewMode,
  onViewModeChange,
  contacts,
}: FiltersProps) {
  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const togglePlatform = (
    key: 'hasLinkedIn' | 'hasWebsite' | 'hasTwitter'
  ) => {
    const current = filters[key];
    const next = current === null ? true : current === true ? false : null;
    updateFilter(key, next);
  };

  const getPlatformButtonClass = (value: boolean | null) => {
    if (value === true) return 'bg-green-100 text-green-700 border-green-300';
    if (value === false) return 'bg-red-100 text-red-700 border-red-300';
    return 'bg-gray-100 text-gray-600 border-gray-300';
  };

  // Get unique states from contacts
  const states = ['All', ...new Set(contacts.map((c) => c.state).filter(Boolean))].sort();

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      {/* State Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">State:</label>
        <select
          value={filters.state}
          onChange={(e) => updateFilter('state', e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      {/* Platform Toggles */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">Platform:</span>
        <button
          onClick={() => togglePlatform('hasLinkedIn')}
          className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${getPlatformButtonClass(filters.hasLinkedIn)}`}
        >
          LinkedIn {filters.hasLinkedIn === true ? '✓' : filters.hasLinkedIn === false ? '✗' : ''}
        </button>
        <button
          onClick={() => togglePlatform('hasWebsite')}
          className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${getPlatformButtonClass(filters.hasWebsite)}`}
        >
          Website {filters.hasWebsite === true ? '✓' : filters.hasWebsite === false ? '✗' : ''}
        </button>
        <button
          onClick={() => togglePlatform('hasTwitter')}
          className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${getPlatformButtonClass(filters.hasTwitter)}`}
        >
          Twitter {filters.hasTwitter === true ? '✓' : filters.hasTwitter === false ? '✗' : ''}
        </button>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm font-medium text-gray-700">View:</span>
        <div className="flex border border-gray-300 rounded-md overflow-hidden">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`px-3 py-1.5 text-sm transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`px-3 py-1.5 text-sm transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            List
          </button>
        </div>
      </div>
    </div>
  );
}
