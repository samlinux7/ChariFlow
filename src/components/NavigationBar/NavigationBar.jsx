import './NavigationBar.css';
import { Link } from 'react-router-dom';
function NavigationBar() {
    return (
<<<<<<< HEAD
        <ul className="navigation-bar">
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/contact'>Contact</Link></li>
            <li><Link to='/success-stories'>Success Stories</Link></li>
        </ul>
    )
=======
        <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo / Brand */}
                    <div className="flex-shrink-0 text-2xl font-bold text-blue-600">
                        <Link to="/">Chariflow</Link>
                    </div>

                    {/* Desktop Menu */}
                    <ul className="hidden md:flex space-x-8 text-gray-700 font-medium text-lg">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className="hover:text-blue-600 transition duration-300"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Toggle */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-gray-700">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden px-4 pb-4">
                    <ul className="flex flex-col space-y-3 text-gray-700 font-medium text-lg">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className="block hover:text-blue-600 transition duration-300"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
>>>>>>> 08a248f (Updated UI for whole website)
}

export default NavigationBar;