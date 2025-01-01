# Flight Booking Website

A streamlined Flight Search Function for dynamically finding flights by origin, destination, and travel dates. This project is lightweight, responsive, and built to integrate seamlessly into any flight booking application.

## Features

- Search flights by origin, destination, and date.
- Dynamically fetch and display results.
- Responsive design for user-friendly interaction.

## Getting Started

Prerequisites

Ensure you have the following installed:

- Node.js (if applicable)
- A code editor like VS Code.


## Installation

Follow these steps to set up the project locally:

1 Clone the Repository

Open your terminal and run the following command:

```bash
  git clone https://github.com/lahiruAsiri
  Flight-Booking-Website.git  

  cd Flight-Booking-Website  

```
2 Install Dependencies

If the project uses dependencies, install them using:

```bash
  npm install  

```

3 Replace Your API Key and Secret Key

In the amadeus.js file, replace the placeholders with your Amadeus API key and secret key:

```bash
  const Amadeus = require('amadeus');

  const amadeus = new Amadeus({
    clientId: 'YOUR_API_KEY', // Replace with your API  key
    clientSecret: 'YOUR_SECRET_KEY' // Replace with your secret key
});

```

4 Run the Project

Start the local development server:

```bash
  npm start  

```
    
