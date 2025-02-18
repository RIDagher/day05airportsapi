let map;

function initMap() {
  // Create a map centered at a default location
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 45.5, lng: -73.5 }, // Default to Montreal
    zoom: 5,
  });

  // Fetch airports and add markers
  fetchAirports();
}

function fetchAirports() {
  $.ajax({
    url: 'http://localhost:3001/api/airports',
    method: 'GET',
    success: function (data) {
      console.log('Fetched airports:', data);
      data.forEach((airport) => {
        addMarker(airport);
      });
    },
    error: function (err) {
      console.error('Error fetching airports:', err);
      alert('Failed to load airports.');
    },
  });
}

function addMarker(airport) {
  const marker = new google.maps.Marker({
    position: {
      lat: parseFloat(airport.latitude),
      lng: parseFloat(airport.longitude),
    },
    map: map,
    title: `${airport.city} (${airport.code}) - ${airport.kind}`,
  });

  // Add an info window
  const infoWindow = new google.maps.InfoWindow({
    content: `<h3>${airport.city} (${airport.code})</h3><p>Type: ${airport.kind}</p>`,
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}
