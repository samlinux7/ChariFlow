import './NavigationBar.css';
import { Link } from 'react-router-dom';
function NavigationBar() {
    return (
        <ul className="navigation-bar">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/success-stories'>Success Stories</Link></li>
        </ul>
    )
}

export default NavigationBar;