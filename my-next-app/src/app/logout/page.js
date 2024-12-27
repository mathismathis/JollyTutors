// app/logout/page.js or pages/logout.js

'use client'; // This marks the file as a client-side component

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

const Logout = () => {
  const router = useRouter(); // Initialize router for navigation

  useEffect(() => {
    // Clear the access_token from localStorage
    localStorage.removeItem('access_token');
    
    // Redirect to login or home page after logout
    router.push('/login'); // Redirect to login page (or any other page)
  }, [router]); // Empty dependency array to ensure it runs only once

  return (
    <div className="flex justify-center items-center mt-8">
      <p className="text-lg font-semibold text-gray-500">Logging out...</p>
    </div>
  );
};

export default Logout;
