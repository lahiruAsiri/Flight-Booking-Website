
import React from 'react';
import Header from './components/Header/Header';
import FlightSearch from './components/FlightSearch/FlightSearch';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Gallery from './components/Gallery/Gallery';
import Footer from './components/Footer/Footer';
import backgroundImage from './assets/background.jpg';


const App = () => {
  const [loading, setLoading] = React.useState(false);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4">
        <section
          className="relative py-12 bg-cover bg-center bg-no-repeat w-full mb-20"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            height: '500px', 
            width: '100%', 
            backgroundSize: 'cover', 
          }}
        >
          <div
            className="absolute inset-x-0 top-10 bg-black bg-opacity-0 flex flex-col justify-center"
            style={{ top: '50px' }} 
          >
            <h1 className="text-4xl font-bold mb-4 ml-6 text-white">
              Explore the World Together
              <br /> with Premium Travel
            </h1>
            <p className="text-gray-200 ml-6 mb-2" >Get up to 50% Discount</p>
            <button
              type="submit"
              className="bg-pink-700 text-white py-2 rounded-md hover:bg-pink-900 transition-colors w-40 ml-6 mt-1"
              disabled={loading}
            >
              {loading ? 'Booking...' : 'Book Now'}
            </button>
          </div>

          <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 w-full max-w-screen-lg">
            <FlightSearch />
          </div>
        </section>
        <HowItWorks />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default App;