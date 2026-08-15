import React from 'react';
import Hero from '../components/Hero.jsx';
import ContactActions from '../components/ContactActions.jsx';
import About from '../components/About.jsx';
import Services from '../components/Services.jsx';
import FeaturedWork from '../components/FeaturedWork.jsx';
import Process from '../components/Process.jsx';
import Testimonials from '../components/Testimonials.jsx';
import ContactSection from '../components/ContactSection.jsx';

export default function Home({ navigate }) {
  return (
    <div className="animate-fade-in">
      <Hero navigate={navigate} />
      <ContactActions navigate={navigate} />
      <About />
      <Services />
      <FeaturedWork navigate={navigate} />
      <Process />
      <Testimonials />
      <ContactSection navigate={navigate} />
    </div>
  );
}
