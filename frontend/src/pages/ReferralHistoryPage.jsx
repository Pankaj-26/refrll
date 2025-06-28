const ReferralHistoryPage = () => {
  const referrals = [
    { candidate: 'Alice Smith', position: 'Frontend Developer', status: 'Hired', date: '2025-03-15' },
    { candidate: 'Bob Johnson', position: 'Backend Developer', status: 'Interviewing', date: '2025-04-20' }
  ];

  return (
    <div className="max-w-5xl mx-auto p-6 pt-20">
      <h1 className="text-2xl font-bold mb-8">Referral History</h1>
      <div className="space-y-4">
        {referrals.map((referral, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{referral.candidate}</h3>
                <p className="text-gray-600">{referral.position}</p>
              </div>
              <div className="text-right">
                <p className={referral.status === 'Hired' ? 'text-green-500' : 'text-yellow-500'}>
                  {referral.status}
                </p>
                <p className="text-sm text-gray-500">{referral.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default ReferralHistoryPage;