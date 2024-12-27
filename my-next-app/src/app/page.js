'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Check if user_id exists in localStorage and retrieve access_token
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('access_token');
    setIsLoggedIn(!!userId); // Set logged-in status
    setAccessToken(token || ''); // Save access token
  }, []);

  const handleButtonClick = () => {
    if (isLoggedIn) {
      // Redirect to the profile page with access_token in the URL
      router.push(`/profile?access_token=${accessToken}`);
    } else {
      // Redirect to the login page
      router.push('/login');
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1 className="text-4xl font-bold text-center">Welcome to the Home Page!</h1>

      <button
        onClick={handleButtonClick}
        className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
      >
        {isLoggedIn ? 'Profile' : 'Login'}
      </button>
    </div>
  );
}
