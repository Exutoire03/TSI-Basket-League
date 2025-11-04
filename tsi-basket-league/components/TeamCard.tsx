import React from 'react';

interface TeamCardProps {
  logo: string;
  name: string;
  city: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ logo, name, city }) => {
  return (
    <div className="bg-background-secondary dark:bg-gray-800 shadow-md rounded-lg p-6 text-center hover:shadow-xl hover:bg-hover transition-all transform hover:-translate-y-2">
      <img src={logo} alt={`${name} logo`} className="w-24 h-24 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-text-primary dark:text-white">{name}</h3>
      <p className="text-text-secondary dark:text-gray-400">{city}</p>
    </div>
  );
};

export default TeamCard;
