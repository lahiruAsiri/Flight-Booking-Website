import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { searchFlights } from '../../services/amadeus';
import { validateIATACode, formatErrorMessage } from '../../utils/helpers';
import {
  Container,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Modal,
  CircularProgress,
  Alert,
} from '@mui/material';
import { pink } from '@mui/material/colors';
import './FlightSearch.css';

const darkPink = pink[600];

const FlightSearch = () => {
  const [searchParams, setSearchParams] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    returnDate: '',
    adults: 1,
    travelClass: 'ECONOMY',
    nonStop: false,
  });
  const [tripType, setTripType] = useState('oneWay');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to validate the form inputs
  const validateForm = () => {
    const newErrors = {};

    if (!searchParams.origin) {
      newErrors.origin = 'Origin is required';
    } else if (!validateIATACode(searchParams.origin.toUpperCase())) {
      newErrors.origin = 'Please enter a valid 3-letter airport code (e.g., JFK)';
    }

    if (!searchParams.destination) {
      newErrors.destination = 'Destination is required';
    } else if (!validateIATACode(searchParams.destination.toUpperCase())) {
      newErrors.destination = 'Please enter a valid 3-letter airport code (e.g., LAX)';
    }

    if (!searchParams.departureDate) {
      newErrors.departureDate = 'Departure date is required';
    }

    if (tripType === 'roundTrip' && !searchParams.returnDate) {
      newErrors.returnDate = 'Return date is required';
    }

    if (searchParams.departureDate && searchParams.returnDate) {
      const dep = new Date(searchParams.departureDate);
      const ret = new Date(searchParams.returnDate);
      if (ret < dep) {
        newErrors.returnDate = 'Return date must be after departure date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to format date strings
  const formatDate = (dateString) => {
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to format time strings
  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Function to format duration strings
  const formatDuration = (duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match[1] ? match[1].replace('H', '') : '0';
    const minutes = match[2] ? match[2].replace('M', '') : '0';
    return `${hours}h ${minutes}m`;
  };

  // Function to handle the search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    setApiError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const params = {
        ...searchParams,
        origin: searchParams.origin.toUpperCase(),
        destination: searchParams.destination.toUpperCase(),
      };
      
      const flightResults = await searchFlights(params);
      if (flightResults.errors) {
        setApiError(formatErrorMessage(flightResults));
      } else {
        setResults(flightResults);
        setIsModalOpen(true);
      }
    } catch (error) {
      setApiError(formatErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  // Function to handle input changes
  const handleInputChange = (field, value) => {
    setSearchParams(prev => ({
      ...prev,
      [field]: value
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  // Function to render each flight card
  const renderFlightCard = (flight) => {
    const firstSegment = flight.itineraries[0].segments[0];
    const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];

    return (
      <Box key={flight.id} sx={{ backgroundColor: 'white', borderRadius: 2, boxShadow: 3, p: 3, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'center', mr: 2 }}>
              <Typography variant="h6">{formatTime(firstSegment.departure.at.split('T')[1])}</Typography>
              <Typography variant="body2" color="textSecondary">{firstSegment.departure.iataCode}</Typography>
            </Box>
            <Box sx={{ textAlign: 'center', mx: 2 }}>
              <Typography variant="body2" color="textSecondary">{formatDuration(flight.itineraries[0].duration)}</Typography>
              <Box sx={{ width: 100, height: 1, backgroundColor: 'gray', my: 1 }}></Box>
              <Typography variant="body2" color="textSecondary">
                {flight.itineraries[0].segments.length > 1 
                  ? `${flight.itineraries[0].segments.length - 1} stop(s)`
                  : 'Direct'}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'center', ml: 2 }}>
              <Typography variant="h6">{formatTime(lastSegment.arrival.at.split('T')[1])}</Typography>
              <Typography variant="body2" color="textSecondary">{lastSegment.arrival.iataCode}</Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h5" sx={{ color: darkPink }}>
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: flight.price.currency
              }).format(flight.price.total)}
            </Typography>
            <Typography variant="body2" color="textSecondary">per person</Typography>
          </Box>
        </Box>
        
        <Box>
          {flight.itineraries[0].segments.map((segment, idx) => (
            <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', borderTop: 1, pt: 1, mt: 1 }}>
              <Box>
                <Typography variant="body2" fontWeight="bold">{segment.carrierCode} {segment.number}</Typography>
                <Typography variant="body2" color="textSecondary">{searchParams.travelClass}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2">{segment.departure.iataCode} → {segment.arrival.iataCode}</Typography>
                <Typography variant="body2" color="textSecondary">{formatDate(segment.departure.at.split('T')[0])}</Typography>
                <Typography variant="body2">{formatTime(segment.departure.at.split('T')[1])} - {formatTime(segment.arrival.at.split('T')[1])}</Typography>
                <Typography variant="body2" color="textSecondary">{formatDuration(segment.duration)}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
    
        <Box sx={{ textAlign: 'right', mt: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: darkPink, color: 'white', '&:hover': { backgroundColor: darkPink } }}>Select Flight</Button>
        </Box>
      </Box>
    );
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3, backgroundColor: 'white', borderRadius: 6, boxShadow: 6 }}>
      {apiError && (
        <Alert severity="error" sx={{ mb: 4 }}>{apiError}</Alert>
      )}
  
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <Button
          variant={tripType === 'oneWay' ? 'contained' : 'outlined'}
          sx={{
            backgroundColor: tripType === 'oneWay' ? darkPink : 'transparent',
            borderColor: darkPink,
            borderRadius: '15px',
            color: tripType === 'oneWay' ? 'white' : darkPink,
            '&:hover': {
              backgroundColor: tripType === 'oneWay' ? darkPink : 'rgba(216, 27, 96, 0.1)',
              borderColor: darkPink,
            },
          }}
          onClick={() => setTripType('oneWay')}
        >
          One Way
        </Button>
        <Button
          variant={tripType === 'roundTrip' ? 'contained' : 'outlined'}
          sx={{
            backgroundColor: tripType === 'roundTrip' ? darkPink : 'transparent',
            borderColor: darkPink,
            borderRadius: '15px',
            color: tripType === 'roundTrip' ? 'white' : darkPink,
            '&:hover': {
              backgroundColor: tripType === 'roundTrip' ? darkPink : 'rgba(216, 27, 96, 0.1)',
              borderColor: darkPink,
            },
          }}
          onClick={() => setTripType('roundTrip')}
        >
          Round Trip
        </Button>
      </Box>
  
      <form onSubmit={handleSearch}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <TextField
            label="From"
            placeholder="e.g., JFK"
            inputProps={{ maxLength: 3 }}
            error={!!errors.origin}
            helperText={errors.origin}
            value={searchParams.origin}
            onChange={(e) => handleInputChange('origin', e.target.value.toUpperCase())}
            fullWidth
          />
          <TextField
            label="To"
            placeholder="e.g., LAX"
            inputProps={{ maxLength: 3 }}
            error={!!errors.destination}
            helperText={errors.destination}
            value={searchParams.destination}
            onChange={(e) => handleInputChange('destination', e.target.value.toUpperCase())}
            fullWidth
          />
          <TextField
            label="Departure Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            error={!!errors.departureDate}
            helperText={errors.departureDate}
            value={searchParams.departureDate}
            onChange={(e) => handleInputChange('departureDate', e.target.value)}
            fullWidth
          />
          <TextField
            label="Passengers"
            type="number"
            inputProps={{ min: 1, max: 9 }}
            value={searchParams.adults}
            onChange={(e) => handleInputChange('adults', parseInt(e.target.value))}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel>Class</InputLabel>
            <Select
              value={searchParams.travelClass}
              onChange={(e) => handleInputChange('travelClass', e.target.value)}
            >
              <MenuItem value="ECONOMY">Economy</MenuItem>
              <MenuItem value="PREMIUM_ECONOMY">Premium Economy</MenuItem>
              <MenuItem value="BUSINESS">Business</MenuItem>
              <MenuItem value="FIRST">First</MenuItem>
            </Select>
          </FormControl>
        </Box>
  
        {tripType === 'roundTrip' && (
          <TextField
            label="Return Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            error={!!errors.returnDate}
            helperText={errors.returnDate}
            value={searchParams.returnDate}
            onChange={(e) => handleInputChange('returnDate', e.target.value)}
            fullWidth
            sx={{ mb: 4 }}
          />
        )}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}> 
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: darkPink,
            color: 'white',
            width: '300px',
            borderRadius: '15px',
            '&:hover': {
              backgroundColor: darkPink,
            },
          }}
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Search Flight'}
        </Button>
        </Box>
      </form>
  
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Flight Results</Typography>
            <Button onClick={closeModal}>&times;</Button>
          </Box>
          {results && results.data && (
            <Slider {...sliderSettings}>
              {results.data.map(renderFlightCard)}
            </Slider>
          )}
        </Box>
      </Modal>
    </Container>
  );
};

export default FlightSearch;