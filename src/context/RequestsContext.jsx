import React, { createContext, useState, useContext } from 'react';

const RequestsContext = createContext();

export const RequestsProvider = ({ children }) => {
const [requests, setRequests] = useState([
  {
    id: 1,
    title: "Need Books for Students",
    city: "Sukkur City",
    desc: "Help provide essential school books for Grade 5 students from low-income families.",
    category: "Education",
    image: "https://images.pexels.com/photos/256517/pexels-photo-256517.jpeg",
    fullDescription: "Our local elementary school is facing a critical shortage of textbooks...",
    goal: 1000,
    raised: 650,
    supporters: 23,
    organizer: "Sarah Johnson",
    organizerRole: "School Principal",
    urgency: "High",
    beneficiaries: "40 Grade 5 students",
    timeline: "Books needed by next month"
  },
  {
    id: 2,
    title: "Medical Support for Surgery",
    city: "Karachi",
    desc: "Urgent help needed for a child's heart surgery.",
    category: "Healthcare",
    image: "https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg",
    fullDescription: "Ali, a 6-year-old, needs immediate heart surgery. His family cannot afford the cost.",
    goal: 5000,
    raised: 1300,
    supporters: 45,
    organizer: "Dr. Usman Ali",
    organizerRole: "Pediatric Surgeon",
    urgency: "Critical",
    beneficiaries: "1 child",
    timeline: "Surgery scheduled in two weeks"
  },
  {
    id: 3,
    title: "Blankets for Winter",
    city: "Quetta",
    desc: "Distribute warm blankets to homeless families during harsh winter nights.",
    category: "Clothing",
    image: "https://images.pexels.com/photos/6994992/pexels-photo-6994992.jpeg",
    fullDescription: "Every winter, dozens of people suffer due to freezing temperatures. Help us distribute 200 blankets.",
    goal: 2000,
    raised: 700,
    supporters: 18,
    organizer: "Amna Malik",
    organizerRole: "NGO Volunteer",
    urgency: "Medium",
    beneficiaries: "200 families",
    timeline: "Distribution begins next month"
  },
  {
    id: 4,
    title: "Support for Orphanage Renovation",
    city: "Lahore",
    desc: "The local orphanage needs repairs and new furniture.",
    category: "Shelter",
    image: "https://images.pexels.com/photos/3935323/pexels-photo-3935323.jpeg",
    fullDescription: "Walls are cracked, bathrooms are broken, and the children have no proper beds. Help us renovate with dignity.",
    goal: 8000,
    raised: 2400,
    supporters: 60,
    organizer: "Mohammad Naveed",
    organizerRole: "Orphanage Manager",
    urgency: "High",
    beneficiaries: "65 children",
    timeline: "Renovation to start in 2 weeks"
  },
  {
    id: 5,
    title: "Ramadan Food Boxes",
    city: "Islamabad",
    desc: "Sponsor food boxes for families fasting during Ramadan.",
    category: "Food",
    image: "https://images.pexels.com/photos/7656409/pexels-photo-7656409.jpeg",
    fullDescription: "Each box contains rice, flour, oil, and essentials to support a family of 5 for a week.",
    goal: 3000,
    raised: 2900,
    supporters: 110,
    organizer: "Faiza Rehman",
    organizerRole: "Community Leader",
    urgency: "Low",
    beneficiaries: "100 families",
    timeline: "Ongoing during Ramadan"
  },
  {
    id: 6,
    title: "Digital Devices for Rural Kids",
    city: "Gilgit",
    desc: "Provide tablets to students in remote areas for online learning.",
    category: "Education",
    image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
    fullDescription: "Students in Gilgit are missing online classes due to lack of devices. Help bridge the digital divide.",
    goal: 4000,
    raised: 1750,
    supporters: 36,
    organizer: "Shahbaz Ali",
    organizerRole: "Teacher",
    urgency: "Medium",
    beneficiaries: "30 students",
    timeline: "Needed before next semester"
  }
]);

  const addRequest = (newRequest) => {
    setRequests(prev => [...prev, newRequest]);
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest }}>
      {children}
    </RequestsContext.Provider>
  );
};

export const useRequests = () => useContext(RequestsContext);
export { RequestsContext }; // ✅ Add this to fix named import errors
