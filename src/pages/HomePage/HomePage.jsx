import { useNavigate } from 'react-router-dom';
import { useUserRole } from '../../context/UserRoleContext';

function HomePage() {
  const navigate = useNavigate();
  const { setRole } = useUserRole();

  return (
    <div className="bg-gray-50 min-h-screen w-7xl pt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 text-center py-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Chariflow</h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          A platform to give and receive with dignity. Help others or ask for help.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          <button
            onClick={() => {
              setRole('donor');
              navigate('/donate');
            }}
            className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-xl text-base font-medium shadow-md transition duration-300"
          >
            I Want to Donate
          </button>

          <button
            onClick={() => {
              setRole('taker');
              navigate('/donate');
            }}
            className="px-8 py-3 bg-black hover:bg-gray-800 text-white rounded-xl text-base font-medium shadow-md transition duration-300"
          >
            I Need a Donation
          </button>
        </div>
      </div>
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
