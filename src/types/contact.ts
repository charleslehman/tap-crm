export type ListName = string;

export interface Contact {
  id: string;
  companyName: string;
  cardUrl?: string;
  description: string;
  labels: string[];
  members: string[];

  listId: string;
  listName: ListName;
  boardId: string;
  boardName: string;
  archived: boolean;

  linkedIn: string;
  twitter: string;
  website: string;

  followingTapLinkedIn: boolean;
  connectedWithKip: boolean;
  connectedWithGertie: boolean;
  followsTapPage: boolean;

  email: string;
  phone: string;

  fullAddress: string;
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;

  txHouseDistrict: string;
  houseRepName: string;
  txSenateDistrict: string;
  senateRepName: string;
  whoRepresentsMeLink: string;

  tarsecList: boolean;
  isCompany: boolean;
  notes: string;

  dueDate: string;
  startDate: string;
  lastActivityDate: string;

  attachmentCount: number;
  attachmentLinks: string;
  checklistTotal: number;
  checklistCompleted: number;
  voteCount: number;
  commentCount: number;
}

export interface FilterState {
  search: string;
  houseDistrict: string;
  senateDistrict: string;
  city: string;
}

export type ViewMode = 'grid' | 'list';
