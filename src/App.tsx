import { Dashboard } from './components/Dashboard';
import { PasswordGate } from './components/PasswordGate';
import { useContacts } from './hooks/useContacts';

function App() {
  const { contacts, loading, error, refetch } = useContacts();

  return (
    <PasswordGate>
      <Dashboard
        contacts={contacts}
        loading={loading}
        error={error}
        onRefresh={refetch}
      />
    </PasswordGate>
  );
}

export default App;
