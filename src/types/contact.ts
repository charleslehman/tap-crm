export type ListName =
  | 'Leads'
  | 'Social Outreach'
  | 'Welcome Package'
  | 'Active Client'
  | 'Inactive'
  | 'Not Interested'
  | string;

export interface Contact {
  id: string;
  companyName: string;
  cardUrl?: string;
  description: string;
  labels: string[];
  members: string[];

  // List/Stage info
  listId: string;
  listName: ListName;
  boardId: string;
  boardName: string;
  archived: boolean;

  // Platform presence
  linkedIn: string;
  twitter: string;
  website: string;

  // Relationship tracking
  followingTapLinkedIn: boolean;
  connectedWithKip: boolean;
  connectedWithGertie: boolean;
  followsTapPage: boolean;

  // Contact info
  email: string;
  phone: string;

  // Location
  fullAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;

  // Texas legislative info
  txHouseDistrict: string;
  houseRepName: string;
  txSenateDistrict: string;
  senateRepName: string;
  whoRepresentsMeLink: string;

  // Other
  tarsecList: boolean;
  isCompany: boolean;
  notes: string;

  // Dates
  dueDate: string;
  startDate: string;
  lastActivityDate: string;

  // Trello metadata
  attachmentCount: number;
  attachmentLinks: string;
  checklistTotal: number;
  checklistCompleted: number;
  voteCount: number;
  commentCount: number;
}

export interface FilterState {
  search: string;
  listName: ListName | 'All';
  hasLinkedIn: boolean | null;
  hasWebsite: boolean | null;
  hasTwitter: boolean | null;
  state: string | 'All';
}

export type ViewMode = 'grid' | 'list';
