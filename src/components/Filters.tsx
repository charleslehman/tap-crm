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

  // Get unique house districts
  const houseDistricts = ['All', ...new Set(
    contacts
      .flatMap((c) => c.txHouseDistrict.split(',').map(d => d.trim()))
      .filter(Boolean)
      .sort((a, b) => parseInt(a) - parseInt(b))
  )];

  // Get unique senate districts
  const senateDistricts = ['All', ...new Set(
    contacts
      .flatMap((c) => c.txSenateDistrict.split(',').map(d => d.trim()))
      .filter(Boolean)
      .sort((a, b) => parseInt(a) - parseInt(b))
  )];

  // Get unique cities
  const cities = ['All', ...new Set(contacts.map((c) => c.city).filter(Boolean))].sort();

  return (
    <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
      {/* House District Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">House District:</label>
        <select
          value={filters.houseDistrict || 'All'}
          onChange={(e) => updateFilter('houseDistrict', e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {houseDistricts.map((district) => (
            <option key={district} value={district}>
              {district === 'All' ? 'All Districts' : `District ${district}`}
            </option>
          ))}
        </select>
      </div>

      {/* Senate District Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">Senate District:</label>
        <select
          value={filters.senateDistrict || 'All'}
          onChange={(e) => updateFilter('senateDistrict', e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {senateDistricts.map((district) => (
            <option key={district} value={district}>
              {district === 'All' ? 'All Districts' : `District ${district}`}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-700">City:</label>
        <select
          value={filters.city || 'All'}
          onChange={(e) => updateFilter('city', e.target.value)}
          className="px-3 py-1.5 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        >
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
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
