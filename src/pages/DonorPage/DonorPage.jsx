import React, { useState } from 'react';
import RequestFeed from '../../components/RequestFeed';
import DonationForm from '../../components/DonationForm';
import DonateSomethingElse from '../../components/DonateSomethingElse';

function DonorPage() {
  const [view, setView] = useState('default'); // 'default' | 'donationForm' | 'somethingElse'

  return (
    <div>
      {/* Show RequestFeed only in default view */}
      {view === 'default' && <RequestFeed />}

      {/* Show DonationForm in both default and donationForm view */}
      {(view === 'default' || view === 'donationForm') && (
        <DonationForm
          onCustomDonationClick={() => setView('somethingElse')}
          onInteract={() => setView('donationForm')}
        />
      )}

      {/* Show custom donation form */}
      {view === 'somethingElse' && (
        <DonateSomethingElse onBack={() => setView('default')} />
      )}
    </div>
  );
}

export default DonorPage;
