// DonateSomethingElse.jsx
const DonateSomethingElse = () => {
  const donation = {
    id: 1,
    title: 'Need Books for Students',
    city: 'Sukkur City',
    desc: 'Help provide essential school books for Grade 5 students from low-income families.',
    category: 'Education',
    image: 'https://images.pexels.com/photos/256517/pexels-photo-256517.jpeg'
  };

  return (
    <div className="custom-donation">
      <h2>{donation.title}</h2>
      <p><strong>City:</strong> {donation.city}</p>
      <p><strong>Description:</strong> {donation.desc}</p>
      <p><strong>Category:</strong> {donation.category}</p>
      <img src={donation.image} alt={donation.title} />
    </div>
  );
};

export default DonateSomethingElse;
