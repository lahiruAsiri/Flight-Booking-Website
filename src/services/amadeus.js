const AMADEUS_API_KEY = 'Your api key'; // Amadeus API Key
const AMADEUS_API_SECRET = 'your api secret key'; // Amadeus API Secret
const BASE_URL = 'https://test.api.amadeus.com'; // Base URL for Amadeus API

// Function to get access token from Amadeus API
export const getAccessToken = async () => {
  try {
    const response = await fetch(`${BASE_URL}/v1/security/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,
    });
    const data = await response.json();
    return data.access_token; // Return the access token
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error; // Throw error if access token retrieval fails
  }
};

// Function to search for flights using Amadeus API
export const searchFlights = async (params) => {
  const accessToken = await getAccessToken(); // Get access token
  const queryParams = new URLSearchParams({
    originLocationCode: params.origin,
    destinationLocationCode: params.destination,
    departureDate: params.departureDate,
    adults: params.adults,
    travelClass: params.travelClass,
    nonStop: params.nonStop,
    max: 250,
    ...(params.returnDate && { returnDate: params.returnDate }), // Include return date if provided
  }).toString();

  try {
    const response = await fetch(
      `${BASE_URL}/v2/shopping/flight-offers?${queryParams}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include access token in headers
        },
      }
    );
    return await response.json(); // Return the flight search results
  } catch (error) {
    console.error('Error searching flights:', error);
    throw error; // Throw error if flight search fails
  }
};