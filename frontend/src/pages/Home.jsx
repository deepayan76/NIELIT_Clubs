import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Clubs from '../sections/Clubs';
import Register from '../sections/Register';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="page-wrapper">
      <Navbar />
      <main id="main-content">
        <Hero />
        <About />
        <Clubs />
        <Register />
      </main>
      <Footer />
    </div>
  );
}
