import React from 'react';
import SectionHeading from '../components/SectionHeading';
import ClubCard from '../components/ClubCard';
import { clubs } from '../data/clubs';
import '../styles/Clubs.css';

export default function Clubs() {
  return (
    <section className="clubs-section container" id="clubs">
      <SectionHeading
        title="EXPLORE OUR CLUBS"
        subtitle="Find the space where you belong."
        align="center"
      />
      <div className="clubs-list">
        {clubs.map((club, index) => (
          <ClubCard key={club.id} club={club} index={index} />
        ))}
      </div>
    </section>
  );
}
