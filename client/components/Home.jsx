// components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../src/index.css'; // import css

export default function Home() {
  const navigate = useNavigate();

  const handleAboutRedirect = () => {
    navigate('/about');
  };

  return (
    <div className="home-container">
      {/* Welcome Message */}
      <h2>Welcome to Style Threads</h2>
      {/* Mission Statement */}
      <p>
        Look Sharp. Feel Stylish. Style Threads.
      </p>
    </div>
  );
}
