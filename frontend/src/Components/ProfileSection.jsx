import React from 'react';
import './Css/ProfileSection.css';

const ProfileSection = ({ username, profileImage }) => {
  return (
    <div className="profile-section">
      <img src={profileImage} alt="Profile" className="profile-image" />
      <div className="username">{username}</div>
    </div>
  );
};

export default ProfileSection;
