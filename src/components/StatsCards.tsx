import type { Contact } from '../types/contact';

interface StatsCardsProps {
  contacts: Contact[];
}

export function StatsCards({ contacts }: StatsCardsProps) {
  const totalContacts = contacts.length;
  const withLinkedIn = contacts.filter((c) => c.linkedIn && c.linkedIn.toLowerCase() !== 'no').length;
  const withWebsite = contacts.filter((c) => c.website).length;
  const withTwitter = contacts.filter((c) => c.twitter).length;
  const inTexas = contacts.filter((c) => c.state === 'TX' || c.state === 'Texas').length;

  const stats = [
    { label: 'Total Contacts', value: totalContacts, color: 'bg-blue-500' },
    { label: 'LinkedIn', value: withLinkedIn, color: 'bg-sky-500' },
    { label: 'Website', value: withWebsite, color: 'bg-purple-500' },
    { label: 'Twitter', value: withTwitter, color: 'bg-cyan-500' },
    { label: 'In Texas', value: inTexas, color: 'bg-orange-500' },
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
