// Function to validate IATA airport code
export const validateIATACode = (code) => {
  return /^[A-Z]{3}$/.test(code); // Check if the code is exactly 3 uppercase letters
};

// Function to format error messages from API responses
export const formatErrorMessage = (error) => {
  if (error.errors && error.errors.length > 0) {
    return error.errors.map(err => err.detail).join(', '); // Join all error details into a single string
  }
  return 'An error occurred while searching for flights'; // Default error message
};