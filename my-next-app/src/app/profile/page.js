'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Import Image component from Next.js

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false); // State to toggle edit mode
  const [formData, setFormData] = useState({
    custom_username: '',
    bio: '',
    user_id: '',
  });

  const searchParams = useSearchParams();
  const accessToken = searchParams.get('access_token'); // Extract access_token from URL
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    if (accessToken) {
      // Set the access_token in localStorage
      localStorage.setItem('access_token', accessToken);

      // Fetch user data
      fetch(`http://localhost:8000/api/api/userDetails/`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Send access_token in Authorization header
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          return response.json();
        })
        .then((data) => {
          setUserData(data);

          // Initialize form data with fetched values
          setFormData({
            custom_username: data.profile.custom_username || '',
            bio: data.profile.bio || '',
            user_id: data.user.id, // Set user_id in formData
          });

          // Save user ID in localStorage
          localStorage.setItem('user_id', data.user.id);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [accessToken]);

  const handleNextClick = () => {
    // Redirect to home page
    router.push('/');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    // Update backend with new values
    fetch('http://localhost:8000/api/api/updateProfile/', {
      method: 'PUT', // or PATCH
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData), // Send updated formData, including user_id
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update profile');
        }
        return response.json();
      })
      .then((updatedData) => {
        setUserData({ ...userData, profile: updatedData });
        setEditing(false); // Exit edit mode
      })
      .catch((error) => console.error('Error updating profile:', error));
  };

  const handleLogout = () => {
    // Clear access_token and user_id from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    
    // Redirect to login page or home page
    router.push('/login'); // Change this route as needed
  };

  if (!userData) {
    return <div className="text-center text-xl font-semibold text-gray-500">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <h1 className="text-3xl font-semibold text-center text-blue-600">User Profile</h1>

      <div className="space-y-2">
        <h2 className="text-2xl font-medium text-gray-800">
          Username: <span className="text-blue-500">{userData.user.username}</span>
        </h2>
        <p className="text-lg text-gray-600">Email: <span className="text-gray-800">{userData.user.email}</span></p>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-gray-700">Profile Information</h3>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 font-medium">Custom Username</label>
              <input
                type="text"
                name="custom_username"
                value={formData.custom_username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block text-gray-600 font-medium">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
          </div>
        ) : (
          <div>
            <p className="text-lg text-gray-600">
              Custom Username: <span className="text-gray-800">{userData.profile.custom_username}</span>
            </p>
            <p className="text-lg text-gray-600">
              Bio: <span className="text-gray-800">{userData.profile.bio || 'No bio available'}</span>
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        {/* Profile image remains static and is not editable */}
        <Image
          src={userData.profile.picture}
          alt="Profile"
          width={150}
          height={150}
          className="rounded-full border-4 border-blue-300 shadow-lg"
        />
      </div>

      <div className="flex justify-center space-x-4">
        {editing ? (
          <>
            <button
              onClick={handleSaveChanges}
              className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
            >
              Save Changes
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-6 py-3 bg-gray-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-gray-600 transition duration-300"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
          >
            Edit Profile
          </button>
        )}
        <button
          onClick={handleNextClick}
          className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Next
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
