import axios from 'axios';

// Base URL of your Django API
const BASE_URL = 'http://127.0.0.1:8000/api';

// Function to fetch user data
export const fetchUserData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/`);
    console.log("api data ", response)
    return response.data.slice(0, 10); // Return the first 10 rows
  } catch (error) {
    console.error('Error fetching user data:', error);
    return [];
  }
};

// Function to fetch post data
export const fetchPostData = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/`);
    return response.data.slice(0, 10); // Return the first 10 rows
  } catch (error) {
    console.error('Error fetching post data:', error);
    return [];
  }
};
