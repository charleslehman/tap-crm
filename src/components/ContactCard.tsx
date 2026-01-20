import type { Contact } from '../types/contact';

interface ContactCardProps {
  contact: Contact;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

export function ContactCard({ contact, viewMode, onClick }: ContactCardProps) {
  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {contact.companyName}
          </h3>
          <p className="text-sm text-gray-500 truncate">
            {contact.city ? `${contact.city}, ${contact.state}` : contact.state || ''}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm">
          {contact.txHouseDistrict && (
            <div className="px-2 py-1 bg-blue-50 text-blue-700 rounded">
              <span className="font-medium">House:</span> {contact.txHouseDistrict}
            </div>
          )}
          {contact.txSenateDistrict && (
            <div className="px-2 py-1 bg-purple-50 text-purple-700 rounded">
              <span className="font-medium">Senate:</span> {contact.txSenateDistrict}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
    >
      <h3 className="font-semibold text-gray-900 truncate mb-1">
        {contact.companyName}
      </h3>

      <p className="text-sm text-gray-500 mb-3">
        {contact.city ? `${contact.city}, ${contact.state}` : contact.state || 'No location'}
      </p>

      {/* District Info - Prominent */}
      <div className="space-y-2 mb-3">
        {contact.txHouseDistrict && (
          <div className="p-2 bg-blue-50 rounded">
            <div className="text-xs text-blue-600 font-medium">House District {contact.txHouseDistrict}</div>
            {contact.houseRepName && (
              <div className="text-sm text-gray-700 truncate">{contact.houseRepName}</div>
            )}
          </div>
        )}
        {contact.txSenateDistrict && (
          <div className="p-2 bg-purple-50 rounded">
            <div className="text-xs text-purple-600 font-medium">Senate District {contact.txSenateDistrict}</div>
            {contact.senateRepName && (
              <div className="text-sm text-gray-700 truncate">{contact.senateRepName}</div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-400">
        {contact.tarsecList && (
          <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded">TARSEC</span>
        )}
        {contact.website && (
          <span className="text-blue-500 hover:underline" onClick={(e) => {
            e.stopPropagation();
            window.open(contact.website, '_blank');
          }}>
            Website
          </span>
        )}
      </div>
    </div>
  );
}
