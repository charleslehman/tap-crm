import type { Contact } from '../types/contact';

const SHEET_ID = '1eoJ3UDViZg-JJgd8XMhX-yeKz3E4qQqBlXQLXQAdeO0';
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

function parseNumber(value: string): number {
  const num = parseInt(value, 10);
  return isNaN(num) ? 0 : num;
}

export function parseSheetRow(row: string[], headers: string[]): Contact {
  const getValue = (columnName: string): string => {
    const index = headers.indexOf(columnName);
    return index >= 0 ? (row[index] || '').trim() : '';
  };

  const labels = getValue('Labels')
    .split(',')
    .map((l) => l.trim())
    .filter(Boolean);

  const members = getValue('Members')
    .split(',')
    .map((m) => m.trim())
    .filter(Boolean);

  return {
    id: getValue('Card ID') || crypto.randomUUID(),
    companyName: getValue('Card Name'),
    cardUrl: getValue('Card URL') || undefined,
    description: getValue('Card Description'),
    labels,
    members,

    listId: getValue('List ID'),
    listName: getValue('List Name') || 'Leads',
    boardId: getValue('Board ID'),
    boardName: getValue('Board Name'),
    archived: parseBoolean(getValue('Archived')),

    linkedIn: getValue('LinkedIn'),
    twitter: getValue('Twitter'),
    website: getValue('Website'),

    followingTapLinkedIn: parseBoolean(getValue('Following from TAP LinkedIn?')),
    connectedWithKip: parseBoolean(getValue('Connected with Kip on Linkedin?')),
    connectedWithGertie: parseBoolean(getValue('Connected with Gertie on Linkedin?')),
    followsTapPage: parseBoolean(getValue('Follows TAP Page?')),

    email: getValue('Email Address'),
    phone: getValue('Phone #'),

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

    dueDate: getValue('Due Date'),
    startDate: getValue('Start Date'),
    lastActivityDate: getValue('Last Activity Date'),

    attachmentCount: parseNumber(getValue('Attachment Count')),
    attachmentLinks: getValue('Attachment Links'),
    checklistTotal: parseNumber(getValue('Checklist Item Total Count')),
    checklistCompleted: parseNumber(getValue('Checklist Item Completed Count')),
    voteCount: parseNumber(getValue('Vote Count')),
    commentCount: parseNumber(getValue('Comment Count')),
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
    .filter((row) => row.some((cell) => cell.trim()))
    .map((row) => parseSheetRow(row, headers));
}
