import DonationCard from './DonationCard';

const requests = [
  {
    id: 1,
    title: "Need Books for Students",
    city: "Sukkur City",
    desc: "Help provide essential school books for Grade 5 students from low-income families.",
    category: "Education",
    image: "https://images.pexels.com/photos/256517/pexels-photo-256517.jpeg"
  },
  {
    id: 2,
    title: "Medical Support Needed",
    city: "Suckkur City",
    desc: "Emergency medical support needed for life-saving surgery.",
    category: "Healthcare",
    image: "https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg"
  },
  {
    id: 3,
    title: "Food Drive for Families",
    city: "Sukkur City",
    desc: "Support our monthly food drive to help families in need.",
    category: "Food",
    image: "https://images.pexels.com/photos/6994992/pexels-photo-6994992.jpeg"
  }
];

const RequestFeed = () => {
  return (
    <div>     
    {requests.map(request => (
            <DonationCard key={request.id} request={request} />
          ))}
    
    </div>
  );
};

export default RequestFeed;