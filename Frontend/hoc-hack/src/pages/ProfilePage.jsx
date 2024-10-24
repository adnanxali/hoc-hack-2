import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import axios from 'axios';


const staticProfiles = [
  { 
    id: '1', 
    name: 'Alice', 
    image: { uri: 'https://avatars.githubusercontent.com/u/95208?v=4' },
    skills: ['React', 'JavaScript', 'CSS'],
    github: 'https://github.com/alice',
    linkedin: 'https://linkedin.com/in/alice',
    location: 'New York, USA',
    experience: '3 years',
    education: 'B.Tech in Computer Science',
  },
  { 
    id: '2', 
    name: 'Bob', 
    image: { uri: 'https://via.placeholder.com/300x400.png?text=Bob' }, 
    skills: ['Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/bob',
    linkedin: 'https://linkedin.com/in/bob',
    location: 'Los Angeles, USA',
    experience: '5 years',
    education: 'M.Sc. in Software Engineering',
  },
  { 
    id: '3', 
    name: 'Charlie', 
    image: { uri: 'https://via.placeholder.com/300x400.png?text=Charlie' }, 
    skills: ['Python', 'Django', 'SQL'],
    github: 'https://github.com/charlie',
    linkedin: 'https://linkedin.com/in/charlie',
    location: 'San Francisco, USA',
    experience: '2 years',
    education: 'B.Sc. in Information Technology',
  },
];

// Navbar component
export function Navbar() {
  return (
    <nav className="navbar bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between">
        <Link className="flex-grow text-center hover:text-blue-600" to="/">Home</Link>
        <Link className="flex-grow text-center hover:text-blue-600" to="/ProblemSet">Explore</Link>
        <Link className="flex-grow text-center hover:text-blue-600" to="/find">Find</Link>
        <Link className="flex-grow text-center hover:text-blue-600" to="/connect">Connect</Link>
        <Link className="flex-grow text-center hover:text-blue-600" to="/logout">Logout</Link>
      </div>
    </nav>
  );
};

// ProfilePage component with profile fetching
export default function ProfilePage (){
  const [profiles, setProfiles] = useState(staticProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [preference, setPreference] = useState(''); // Preference state to store user input

  // Fetch profiles with preference
  const fetchProfiles = async (pref) => {
    try {
      const response = await axios.post('http://localhost:3000/findmatch', { pref: pref });
      const fetchedProfiles = response.data;
      setProfiles([...fetchedProfiles]);
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  const handleSwipe = (direction) => {
    setCurrentIndex((prevIndex) => {
      if (direction === 'left') return (prevIndex + 1) % profiles.length;
      if (direction === 'right') return prevIndex === 0 ? profiles.length - 1 : prevIndex - 1;
      return prevIndex;
    });
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 100) handleSwipe('right');
    else if (info.offset.x < -100) handleSwipe('left');
    setDragging(false);
  };

  // Fetch profiles when preference button is clicked
  const handlePreferenceSubmit = () => {
    fetchProfiles(preference);
  };

  return (
    <div className="container mx-auto p-8">
      {/* Input for user preference */}
      <div className="mb-4">
        <input
          type="text"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          placeholder="Enter your preference (e.g., JavaScript, Python)"
          className="border p-2 mr-2"
        />
        {/* Button to submit preference */}
        <button
          onClick={handlePreferenceSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Find Matches
        </button>
      </div>

      <AnimatePresence>
        {profiles.slice(currentIndex, currentIndex + 1).map((profile) => (
          <motion.div
            key={profile.id}
            className={`card ${dragging ? 'dragging' : ''} bg-white shadow-lg rounded-md p-6 relative`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragStart={() => setDragging(true)}
            onDragEnd={handleDragEnd}
          >
            <div className="profile-container flex">
              <img src={profile.img} alt={profile.name} className="rounded-full w-32 h-32 mr-4" />
              <div className="details text-left">
                <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
                <p><strong>Skills:</strong> {profile.skills.join(', ')}</p>
                <p><strong>Location:</strong> {profile.location}</p>
                <p><strong>Experience:</strong> {profile.experience}</p>
                <p><strong>Education:</strong> {profile.education}</p>
                <div className="flex space-x-4 mt-4">
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    <FaGithub size={30} />
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    <FaLinkedin size={30} />
                  </a>
                </div>
              </div>
            </div>
            <motion.div className="like text-green-500 text-2xl absolute top-4 right-4" style={{ opacity: dragging ? 1 : 0 }}>
              LIKE
            </motion.div>
            <motion.div className="nope text-red-500 text-2xl absolute top-4 left-4" style={{ opacity: dragging ? 1 : 0 }}>
              NOPE
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
      <Link to="/" className="text-blue-500 underline mt-4 block">Go to Home Page</Link>
    </div>
  );
};

