import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Chariflow</h1>
      <p style={styles.subheading}>
        A platform to give and receive with dignity. Help others or ask for help.
      </p>
      <button onClick={() => navigate('/donate')} style={styles.button}>
        Go to Donation Page
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: '4rem',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    minHeight: '80vh',
  },
  heading: {
    fontSize: '2.5rem',
    color: '#333',
    marginBottom: '1rem',
  },
  subheading: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '2rem',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    backgroundColor: '#6c63ff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
};

export default HomePage;
