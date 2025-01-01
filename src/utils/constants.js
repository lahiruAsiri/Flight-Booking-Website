// Travel classes available for booking
export const TRAVEL_CLASSES = {
  ECONOMY: 'ECONOMY',
  PREMIUM_ECONOMY: 'PREMIUM_ECONOMY',
  BUSINESS: 'BUSINESS',
  FIRST: 'FIRST',
};

// Types of trips available
export const TRIP_TYPES = {
  ONE_WAY: 'oneWay',
  ROUND_TRIP: 'roundTrip',
};

// Maximum and minimum number of passengers allowed
export const MAX_PASSENGERS = 9;
export const MIN_PASSENGERS = 1;

// API endpoints for Amadeus services
export const API_ENDPOINTS = {
  FLIGHT_SEARCH: '/v2/shopping/flight-offers', // Endpoint for flight search
  TOKEN: '/v1/security/oauth2/token', // Endpoint for getting access token
};