import type { Contact } from '../types/contact';

interface ContactModalProps {
  contact: Contact;
  onClose: () => void;
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

export function ContactModal({ contact, onClose }: ContactModalProps) {
  const listColor = listColors[contact.listName] || 'bg-gray-100 text-gray-800';

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {contact.companyName}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-3 py-1 text-sm rounded-full ${listColor}`}>
                  {contact.listName}
                </span>
                {contact.boardName && (
                  <span className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-full">
                    {contact.boardName}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Description */}
          {contact.description && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
              <p className="text-gray-900">{contact.description}</p>
            </div>
          )}

          {/* Labels */}
          {contact.labels.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Labels</h3>
              <div className="flex flex-wrap gap-2">
                {contact.labels.map((label) => (
                  <span
                    key={label}
                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Platform Links */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Platform Presence</h3>
            <div className="flex flex-wrap gap-3">
              {hasLinkedIn(contact) ? (
                <a
                  href={contact.linkedIn.startsWith('http') ? contact.linkedIn : `https://linkedin.com/company/${contact.linkedIn}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </a>
              ) : (
                <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg">
                  No LinkedIn
                </span>
              )}
              {contact.website ? (
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  Website
                </a>
              ) : (
                <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg">
                  No Website
                </span>
              )}
              {contact.twitter ? (
                <a
                  href={contact.twitter.startsWith('http') ? contact.twitter : `https://twitter.com/${contact.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-50 text-cyan-700 rounded-lg hover:bg-cyan-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter/X
                </a>
              ) : (
                <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg">
                  No Twitter
                </span>
              )}
            </div>
          </div>

          {/* Relationship Tracking */}
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Relationship Status</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div
                className={`p-3 rounded-lg text-center ${
                  contact.followingTapLinkedIn
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                <div className="text-lg mb-1">
                  {contact.followingTapLinkedIn ? '✓' : '—'}
                </div>
                <div className="text-xs">Following TAP</div>
              </div>
              <div
                className={`p-3 rounded-lg text-center ${
                  contact.connectedWithKip
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                <div className="text-lg mb-1">
                  {contact.connectedWithKip ? '✓' : '—'}
                </div>
                <div className="text-xs">Connected w/ Kip</div>
              </div>
              <div
                className={`p-3 rounded-lg text-center ${
                  contact.connectedWithGertie
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                <div className="text-lg mb-1">
                  {contact.connectedWithGertie ? '✓' : '—'}
                </div>
                <div className="text-xs">Connected w/ Gertie</div>
              </div>
              <div
                className={`p-3 rounded-lg text-center ${
                  contact.followsTapPage
                    ? 'bg-green-50 text-green-700'
                    : 'bg-gray-50 text-gray-400'
                }`}
              >
                <div className="text-lg mb-1">
                  {contact.followsTapPage ? '✓' : '—'}
                </div>
                <div className="text-xs">Follows TAP Page</div>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          {(contact.email || contact.phone) && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                {contact.email && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                )}
                {contact.phone && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-blue-600 hover:underline"
                    >
                      {contact.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Location */}
          {(contact.city || contact.state || contact.fullAddress) && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Location</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                {contact.fullAddress ? (
                  <p className="text-gray-700">{contact.fullAddress}</p>
                ) : (
                  <p className="text-gray-700">
                    {[contact.streetAddress, contact.city, contact.state, contact.zipcode]
                      .filter(Boolean)
                      .join(', ')}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Texas Legislative Info */}
          {(contact.txHouseDistrict || contact.txSenateDistrict) && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Texas Legislative Districts</h3>
              <div className="grid grid-cols-2 gap-4">
                {contact.txHouseDistrict && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm text-orange-600 font-medium">House District {contact.txHouseDistrict}</p>
                    {contact.houseRepName && (
                      <p className="text-gray-700 mt-1">{contact.houseRepName}</p>
                    )}
                  </div>
                )}
                {contact.txSenateDistrict && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm text-orange-600 font-medium">Senate District {contact.txSenateDistrict}</p>
                    {contact.senateRepName && (
                      <p className="text-gray-700 mt-1">{contact.senateRepName}</p>
                    )}
                  </div>
                )}
              </div>
              {contact.whoRepresentsMeLink && (
                <a
                  href={contact.whoRepresentsMeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-sm text-blue-600 hover:underline"
                >
                  View on Who Represents Me?
                </a>
              )}
            </div>
          )}

          {/* Notes */}
          {contact.notes && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
              <p className="text-gray-700 bg-yellow-50 p-3 rounded-lg whitespace-pre-wrap">{contact.notes}</p>
            </div>
          )}

          {/* Trello Link */}
          {contact.cardUrl && (
            <div className="pt-4 border-t border-gray-200">
              <a
                href={contact.cardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Open in Trello
              </a>
            </div>
          )}

          {/* Last Activity */}
          {contact.lastActivityDate && (
            <div className="text-sm text-gray-400">
              Last Activity: {contact.lastActivityDate}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
