// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PersonalityTestPage from './pages/PersonalityTestPage';
import Home from './pages/Home';


/**
 * Main application component responsible for setting up the router and defining the application's navigation structure.
 * 
 * @remarks
 * This component uses React Router to define routes for the application. It serves as the root component that includes the `Header` and `Footer` components, which are displayed on every page. Routes are defined for the `Home` page and the `PersonalityTestPage`. This setup facilitates navigation between different sections of the application without page reloads, enhancing user experience with smooth transitions and maintaining state across navigation.
 *  
 * */
function App() {
  return (
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/personality-test" element={<PersonalityTestPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
