import type { Contact } from '../types/contact';

interface ContactModalProps {
  contact: Contact;
  onClose: () => void;
}

function hasLinkedIn(contact: Contact): boolean {
  return Boolean(contact.linkedIn && contact.linkedIn.toLowerCase() !== 'no');
}

export function ContactModal({ contact, onClose }: ContactModalProps) {
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
                {contact.tarsecList && (
                  <span className="px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded-full">
                    TARSEC List
                  </span>
                )}
                {contact.isCompany && (
                  <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                    Company
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
        </div>
      </div>
    </div>
  );
}
