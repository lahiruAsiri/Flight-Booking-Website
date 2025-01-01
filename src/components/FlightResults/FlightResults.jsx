import React from 'react';

// Format time helper function
const formatTime = (timeString) => {
  return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Format duration helper function
const formatDuration = (duration) => {
  const match = duration.match(/PT(\d+H)?(\d+M)?/);
  const hours = match[1] ? match[1].replace('H', '') : '0';
  const minutes = match[2] ? match[2].replace('M', '') : '0';
  return `${hours}h ${minutes}m`;
};

const FlightResults = ({ results }) => {
  const firstSegment = flight.itineraries[0].segments[0];
  const lastSegment = flight.itineraries[0].segments[flight.itineraries[0].segments.length - 1];

  return (
    <div key={flight.id} className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <p className="text-lg font-semibold">{formatTime(firstSegment.departure.at.split('T')[1])}</p>
            <p className="text-sm text-gray-500">{firstSegment.departure.iataCode}</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-sm text-gray-500">
              {formatDuration(flight.itineraries[0].duration)}
            </div>
            <div className="w-32 h-px bg-gray-300 my-2"></div>
            <div className="text-xs text-gray-500">
              {flight.itineraries[0].segments.length > 1 
                ? `${flight.itineraries[0].segments.length - 1} stop(s)`
                : 'Direct'}
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">{formatTime(lastSegment.arrival.at.split('T')[1])}</p>
            <p className="text-sm text-gray-500">{lastSegment.arrival.iataCode}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-purple-600">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: flight.price.currency
            }).format(flight.price.total)}
          </p>
          <p className="text-sm text-gray-500">per person</p>
        </div>
      </div>
      
      <div className="space-y-2">
        {flight.itineraries[0].segments.map((segment, idx) => (
          <div key={idx} className="flex items-center text-sm text-gray-600 border-t pt-2">
            <div className="w-1/4">
              <p className="font-semibold">{segment.carrierCode} {segment.number}</p>
              <p className="text-xs">{searchParams.travelClass}</p>
            </div>
            <div className="w-3/4 flex justify-between">
              <div>
                <p>{segment.departure.iataCode} → {segment.arrival.iataCode}</p>
                <p className="text-xs">{formatDate(segment.departure.at.split('T')[0])}</p>
              </div>
              <div className="text-right">
                <p>{formatTime(segment.departure.at.split('T')[1])} - {formatTime(segment.arrival.at.split('T')[1])}</p>
                <p className="text-xs">{formatDuration(segment.duration)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition-colors">
          Select Flight
        </button>
      </div>
    </div>
  );
};

export default FlightResults;
