import RequestFeed from '../../components/RequestFeed';
import DonationForm from '../../components/DonationForm';
import DonateSomethingElse from '../../components/DonateSomethingElse';
import DonationCard from '../../components/DonationCard';
import { useDonations } from '../../context/DonationsContext';

function DonorPage() {
  const [view, setView] = useState('default'); // 'default' | 'donationForm' | 'somethingElse'
  const { donations } = useDonations(); // ✅ donor-made donations

  return (
    <div style={{ padding: '20px' }}>
      {/* ===== Default View: Requests + Form + Donor Donations ===== */}
      {view === 'default' && (
        <>
          {/* Request Section */}
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '8px' }}>Aid Requests from Others</h2>
            <RequestFeed />
          </section>

          {/* Custom Donor Donations */}
          {donations.length > 0 && (
            <section style={{ marginBottom: '40px' }}>
              <h2 style={{ borderBottom: '2px solid #ccc', paddingBottom: '8px' }}>Your Custom Donations</h2>
              {donations.map((donation) => (
                <DonationCard key={donation.id} request={donation} />
              ))}
            </section>
          )}
        </>
      )}

      {/* ===== DonationForm View ===== */}
      {(view === 'default' || view === 'donationForm') && (
        <DonationForm
          onCustomDonationClick={() => setView('somethingElse')}
          onInteract={() => setView('donationForm')}
        />
      )}

      {/* ===== Something Else View ===== */}
      {view === 'somethingElse' && (
        <DonateSomethingElse onBack={() => setView('default')} />
      )}
    </div>
  );
}

export default DonorPage;
