import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../../context/UserRoleContext';

function HomePage() {
  const navigate = useNavigate();
  const { setRole } = useUserRole();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Chariflow</h1>
      <p style={styles.subheading}>
        A platform to give and receive with dignity. Help others or ask for help.
      </p>

      <button onClick={() => {
        setRole('donor');
        navigate('/donate');
      }} style={styles.button}>
        I Want to Donate
      </button>

      <button onClick={() => {
        setRole('taker');
        navigate('/donate');
      }} style={styles.button}>
        I Need a Donation
      </button>

      {/* ✅ Volunteer Dashboard Button */}
      <button onClick={() => {
        navigate('/volunteer');
      }} style={{ ...styles.button, backgroundColor: '#6c63ff', marginTop: '20px' }}>
        Volunteer Dashboard
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
    marginBottom: '2.5rem',
  },
  button: {
    padding: '14px 30px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    margin: '10px',
  },
};

export default HomePage;
