import type { Contact } from '../types/contact';

interface ContactCardProps {
  contact: Contact;
  viewMode: 'grid' | 'list';
  onClick: () => void;
}

const listColors: Record<string, string> = {
  Leads: 'bg-yellow-100 text-yellow-800',
  'Social Outreach': 'bg-blue-100 text-blue-800',
  'Welcome Package': 'bg-purple-100 text-purple-800',
  'Active Client': 'bg-green-100 text-green-800',
  Inactive: 'bg-gray-100 text-gray-800',
  'Not Interested': 'bg-red-100 text-red-800',
};

function hasLinkedIn(contact: Contact): boolean {
  return Boolean(contact.linkedIn && contact.linkedIn.toLowerCase() !== 'no');
}

export function ContactCard({ contact, viewMode, onClick }: ContactCardProps) {
  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const listColor = listColors[contact.listName] || 'bg-gray-100 text-gray-800';

  if (viewMode === 'list') {
    return (
      <div
        onClick={onClick}
        className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900 truncate">
              {contact.companyName}
            </h3>
            <span className={`px-2 py-0.5 text-xs rounded-full ${listColor}`}>
              {contact.listName}
            </span>
          </div>
          <p className="text-sm text-gray-500 truncate">
            {contact.description || contact.city ? `${contact.city}${contact.city && contact.state ? ', ' : ''}${contact.state}` : 'No description'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {contact.labels.slice(0, 2).map((label) => (
            <span
              key={label}
              className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {hasLinkedIn(contact) && (
            <button
              onClick={(e) => handleLinkClick(e, contact.linkedIn.startsWith('http') ? contact.linkedIn : `https://linkedin.com/company/${contact.linkedIn}`)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
              title="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
          )}
          {contact.website && (
            <button
              onClick={(e) => handleLinkClick(e, contact.website)}
              className="p-1.5 text-purple-600 hover:bg-purple-50 rounded"
              title="Website"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </button>
          )}
          {contact.twitter && (
            <button
              onClick={(e) => handleLinkClick(e, contact.twitter.startsWith('http') ? contact.twitter : `https://twitter.com/${contact.twitter}`)}
              className="p-1.5 text-cyan-600 hover:bg-cyan-50 rounded"
              title="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
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
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 truncate flex-1 mr-2">
          {contact.companyName}
        </h3>
        <span className={`px-2 py-0.5 text-xs rounded-full whitespace-nowrap ${listColor}`}>
          {contact.listName}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-3 line-clamp-2">
        {contact.description || (contact.city ? `${contact.city}${contact.state ? `, ${contact.state}` : ''}` : 'No description')}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {contact.labels.slice(0, 3).map((label) => (
          <span
            key={label}
            className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          {contact.city && <span>{contact.city}</span>}
          {contact.city && contact.state && <span>,</span>}
          {contact.state && <span>{contact.state}</span>}
        </div>
        <div className="flex items-center gap-1">
          {hasLinkedIn(contact) && (
            <button
              onClick={(e) => handleLinkClick(e, contact.linkedIn.startsWith('http') ? contact.linkedIn : `https://linkedin.com/company/${contact.linkedIn}`)}
              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
              title="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </button>
          )}
          {contact.website && (
            <button
              onClick={(e) => handleLinkClick(e, contact.website)}
              className="p-1.5 text-purple-600 hover:bg-purple-50 rounded"
              title="Website"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </button>
          )}
          {contact.twitter && (
            <button
              onClick={(e) => handleLinkClick(e, contact.twitter.startsWith('http') ? contact.twitter : `https://twitter.com/${contact.twitter}`)}
              className="p-1.5 text-cyan-600 hover:bg-cyan-50 rounded"
              title="Twitter"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
