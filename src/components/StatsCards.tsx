import type { Contact } from '../types/contact';

interface StatsCardsProps {
  contacts: Contact[];
}

export function StatsCards({ contacts }: StatsCardsProps) {
  const totalCompanies = contacts.length;

  // Count unique house districts
  const houseDistricts = new Set(
    contacts.flatMap((c) => c.txHouseDistrict.split(',').map(d => d.trim()).filter(Boolean))
  );

  // Count unique senate districts
  const senateDistricts = new Set(
    contacts.flatMap((c) => c.txSenateDistrict.split(',').map(d => d.trim()).filter(Boolean))
  );

  // Count unique cities
  const cities = new Set(contacts.map((c) => c.city).filter(Boolean));

  // Count TARSEC list companies
  const tarsecCount = contacts.filter((c) => c.tarsecList).length;

  const stats = [
    { label: 'Companies', value: totalCompanies, color: 'bg-blue-500' },
    { label: 'House Districts', value: houseDistricts.size, color: 'bg-indigo-500' },
    { label: 'Senate Districts', value: senateDistricts.size, color: 'bg-purple-500' },
    { label: 'Cities', value: cities.size, color: 'bg-green-500' },
    { label: 'TARSEC List', value: tarsecCount, color: 'bg-orange-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${stat.color}`} />
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
