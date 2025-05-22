import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import Card from './Card';
import { Calendar, Clock, AlertCircle } from 'lucide-react';
import AssessmentDetails from './assessment/AssessmentDetails';

type Assessment = {
  id: string;
  created_at: string;
  status: string;
  workflow_status: string;
  answers: Array<{
    questionId: number;
    value: number;
  }>;
};

const Dashboard: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setAssessments(data || []);
    } catch (err) {
      setError('Failed to load assessments');
      console.error('Error fetching assessments:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted':
        return 'text-blue-600 bg-blue-100';
      case 'reviewed':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid gap-6">
              {[1, 2].map((i) => (
                <div key={i} className="h-40 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Your Assessments</h1>
        
        {error && (
          <Card className="mb-6 bg-red-50 border border-red-200">
            <div className="flex items-center text-red-700">
              <AlertCircle size={20} className="mr-2" />
              {error}
            </div>
          </Card>
        )}

        <div className="grid gap-6">
          {assessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <Calendar size={18} className="text-gray-500 mr-2" />
                    <span className="text-gray-700">
                      {new Date(assessment.created_at).toLocaleDateString()}
                    </span>
                    <Clock size={18} className="text-gray-500 ml-4 mr-2" />
                    <span className="text-gray-700">
                      {new Date(assessment.created_at).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(assessment.status)}`}
                    >
                      {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => setSelectedAssessment(assessment.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </Card>
          ))}

          {assessments.length === 0 && !error && (
            <Card className="text-center py-8">
              <p className="text-gray-600 mb-4">No assessments found</p>
              <a 
                href="#assessment" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Take your first assessment
              </a>
            </Card>
          )}
        </div>
      </div>
      {selectedAssessment && (
        <AssessmentDetails
          assessmentId={selectedAssessment}
          workflowStatus={assessments.find(a => a.id === selectedAssessment)?.workflow_status || 'assessment_completed'}
          onClose={() => setSelectedAssessment(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;