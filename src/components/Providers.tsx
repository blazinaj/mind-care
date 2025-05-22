import React from 'react';
import Card from './Card';

type ProviderCardProps = {
  name: string;
  specialty: string;
  image: string;
  description: string;
};

const ProviderCard: React.FC<ProviderCardProps> = ({ name, specialty, image, description }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="overflow-hidden rounded-xl mb-4 h-64">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <h3 className="text-xl font-semibold mb-1">{name}</h3>
      <p className="text-blue-600 font-medium mb-3">{specialty}</p>
      <p className="text-gray-600 flex-grow">{description}</p>
    </Card>
  );
};

const Providers: React.FC = () => {
  const providers = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Psychiatrist",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Dr. Johnson specializes in mood disorders and has over 15 years of experience helping patients with depression and anxiety."
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Psychiatrist",
      image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Dr. Chen focuses on ADHD and behavioral health, with expertise in medication management for adults and adolescents."
    },
    {
      name: "Dr. Aisha Patel",
      specialty: "Psychiatrist",
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "With a focus on integrative psychiatry, Dr. Patel combines traditional and holistic approaches to mental health treatment."
    }
  ];

  return (
    <section id="providers" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Providers</h2>
          <p className="text-lg text-gray-600">
            Meet our team of experienced psychiatrists dedicated to providing compassionate care.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {providers.map((provider, index) => (
            <ProviderCard 
              key={index}
              name={provider.name}
              specialty={provider.specialty}
              image={provider.image}
              description={provider.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Providers;