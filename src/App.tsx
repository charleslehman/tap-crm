import { Dashboard } from './components/Dashboard';
import { useContacts } from './hooks/useContacts';

function App() {
  const { contacts, loading, error, refetch } = useContacts();

  return (
    <Dashboard
      contacts={contacts}
      loading={loading}
      error={error}
      onRefresh={refetch}
    />
  );
}

export default App;
