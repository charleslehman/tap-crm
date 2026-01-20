import { useState, useMemo } from 'react';
import type { Contact, FilterState, ViewMode } from '../types/contact';
import { StatsCards } from './StatsCards';
import { SearchBar } from './SearchBar';
import { Filters } from './Filters';
import { ContactCard } from './ContactCard';
import { ContactModal } from './ContactModal';

interface DashboardProps {
  contacts: Contact[];
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

const initialFilters: FilterState = {
  search: '',
  houseDistrict: 'All',
  senateDistrict: 'All',
  city: 'All',
};

export function Dashboard({ contacts, loading, error, onRefresh }: DashboardProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          contact.companyName.toLowerCase().includes(searchLower) ||
          contact.city.toLowerCase().includes(searchLower) ||
          contact.houseRepName.toLowerCase().includes(searchLower) ||
          contact.senateRepName.toLowerCase().includes(searchLower) ||
          contact.txHouseDistrict.includes(searchLower) ||
          contact.txSenateDistrict.includes(searchLower);
        if (!matchesSearch) return false;
      }

      // House District filter
      if (filters.houseDistrict !== 'All') {
        const districts = contact.txHouseDistrict.split(',').map(d => d.trim());
        if (!districts.includes(filters.houseDistrict)) return false;
      }

      // Senate District filter
      if (filters.senateDistrict !== 'All') {
        const districts = contact.txSenateDistrict.split(',').map(d => d.trim());
        if (!districts.includes(filters.senateDistrict)) return false;
      }

      // City filter
      if (filters.city !== 'All' && contact.city !== filters.city) {
        return false;
      }

      return true;
    });
  }, [contacts, filters]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading companies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-sm max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Texas Space District Lookup</h1>
            <p className="text-sm text-gray-500">Find companies by legislative district</p>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Stats */}
        <StatsCards contacts={contacts} />

        {/* Search */}
        <div className="mb-4">
          <SearchBar
            value={filters.search}
            onChange={(search) => setFilters({ ...filters, search })}
          />
        </div>

        {/* Filters */}
        <Filters
          filters={filters}
          onFilterChange={setFilters}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          contacts={contacts}
        />

        {/* Results Count */}
        <div className="mb-4 text-sm text-gray-500">
          Showing {filteredContacts.length} of {contacts.length} companies
        </div>

        {/* Contact Grid/List */}
        {filteredContacts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500">No companies match your filters</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                viewMode={viewMode}
                onClick={() => setSelectedContact(contact)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredContacts.map((contact) => (
              <ContactCard
                key={contact.id}
                contact={contact}
                viewMode={viewMode}
                onClick={() => setSelectedContact(contact)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Contact Modal */}
      {selectedContact && (
        <ContactModal
          contact={selectedContact}
          onClose={() => setSelectedContact(null)}
        />
      )}
    </div>
  );
}
