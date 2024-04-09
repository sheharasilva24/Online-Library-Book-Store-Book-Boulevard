import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './styles/Profile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';

const FormPage = () => {
  // State definitions
  const [isUsernameOpen, setIsUsernameOpen] = useState(false);
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [changesSaved, setChangesSaved] = useState(false);
  const [currentEmail, setCurrentEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailChangesSaved, setEmailChangesSaved] = useState(false);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('Fetching subscription status...'); // New state for subscription status

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndSubscription = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` },
          };
          const profileResponse = await axios.get(`${process.env.REACT_APP_API_PATH}/users/profile`, config);
          const userId = profileResponse.data._id;
          setUsername(profileResponse.data.firstname);
          setCurrentEmail(profileResponse.data.email);
          setProfileImageUrl(profileResponse.data.profileImageUrl);

          // Fetch subscription status using userId
          const subscriptionResponse = await axios.get(`${process.env.REACT_APP_API_PATH}/checkout/subscriptionStatus/${userId}`, config);
          setSubscriptionStatus(subscriptionResponse.data.status); // Assuming the response contains a status field
        } catch (error) {
          console.error("Error fetching data:", error);
          setSubscriptionStatus('Failed to fetch subscription status');
        }
      }
    };

    fetchProfileAndSubscription();
  }, []);

  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out of your account.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('jwtToken');
        navigate('/login');
      }
    });
  };

  const handleUpdateUserDetails = async () => {
    const updateData = {};

    if (newEmail) updateData.email = newEmail;
    if (firstname) updateData.firstname = firstname;
    if (lastname) updateData.lastname = lastname;
    if (newPassword) updateData.password = newPassword;

    try {
      const token = localStorage.getItem('jwtToken');
      if (!token) throw new Error('No authentication token found');

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const profileResponse = await axios.get(`${process.env.REACT_APP_API_PATH}/users/profile`, config);
      const userId = profileResponse.data._id;

      const response = await axios.put(`${process.env.REACT_APP_API_PATH}/users/adminUpdateUser/${userId}`, updateData, config);

      setChangesSaved(true);

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'User updated successfully.',
        confirmButtonText: 'OK'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! ' + error,
        confirmButtonText: 'OK'
      });
    }
  };

  const toggleUsernameDropdown = () => setIsUsernameOpen(!isUsernameOpen);
  const toggleEmailDropdown = () => setIsEmailOpen(!isEmailOpen);
  const togglePasswordDropdown = () => setIsPasswordOpen(!isPasswordOpen);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordError('');
    setChangesSaved(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError('');
    setChangesSaved(false);
  };



  return (
      <div className="profile-container">
        <Navbar />
        <div className="profile-center-content">
          <h1>Account Management</h1>
          <img src={profileImageUrl} alt="Profile" className="profile-profile-picture"/> {/* Display profile image */}
          <h2>{username}</h2>
          <h3>Subscription status: {subscriptionStatus}</h3> {/* Display subscription status here */}
          <div className="profile-dropdown-container">
            <div className="profile-dropdown">
              <button className='profile-dropdown-btn' onClick={toggleUsernameDropdown}>
                <span>Username</span> <FontAwesomeIcon icon={isUsernameOpen ? faAngleUp : faAngleDown}/>
              </button>
              {isUsernameOpen && (
                  <div className="profile-dropdown-content">
                    <div className="profile-input-group">
                      <label>Current Username:</label>
                      {/* ReadOnly input for displaying current username. Removed onChange as it's not needed. */}
                      <input className='current-name-ro' type="text" readOnly placeholder="Current Username"
                             value={username}/>

                      <label>First Name:</label>
                      {/* Input for updating the first name */}
                      <input type="text" value={firstname} placeholder="First Name"
                             onChange={(e) => setFirstname(e.target.value)}/>

                      <label>Last Name:</label>
                      {/* Input for updating the last name */}
                      <input type="text" value={lastname} placeholder="Last Name"
                             onChange={(e) => setLastname(e.target.value)}/>

                      {/* Conditional rendering of the Save Changes button based on changes to first or last name */}
                      {(firstname !== username || lastname) && (
                          <button className='profile-btn' onClick={handleUpdateUserDetails}>
                            {changesSaved ? 'Changes Saved' : 'Save Changes'}
                          </button>
                      )}
                    </div>
                  </div>
              )}
            </div>
            <div className="profile-dropdown">
              <button className='profile-dropdown-btn' onClick={toggleEmailDropdown}>
                <span>Email</span> <FontAwesomeIcon icon={isEmailOpen ? faAngleUp : faAngleDown}/>
              </button>

              {isEmailOpen && (
                  <div className="profile-dropdown-content">
                    <div className="profile-input-group">
                      <label>Current Email:</label>
                      <input className='current-name-ro' type="text" readOnly placeholder="Current Email"
                             value={currentEmail}/>

                      <label>New Email:</label>
                      <input type="email" value={newEmail} placeholder="New Email"
                             onChange={(e) => setNewEmail(e.target.value)}/>

                      {newEmail && newEmail !== currentEmail && (
                          <button className='profile-btn' onClick={handleUpdateUserDetails}>
                            {changesSaved ? 'Changes Saved' : 'Save Changes'}
                          </button>
                      )}
                    </div>
                  </div>
              )}
            </div>

            <div className="profile-dropdown">
              <button className='profile-dropdown-btn' onClick={togglePasswordDropdown}>
                <span>Password</span> <FontAwesomeIcon icon={isPasswordOpen ? faAngleUp : faAngleDown}/>
              </button>
              {isPasswordOpen && (
                  <div className="profile-dropdown-content">
                    <div className="profile-input-group">
                      <label>New Password:</label>
                      <input type="password" value={newPassword} onChange={handleNewPasswordChange}
                             placeholder="New Password"/>
                      <label>Confirm Password:</label>
                      <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange}
                             placeholder="Confirm Password"/>
                      {passwordError && <div className='errormsg-profile'>{passwordError}</div>}
                      <button className='profile-btn' onClick={handleUpdateUserDetails}>
                        {changesSaved ? 'Changes Saved' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
              )}
            </div>
            <div className="profile-logout-section">
              <button className='profile-btn' onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
  )
      ;
};

export default FormPage;




