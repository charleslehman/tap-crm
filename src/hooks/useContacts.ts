import { useState, useEffect, useCallback } from 'react';
import type { Contact } from '../types/contact';
import { fetchContacts } from '../utils/parseGoogleSheet';

interface UseContactsResult {
  contacts: Contact[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useContacts(): UseContactsResult {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContacts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load contacts');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return { contacts, loading, error, refetch: loadContacts };
}
