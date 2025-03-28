import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import RoleBasedRender from '../../components/common/RoleBasedRender';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import AuthDebug from '../../components/common/AuthDebug';

/**
 * Main Mentorship page component with role-based views for students and alumni
 */
const MentorshipPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'active' | 'pending' | 'explore'>('active');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Simulate API call to fetch mentorship data
  useEffect(() => {
    const fetchMentorshipData = async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
    };
    
    fetchMentorshipData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner size="large" text="Loading mentorship data..." />;
  }


  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Mentorship</h1>
        
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search mentors..."
              className="px-4 py-2 pr-10 w-full md:w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg 
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>

          {/* Convert RoleBasedRender to explicit conditionals */}
          {isAuthenticated ? (
            user?.role === 'alumni' ? (
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Update Mentorship Profile
              </button>
            ) : (
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Find a Mentor
              </button>
            )
          ) : (
            <button className="px-4 py-2 bg-gray-200 text-gray-500 rounded-md cursor-not-allowed">
              Sign in to Access
            </button>
          )}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            className={`py-4 px-1 ${
              activeTab === 'active'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } font-medium text-sm sm:text-base`}
            onClick={() => setActiveTab('active')}
          >
            {user?.role === 'alumni' ? 'Active Mentorships' : 'My Mentors'}
          </button>
          <button
            className={`py-4 px-1 ${
              activeTab === 'pending'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } font-medium text-sm sm:text-base`}
            onClick={() => setActiveTab('pending')}
          >
            {user?.role === 'alumni' ? 'Pending Requests' : 'Pending Applications'}
          </button>
          <button
            className={`py-4 px-1 ${
              activeTab === 'explore'
                ? 'border-b-2 border-indigo-500 text-indigo-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } font-medium text-sm sm:text-base`}
            onClick={() => setActiveTab('explore')}
          >
            {user?.role === 'alumni' ? 'Open to Mentor' : 'Find Mentors'}
          </button>
        </nav>
      </div>

      {/* Replace RoleBasedRender with direct conditionals */}
      {isAuthenticated ? (
        user?.role === 'alumni' ? (
          <AlumniMentorshipView 
            activeTab={activeTab} 
            searchQuery={searchQuery} 
            setActiveTab={setActiveTab}
          />
        ) : user?.role === 'student' ? (
          <StudentMentorshipView 
            activeTab={activeTab} 
            searchQuery={searchQuery} 
            setActiveTab={setActiveTab}
          />
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Unknown user role</h3>
            <p className="text-gray-600">
              Your role ({user?.role}) is not recognized by the system.
            </p>
          </div>
        )
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Sign in to access mentorship</h3>
          <p className="text-gray-600">
            Join our community to connect with mentors and mentees.
          </p>
        </div>
      )}
    </div>
  );
};

// Types
interface Mentor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  yearsOfExperience: number;
  skills: string[];
  expertise: string[];
  availability: string;
  rating: number;
  bio: string;
  isAvailable: boolean;
}

interface MentorshipSession {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  studentId: string;
  studentName: string;
  studentAvatar: string;
  status: 'active' | 'pending' | 'completed' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  nextMeeting?: {
    date: Date;
    topic: string;
    link: string;
  };
  goals: string[];
  progress: number;
  notes?: string;
}

interface MentorshipViewProps {
  activeTab: string;
  searchQuery: string;
  setActiveTab?: (tab: 'active' | 'pending' | 'explore') => void;
}

/**
 * Alumni Mentorship View
 */
const AlumniMentorshipView: React.FC<MentorshipViewProps> = ({ activeTab, searchQuery, setActiveTab }) => {
  // Sample mentorship session data for alumni view
  const mentorshipSessions: MentorshipSession[] = [
    {
      id: '1',
      mentorId: '1', // current user
      mentorName: 'Parassana kumar',
      mentorAvatar: '',
      studentId: '2',
      studentName: 'Ashutosh kumar',
      studentAvatar: '',
      status: 'active',
      startDate: new Date(2024, 1, 15),
      nextMeeting: {
        date: new Date(2024, 3, 20, 15, 0),
        topic: 'Mock Interview Practice',
        link: 'https://meet.google.com/sow-jdnn-jxo'
      },
      goals: [
        'Prepare for technical interviews',
        'Review resume',
        'Discuss industry trends'
      ],
      progress: 65
    },
    {
      id: '2',
      mentorId: '1', // current user
      mentorName: "Rashmi ma'am",
      mentorAvatar: '',
      studentId: '3',
      studentName: 'Taylor Wilson',
      studentAvatar: '',
      status: 'active',
      startDate: new Date(2024, 0, 10),
      nextMeeting: {
        date: new Date(2024, 3, 22, 16, 30),
        topic: 'Career Planning Session',
        link: 'https://meet.google.com/sow-jdnn-jxo'
      },
      goals: [
        'Develop 5-year career plan',
        'Networking strategies',
        'Discuss further education options'
      ],
      progress: 45
    },
    {
      id: '3',
      mentorId: '1', // current user
      mentorName: 'Michael Chen',
      mentorAvatar: '',
      studentId: '4',
      studentName: 'Priya Patel',
      studentAvatar: '',
      status: 'pending',
      startDate: new Date(), // today
      goals: [
        'Learn about backend development',
        'Get guidance on open source contributions',
        'Interview preparation'
      ],
      progress: 0
    }
  ];

  // Filter sessions based on tab and search query
  const filteredSessions = mentorshipSessions.filter(session => {
    // Filter by tab
    if (activeTab === 'active' && session.status !== 'active') return false;
    if (activeTab === 'pending' && session.status !== 'pending') return false;
    
    // Filter by search if applicable
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return session.studentName.toLowerCase().includes(query);
    }
    
    return true;
  });

  // Mentorship statistics
  const mentorshipStats = {
    totalMentees: 15,
    activeMentorships: 2,
    completedMentorships: 10,
    pendingRequests: 3,
    averageRating: 4.8,
    hoursContributed: 48
  };

  return (
    <div>
      {/* Alumni mentorship statistics panel */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Mentorship Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-xs text-gray-500">Total Mentees</p>
            <p className="text-lg font-semibold">{mentorshipStats.totalMentees}</p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-xs text-gray-500">Active</p>
            <p className="text-lg font-semibold">{mentorshipStats.activeMentorships}</p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-xs text-gray-500">Completed</p>
            <p className="text-lg font-semibold">{mentorshipStats.completedMentorships}</p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-xs text-gray-500">Pending</p>
            <p className="text-lg font-semibold">{mentorshipStats.pendingRequests}</p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-xs text-gray-500">Rating</p>
            <p className="text-lg font-semibold">{mentorshipStats.averageRating}/5</p>
          </div>
          <div className="bg-white p-3 rounded shadow-sm">
            <p className="text-xs text-gray-500">Hours</p>
            <p className="text-lg font-semibold">{mentorshipStats.hoursContributed}</p>
          </div>
        </div>
      </div>

      {/* Mentorship sessions */}
      <div className="space-y-4">
        {filteredSessions.length > 0 ? (
          filteredSessions.map(session => (
            <MentorshipSessionCard 
              key={session.id} 
              session={session} 
              isAlumniView={true} 
            />
          ))
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600">
              {activeTab === 'active' 
                ? 'You do not have any active mentorships.' 
                : 'You do not have any pending mentorship requests.'}
            </p>
          </div>
        )}
      </div>

      {/* Mentorship availability settings */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Mentorship Availability</h3>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">You are currently <span className="font-medium text-green-600">available</span> for new mentorship requests.</p>
            <p className="text-xs text-gray-500 mt-1">Last updated: 2 days ago</p>
          </div>
          <div className="flex items-center">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked={true} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              <span className="ml-3 text-sm font-medium text-gray-700">Available</span>
            </label>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 bg-indigo-50 text-indigo-600 text-sm rounded hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Update Expertise
          </button>
          <button className="px-3 py-2 bg-indigo-50 text-indigo-600 text-sm rounded hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Set Schedule
          </button>
          <button className="px-3 py-2 bg-indigo-50 text-indigo-600 text-sm rounded hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            View History
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * Student Mentorship View
 */
const StudentMentorshipView: React.FC<MentorshipViewProps> = ({ activeTab, searchQuery, setActiveTab }) => {
  // Sample mentors data
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Michael Chen',
      avatar: '',
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      yearsOfExperience: 8,
      skills: ['JavaScript', 'React', 'Node.js', 'System Design'],
      expertise: ['Frontend Development', 'Interview Preparation', 'Career Planning'],
      availability: 'Weekends, Weekday evenings',
      rating: 4.9,
      bio: 'Experienced software engineer passionate about helping the next generation of developers...',
      isAvailable: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: '',
      title: 'Product Manager',
      company: 'InnovateTech',
      yearsOfExperience: 6,
      skills: ['Product Strategy', 'UX/UI', 'Agile', 'Market Research'],
      expertise: ['Product Management', 'Career Transitions', 'Leadership'],
      availability: 'Weekday evenings',
      rating: 4.7,
      bio: 'Product manager with experience in both startups and large corporations...',
      isAvailable: true
    },
    {
      id: '3',
      name: 'David Park',
      avatar: '',
      title: 'Data Scientist',
      company: 'AnalyticsPro',
      yearsOfExperience: 5,
      skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
      expertise: ['Data Science', 'AI/ML', 'Interview Preparation'],
      availability: 'Weekends',
      rating: 4.8,
      bio: 'Data scientist with a background in mathematics and computer science...',
      isAvailable: false
    }
  ];

  // Sample active mentorships for student
  const activeMentorships: MentorshipSession[] = [
    {
      id: '1',
      mentorId: '1',
      mentorName: 'Michael Chen',
      mentorAvatar: '',
      studentId: '2', // current user
      studentName: 'Jordan Lee',
      studentAvatar: '',
      status: 'active',
      startDate: new Date(2024, 1, 15),
      nextMeeting: {
        date: new Date(2024, 3, 20, 15, 0),
        topic: 'Mock Interview Practice',
        link: 'https://meet.google.com/sow-jdnn-jxo'
      },
      goals: [
        'Prepare for technical interviews',
        'Review resume',
        'Discuss industry trends'
      ],
      progress: 65
    }
  ];

  // Filter based on tab and search query
  const filteredMentors = mentors.filter(mentor => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        mentor.name.toLowerCase().includes(query) ||
        mentor.title.toLowerCase().includes(query) ||
        mentor.company.toLowerCase().includes(query) ||
        mentor.expertise.some(exp => exp.toLowerCase().includes(query)) ||
        mentor.skills.some(skill => skill.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  // Recommended mentors based on student's interests
  const recommendedMentors = mentors.filter(mentor => 
    mentor.expertise.includes('Interview Preparation') ||
    mentor.skills.includes('React')
  );

  return (
    <div>
      {activeTab === 'active' ? (
        <div>
          {/* <h2 className="text-xl font-semibold text-gray-800 mb-4">My Mentors</h2> */}
          <div className="space-y-4">
            {activeMentorships.length > 0 ? (
              activeMentorships.map(session => (
                <MentorshipSessionCard 
                  key={session.id} 
                  session={session} 
                  isAlumniView={false} 
                />
              ))
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-600">You don't have any active mentorships.</p>
                <button 
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                  onClick={() => setActiveTab && setActiveTab('explore')}
                >
                  Find a Mentor
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recommended for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recommendedMentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">All Mentors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMentors.map(mentor => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Mentorship Session Card Component
 */
const MentorshipSessionCard: React.FC<{ 
  session: MentorshipSession; 
  isAlumniView: boolean;
}> = ({ session: initialSession, isAlumniView }) => {
  const [session, setSession] = useState<MentorshipSession>(initialSession);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [showRescheduleSuccessDialog, setShowRescheduleSuccessDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');
  const [rescheduleReason, setRescheduleReason] = useState('');

  // Update local session state when prop changes
  useEffect(() => {
    setSession(initialSession);
  }, [initialSession]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatMeetingTime = (date: Date): string => {
    return date.toLocaleString([], { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };

  const handleSendMessage = () => {
    // Here you would typically send the message to your backend
    console.log('Sending message:', message);
    setShowContactDialog(false);
    setShowSuccessDialog(true);
    setMessage('');
  };

  const handleReschedule = () => {
    // Validate date and time
    const selectedDateTime = new Date(newDate + 'T' + newTime);
    const currentDateTime = new Date();

    if (selectedDateTime <= currentDateTime) {
      alert('Please select a future date and time for the meeting.');
      return;
    }

    if (!rescheduleReason.trim()) {
      alert('Please provide a reason for rescheduling.');
      return;
    }

    // Update the session's next meeting data
    setSession(prevSession => ({
      ...prevSession,
      nextMeeting: prevSession.nextMeeting ? {
        ...prevSession.nextMeeting,
        date: selectedDateTime
      } : undefined
    }));

    // Here you would typically send the reschedule request to your backend
    console.log('Rescheduling to:', newDate, newTime);
    console.log('Reason:', rescheduleReason);
    
    setShowRescheduleDialog(false);
    setShowRescheduleSuccessDialog(true);
    setNewDate('');
    setNewTime('');
    setRescheduleReason('');
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-300 mr-4"></div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {isAlumniView ? session.studentName : session.mentorName}
              </h3>
              <p className="text-sm text-gray-500">
                Started {formatDate(session.startDate)}
              </p>
            </div>
          </div>
          <div>
            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
              session.status === 'active' ? 'bg-green-100 text-green-800' :
              session.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
              session.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </span>
          </div>
        </div>

        {session.status === 'active' && session.nextMeeting && (
          <div className="mb-4 bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Next Meeting</h4>
            <div className="space-y-2">
              <div className="flex items-center text-blue-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span className="text-base">{formatMeetingTime(session.nextMeeting.date)}</span>
              </div>
              <div className="flex items-center text-blue-600">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
                <span className="text-base">{session.nextMeeting.topic}</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-3">
              <a
                href={session.nextMeeting.link}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                </svg>
                Join Meeting
              </a>
              <button 
                className="flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 text-sm font-medium rounded-md hover:bg-blue-50 transition-colors"
                onClick={() => setShowRescheduleDialog(true)}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Reschedule
              </button>
            </div>
          </div>
        )}

        <h4 className="text-sm font-medium text-gray-700 mb-1">Goals</h4>
        <ul className="mb-4 text-sm text-gray-600 space-y-1">
          {session.goals.map((goal, index) => (
            <li key={index} className="flex items-start">
              <span className="inline-block w-4 h-4 mr-2 mt-0.5">
                <svg className="text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </span>
              {goal}
            </li>
          ))}
        </ul>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{session.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${session.progress}%` }}></div>
          </div>
        </div>

        <div className="flex space-x-2">
          <button 
            className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
            onClick={() => setShowContactDialog(true)}
          >
            {isAlumniView ? 'Send Message' : 'Contact Mentor'}
          </button>
          {session.status === 'pending' && isAlumniView && (
            <div className="flex space-x-2">
              <button className="px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors">
                Accept
              </button>
              <button className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors">
                Decline
              </button>
            </div>
          )}
          {session.status === 'active' && (
            <button className="px-3 py-2 bg-gray-200 text-gray-700 text-sm rounded-md hover:bg-gray-300 transition-colors">
              View Details
            </button>
          )}
        </div>
      </div>

      {/* Contact Dialog */}
      {showContactDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact {isAlumniView ? session.studentName : session.mentorName}
                </h3>
                <p className="text-sm text-gray-500">
                  Send a message to discuss your mentorship
                </p>
              </div>
              <button
                onClick={() => setShowContactDialog(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Your Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowContactDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  message.trim()
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-indigo-400 cursor-not-allowed'
                }`}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Message Sent Successfully!</h3>
                <p className="text-sm text-gray-500">
                  Your message has been sent to {isAlumniView ? session.studentName : session.mentorName}
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md mb-4">
              <h4 className="text-sm font-medium text-green-800 mb-2">What happens next?</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 mr-2 mt-0.5">
                    <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  The recipient will be notified of your message
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 mr-2 mt-0.5">
                    <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  You can continue your conversation in the messages section
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 mr-2 mt-0.5">
                    <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  You'll be notified when they respond
                </li>
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowSuccessDialog(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Dialog */}
      {showRescheduleDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Reschedule Meeting</h3>
                <p className="text-sm text-gray-500">
                  Select a new date and time for your meeting
                </p>
              </div>
              <button
                onClick={() => setShowRescheduleDialog(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="newDate" className="block text-sm font-medium text-gray-700 mb-1">
                  New Date
                </label>
                <input
                  type="date"
                  id="newDate"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label htmlFor="newTime" className="block text-sm font-medium text-gray-700 mb-1">
                  New Time
                </label>
                <input
                  type="time"
                  id="newTime"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  min={newDate === new Date().toISOString().split('T')[0] ? new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) : '00:00'}
                />
              </div>

              <div>
                <label htmlFor="rescheduleReason" className="block text-sm font-medium text-gray-700 mb-1">
                  Reason for Rescheduling
                </label>
                <textarea
                  id="rescheduleReason"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Please provide a reason for rescheduling..."
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowRescheduleDialog(false);
                  setRescheduleReason('');
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                disabled={!newDate || !newTime || !rescheduleReason.trim()}
                className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  newDate && newTime && rescheduleReason.trim()
                    ? 'bg-indigo-600 hover:bg-indigo-700'
                    : 'bg-indigo-400 cursor-not-allowed'
                }`}
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Success Dialog */}
      {showRescheduleSuccessDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Meeting Rescheduled Successfully!</h3>
                <p className="text-sm text-gray-500">
                  Your meeting has been rescheduled to {new Date(new Date(newDate + 'T' + newTime)).toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-md mb-4">
              <h4 className="text-sm font-medium text-green-800 mb-2">What happens next?</h4>
              <ul className="text-sm text-green-700 space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 mr-2 mt-0.5">
                    <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  The other participant will be notified of the new meeting time and reason
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 mr-2 mt-0.5">
                    <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  A new meeting link will be generated
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 mr-2 mt-0.5">
                    <svg className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  You'll receive a confirmation email with the updated details
                </li>
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowRescheduleSuccessDialog(false)}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * Mentor Card Component
 */
const MentorCard: React.FC<{ mentor: Mentor }> = ({ mentor }) => {
  const [showDialog, setShowDialog] = useState(false);

  const handleRequestMentorship = () => {
    setShowDialog(true);
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{mentor.name}</h3>
            <p className="text-sm text-gray-600">{mentor.title} at {mentor.company}</p>
            <div className="flex items-center text-sm mt-1">
              <span className="flex items-center text-yellow-500 mr-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                {mentor.rating}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-500 ml-1">{mentor.yearsOfExperience} years experience</span>
            </div>
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-600 line-clamp-2">
            {mentor.bio}
          </p>
        </div>
        
        <div className="mb-3">
          <h4 className="text-xs font-medium text-gray-500 mb-1">Expertise</h4>
          <div className="flex flex-wrap gap-1">
            {mentor.expertise.map((item, index) => (
              <span key={index} className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                {item}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="text-xs font-medium text-gray-500 mb-1">Skills</h4>
          <div className="flex flex-wrap gap-1">
            {mentor.skills.map((skill, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-gray-500">
            <span className="font-medium">Available:</span> {mentor.availability}
          </span>
          <span className={`inline-block w-3 h-3 rounded-full ${mentor.isAvailable ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </div>
        
        <button 
          className={`w-full py-2 rounded-md text-sm font-medium ${
            mentor.isAvailable 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          } transition-colors`}
          disabled={!mentor.isAvailable}
          onClick={handleRequestMentorship}
        >
          {mentor.isAvailable ? 'Request Mentorship' : 'Currently Unavailable'}
        </button>
      </div>

      {/* Request Mentorship Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Request Sent Successfully!</h3>
                <p className="text-sm text-gray-500">Your mentorship request has been sent to {mentor.name}</p>
              </div>
            </div>
            
            <div className="bg-indigo-50 p-4 rounded-md mb-4">
              <h4 className="text-sm font-medium text-indigo-800 mb-2">What happens next?</h4>
              <ul className="text-sm text-indigo-700 space-y-2">
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 mr-2 mt-0.5">
                    <svg className="text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  Mentor will review your request
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 mr-2 mt-0.5">
                    <svg className="text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  You'll receive a notification when they respond
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-4 h-4 mr-2 mt-0.5">
                    <svg className="text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </span>
                  Once accepted, you can start your mentorship journey
                </li>
              </ul>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowDialog(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorshipPage; 