import type { Contact } from '../types/contact';

const SHEET_ID = '1FIQZP9Www61affUlC1UjBhMJSoW7gT1w73np_GkSOos';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentCell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentCell += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentCell);
        currentCell = '';
      } else if (char === '\n' || (char === '\r' && nextChar === '\n')) {
        currentRow.push(currentCell);
        rows.push(currentRow);
        currentRow = [];
        currentCell = '';
        if (char === '\r') i++;
      } else if (char !== '\r') {
        currentCell += char;
      }
    }
  }

  if (currentCell || currentRow.length > 0) {
    currentRow.push(currentCell);
    rows.push(currentRow);
  }

  return rows;
}

function parseBoolean(value: string): boolean {
  const lower = value.toLowerCase().trim();
  return lower === 'yes' || lower === 'true' || lower === '1';
}

export function parseSheetRow(row: string[], headers: string[], index: number): Contact {
  const getValue = (columnName: string): string => {
    const idx = headers.findIndex(h => h.toLowerCase().trim() === columnName.toLowerCase().trim());
    return idx >= 0 ? (row[idx] || '').trim() : '';
  };

  const companyName = getValue('Card Name');

  return {
    id: `contact-${index}`,
    companyName,
    cardUrl: undefined,
    description: '',
    labels: [],
    members: [],

    listId: '',
    listName: 'Contacts',
    boardId: '',
    boardName: '',
    archived: false,

    linkedIn: getValue('LinkedIn'),
    twitter: getValue('Twitter'),
    website: getValue('Website'),

    followingTapLinkedIn: false,
    connectedWithKip: false,
    connectedWithGertie: false,
    followsTapPage: false,

    email: '',
    phone: '',

    fullAddress: getValue('Full Add'),
    streetAddress: getValue('Street Address'),
    city: getValue('City'),
    state: getValue('State'),
    zipcode: getValue('Zipcode'),

    txHouseDistrict: getValue('TX House District'),
    houseRepName: getValue('House Representative Name'),
    txSenateDistrict: getValue('TX Senate District'),
    senateRepName: getValue('Senate Representative Name'),
    whoRepresentsMeLink: getValue('Who Represents Me? Link'),

    tarsecList: parseBoolean(getValue('TARSEC List?')),
    isCompany: parseBoolean(getValue('Company?')),
    notes: getValue('NOTES'),

    dueDate: '',
    startDate: '',
    lastActivityDate: '',

    attachmentCount: 0,
    attachmentLinks: '',
    checklistTotal: 0,
    checklistCompleted: 0,
    voteCount: 0,
    commentCount: 0,
  };
}

export async function fetchContacts(): Promise<Contact[]> {
  const response = await fetch(CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet: ${response.statusText}`);
  }

  const text = await response.text();
  const rows = parseCSV(text);

  if (rows.length < 2) {
    return [];
  }

  const headers = rows[0];
  const dataRows = rows.slice(1);

  return dataRows
    .filter((row) => {
      // Filter out empty rows and rows without a company name
      const cardNameIdx = headers.findIndex(h => h.toLowerCase().trim() === 'card name');
      const cardName = cardNameIdx >= 0 ? (row[cardNameIdx] || '').trim() : '';
      return cardName.length > 0;
    })
    .map((row, index) => parseSheetRow(row, headers, index));
}
