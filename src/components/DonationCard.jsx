import { Calendar, MapPin, Tag } from 'lucide-react';
import './DonationCard.css';
import { Link } from 'react-router-dom';
import { useUserRole } from '../context/UserRoleContext';



const DonationCard = ({ request }) => {
  const { id, title, city, desc, image, category, date } = request;
  const { role } = useUserRole();

  return (
    <div className="donation-card">
      <div className="donation-card-image-wrapper">
        <img 
          src={image || "https://images.pexels.com/photos/3943716/pexels-photo-3943716.jpeg"} 
          alt={title}
          className="donation-card-image"
        />
      </div>

      <div className="donation-card-content">
        <div className="donation-card-category">
          <Tag className="icon tag-icon" />
          <span className="category-text">{category}</span>
        </div>

        <h3 className="donation-card-title">{title}</h3>

        <div className="donation-card-location">
          <MapPin className="icon" />
          <span>{city}</span>
        </div>

        <div className="donation-card-date">
          <Calendar className="icon" />
          <span>{date || "Posted today"}</span>
        </div>

        <p className="donation-card-description">{desc}</p>

        <Link to={`/requests/${request.id}`}>
          {role === 'donor' ? 'Support this cause' : 'Request for this donation'}
        </Link>
      </div>
    </div>
  );
};

export default DonationCard;
