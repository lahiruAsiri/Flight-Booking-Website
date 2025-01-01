import React, { useState } from 'react';
import { Container, Box, Typography, Grid, Paper, Avatar, IconButton } from '@mui/material';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AirplaneIcon from '@mui/icons-material/AirplanemodeActive';
import { pink } from '@mui/material/colors';
import video from '../../assets/video.mp4'; // Import the video

const darkPink = pink[600]; // Use a darker shade of pink

const HowItWorks = () => {
  const [isPlaying, setIsPlaying] = useState(false); // State to manage video play status

  // Steps for the "How It Works" section
  const steps = [
    { id: 1, title: 'Search Flights', description: 'Enter your travel details to find the best flights' },
    { id: 2, title: 'Fill Contact Form', description: 'Provide your contact information for booking' },
    { id: 3, title: 'Choose Your Airline', description: 'Select from available airlines and fares' },
    { id: 4, title: 'Booking in 10 Minutes!', description: 'Complete your booking quickly and securely', icon: <FlightTakeoffIcon /> },
  ];

  // Function to handle play button click
  const handlePlayButtonClick = () => {
    setIsPlaying(true);
    document.getElementById('how-it-works-video').play();
  };

  return (
    <Container sx={{ py: 8 }}>
      {/* Title */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 'bold', color: darkPink, fontFamily: 'Forgotten Futurist Semi Bold, sans-serif' }}>
        How it Works
      </Typography>
      {/* Description */}
      <Typography variant="body1" color="textSecondary" paragraph sx={{ fontSize: '1.2rem', lineHeight: '1.6', fontFamily: 'Forgotten Futurist Semi Bold, sans-serif' }}>
        These are the simple procedures that will make your purchasing process super easy
        and smooth. And will help you to get your flight easily.
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative', pl: 2 }}>
            {/* Dotted line */}
            <Box
              sx={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '2px',
                borderLeft: '3px dotted',
                borderColor: darkPink,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                left: '-57px',
                bottom: '-80px',
                borderRadius: '20%',
                p: 1,
                transform: 'rotate(180deg)', // Rotate the icon 180 degrees
              }}
            >
              <AirplaneIcon sx={{ color: darkPink, fontSize: '100px' }} />
            </Box>
            {/* Steps */}
            <Box sx={{ ml: '30px' }}> {/* Adjust the margin-left to position the steps after the image */}
              {steps.map((step) => (
                <Box key={step.id} sx={{ position: 'relative', mb: 4, pl: 4 }}>
                  <Avatar sx={{ bgcolor: darkPink, position: 'absolute', left: '-20px', top: '0' }}>
                    {step.icon ? step.icon : <Typography variant="body2" color="white">{step.id}</Typography>}
                  </Avatar>
                  <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', color: 'textPrimary', fontFamily: 'Forgotten Futurist Semi Bold, sans-serif' }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ fontSize: '1rem', lineHeight: '1.5', fontFamily: 'Forgotten Futurist Semi Bold, sans-serif' }}>
                    {step.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, borderRadius: '20px', position: 'relative' }}>
            {/* Video */}
            <video id="how-it-works-video" width="100%" controls={!isPlaying} style={{ borderRadius: '20px' }}>
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Play button */}
            {!isPlaying && (
              <IconButton
                onClick={handlePlayButtonClick}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontSize: '64px',
                }}
              >
                <PlayCircleOutlineIcon fontSize="inherit" />
              </IconButton>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HowItWorks;