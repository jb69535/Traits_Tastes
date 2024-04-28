// Home.tsx
// Author: Jun Beom

import React from "react";
import "../style/pages/home.css";
import Searchbar from "../components/Searchbar";

const Home: React.FC = () => {
  return (
    <div>
      <section id="home" className="home">
        <div className="home__container">
          <section id="search" className="search">
            <Searchbar />
          </section>
        </div>
      </section>
      <section id="about">
        <div>
          <p>Welcome to Traits & Tastes – Traits Flows Tastes Shows</p>
          <p>
            We're a platform dedicated to enriching the wine experience by
            tapping into the intricate world of personality types.
          </p>
          <p>
            Through our innovative approach, we delve into the renowned 16
            personalities framework, crafting a truly individualized journey for
            each of our users.
          </p>
          <p>
            Our mission is simple yet profound: to cultivate a vibrant community
            of wine enthusiasts united by a shared passion for discovery and
            enjoyment.
          </p>
          <p>
            At Wine Personality Pairing, we believe that understanding your
            personality is the key to unlocking a world of wine experiences
            tailored to your unique preferences.
          </p>
          <p>
            Whether you're an adventurous explorer, a meticulous planner, or a
            spontaneous spirit, our platform is here to guide you on an
            unforgettable journey through the diverse landscape of wine.
          </p>
          <p>
            Join us as we embark on this exciting adventure together, exploring
            the depths of personality and wine, one sip at a time.
          </p>
        </div>
      </section>
      <section id="contact">
        <h1 className="contact__title">Let's Talk</h1>
        <a href="mailto:jbeomfdt@gmail.com" className="contact_email">
          Email: jbeomfdt@gmail.com{" "}
        </a>
        <div className="contact__links">
          <a href="https://github.com/jb69535/Traits_Tastes">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
