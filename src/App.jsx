import { Route, Router, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx';
import NavigationBar from './components/NavigationBar/NavigationBar.jsx';
import AboutUsPage from './pages/AboutUsPage/AboutUsPage.jsx';
import Contact from './pages/ContactPage/Contact.jsx';
import SuccessStories from './pages/SuccessStoriesPage/SuccessStories.jsx';



function App() {
  return (
      <>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success-stories" element={<SuccessStories />} />
        </Routes>
      </>
  )
}

export default App;