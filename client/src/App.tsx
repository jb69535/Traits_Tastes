// App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PersonalityTestPage from './pages/PersonalityTestPage';
import Home from './pages/Home';

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
