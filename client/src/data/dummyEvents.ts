import { Event } from '../services/eventService';

export const dummyEvents: Event[] = [
  {
    _id: '1',
    title: 'Tech Career Workshop with Industry Experts',
    description: 'Join us for an interactive workshop where industry experts will share insights about building a successful tech career. Learn about the latest trends, required skills, and career paths in technology.',
    type: 'workshop',
    startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    location: 'Bangalore Tech Hub, Koramangala',
    locationCoordinates: {
      lat: 12.9352,
      lng: 77.6245
    },
    isOnline: false,
    meetingLink: '',
    organizer: {
      _id: 'org1',
      firstName: 'Priya',
      lastName: 'Sharma'
    },
    attendees: ['user1', 'user2'],
    capacity: 50,
    status: 'upcoming',
    isPublic: true,
    registrationDeadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['career', 'workshop', 'tech', 'networking'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '2',
    title: 'Networking Mixer: Tech Professionals Meetup',
    description: 'A casual networking event for tech professionals to connect, share experiences, and build valuable relationships. Perfect for both students and experienced professionals.',
    type: 'networking',
    startDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days from now
    endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000).toISOString(),
    location: 'Hyderabad Tech Park, HITEC City',
    locationCoordinates: {
      lat: 17.4474,
      lng: 78.3762
    },
    isOnline: false,
    meetingLink: '',
    organizer: {
      _id: 'org2',
      firstName: 'Rahul',
      lastName: 'Verma'
    },
    attendees: ['user3', 'user4', 'user5'],
    capacity: 100,
    status: 'upcoming',
    isPublic: true,
    registrationDeadline: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['networking', 'meetup', 'tech', 'social'],
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '3',
    title: 'Machine Learning Fundamentals Seminar',
    description: 'An in-depth seminar covering the basics of machine learning, including supervised learning, unsupervised learning, and neural networks. Perfect for beginners in AI/ML.',
    type: 'seminar',
    startDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
    location: 'Online',
    isOnline: true,
    meetingLink: 'https://meet.google.com/sow-jdnn-jxo',
    organizer: {
      _id: 'org3',
      firstName: 'Arun',
      lastName: 'Patel'
    },
    attendees: ['user6', 'user7', 'user8', 'user9'],
    capacity: 200,
    status: 'completed',
    isPublic: true,
    registrationDeadline: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['machine-learning', 'ai', 'seminar', 'online'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '4',
    title: 'Web Development Bootcamp',
    description: 'Intensive bootcamp covering modern web development technologies including React, Node.js, and cloud deployment. Hands-on projects included.',
    type: 'workshop',
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    endDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000 + 6 * 60 * 60 * 1000).toISOString(),
    location: 'Mumbai Tech Center, Andheri East',
    locationCoordinates: {
      lat: 19.1136,
      lng: 72.8697
    },
    isOnline: false,
    meetingLink: '',
    organizer: {
      _id: 'org4',
      firstName: 'Neha',
      lastName: 'Gupta'
    },
    attendees: ['user10', 'user11', 'user12', 'user13'],
    capacity: 30,
    status: 'completed',
    isPublic: true,
    registrationDeadline: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['web-development', 'bootcamp', 'react', 'nodejs'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '5',
    title: 'Data Science Career Panel',
    description: 'Join industry experts for a panel discussion on careers in data science. Learn about different roles, required skills, and career growth opportunities.',
    type: 'seminar',
    startDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days from now
    endDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000).toISOString(),
    location: 'Online',
    isOnline: true,
    meetingLink: 'https://meet.google.com/sow-jdnn-jxo',
    organizer: {
      _id: 'org5',
      firstName: 'Suresh',
      lastName: 'Kumar'
    },
    attendees: ['user14', 'user15'],
    capacity: 150,
    status: 'upcoming',
    isPublic: true,
    registrationDeadline: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['data-science', 'career', 'panel', 'online'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    _id: '6',
    title: 'Startup Pitch Competition',
    description: 'Showcase your innovative ideas in this startup pitch competition. Get feedback from industry experts and win exciting prizes.',
    type: 'other',
    startDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    endDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000).toISOString(),
    location: 'Delhi Innovation Hub, Connaught Place',
    locationCoordinates: {
      lat: 28.6328,
      lng: 77.2197
    },
    isOnline: false,
    meetingLink: '',
    organizer: {
      _id: 'org6',
      firstName: 'Amit',
      lastName: 'Singh'
    },
    attendees: ['user16', 'user17', 'user18', 'user19'],
    capacity: 75,
    status: 'completed',
    isPublic: true,
    registrationDeadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    tags: ['startup', 'pitch', 'competition', 'innovation'],
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
]; 