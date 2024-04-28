// Home.tsx
// Author: Jun Beom

import React from 'react';
import '../style/pages/home.css';
import Searchbar from '../components/Searchbar';

const Home: React.FC = () => {
    return (
        <div>
            <section id="home" className="home">
                <div className="home__container">
                    <Searchbar />
                </div>
            </section>
        </div>
    );
};

export default Home;
