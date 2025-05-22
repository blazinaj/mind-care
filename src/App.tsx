import React from 'react';
import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import AssessmentSection from './components/AssessmentSection';
import Providers from './components/Providers';
import TreatmentPlan from './components/TreatmentPlan';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {showDashboard ? (
        <Dashboard />
      ) : (
        <>
          <Hero />
          <HowItWorks />
          <AssessmentSection onAssessmentComplete={() => setShowDashboard(true)} />
          <Providers />
          <TreatmentPlan />
          <FAQ />
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;