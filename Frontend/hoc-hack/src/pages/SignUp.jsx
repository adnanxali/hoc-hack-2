import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [profile, setProfile] = useState({
    name: '',    // Single field for name
    bio: '',
    email: '',
    skills: ''
  });
  const navigate= useNavigate();

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    
    const url = 'http://localhost:3000/register';
    const skillsArray = typeof profile.skills === 'string' ? profile.skills.split(',') : [];
    profile.skills=skillsArray;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Send data as JSON
        },
        body: JSON.stringify(profile), // Convert profile data to JSON
      });

      
        const result = await response.json();
        const userId = result.id
        console.log('User registered successfully:', result);
        navigate(`/home/${userId}`); // Redirect to home after successful registration
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-500 to-pink-300">
      <div className="bg-white rounded-lg shadow-xl w-96 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Profile</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-left text-sm font-medium text-gray-600">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Full Name"
              value={profile.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-left text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              value={profile.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="bio" className="block text-left text-sm font-medium text-gray-600">Bio</label>
            <textarea
              id="bio"
              name="bio"
              placeholder="Tell us about yourself..."
              value={profile.bio}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="skills" className="block text-left text-sm font-medium text-gray-600">Skills</label>
            <input
              type="text"
              id="skills"
              name="skills"
              placeholder="Your skills (e.g., JavaScript, React)"
              value={profile.skills}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition duration-300"
            onClick={registerUser}
          >
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
