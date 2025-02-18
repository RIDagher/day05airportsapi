$(document).ready(() => {
  // Fetch all airports when the button is clicked
  $('#fetchAirports').click((e) => {
    e.preventDefault();
    fetchAirports();
  });

  // Fetch all airports
  fetchAirports = function () {
    console.log('Fetching airports...');
    $.ajax({
      url: 'http://localhost:3001/api/airports',
      method: 'GET',
      success: function (data) {
        console.log('Fetched data:', data);
        $('#airportsTable').empty();
        data.forEach((airport) => {
          $('#airportsTable').append(`
            <tr>
                <td>${airport.code}</td>
                <td>${airport.city}</td>
                <td>${airport.latitude}</td>
                <td>${airport.longitude}</td>
                <td>${airport.kind}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteAirport('${airport.code}')">Delete</button>
                    <button class="btn btn-primary btn-sm" onclick="updateAirport('${airport.code}')">Update</button>
                </td>
            </tr>
          `);
        });
      },
      error: function (err) {
        console.error(' Error fetching airports:', err);
        alert('Failed to fetch airports.');
      },
    });
  };

  // Add a new airport
  $('#airportForm').submit((e) => {
    e.preventDefault();

    const code = $('#code').val().toUpperCase();
    const city = $('#city').val();
    const latitude = parseFloat($('#latitude').val());
    const longitude = parseFloat($('#longitude').val());
    const kind = $('#kind').val();

    // Validate input before sending request
    if (!window.validateAirportInput(code, city, latitude, longitude, kind))
      return;

    $.ajax({
      url: 'http://localhost:3001/api/airports',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ code, city, latitude, longitude, kind }),
      success: function () {
        alert(' Airport added successfully!');
        fetchAirports();
      },
      error: function (err) {
        console.error(' Error adding airport:', err);
        alert('Failed to add airport.');
      },
    });
  });
});

// Function to update an airport
window.updateAirport = function (code) {
  $.ajax({
    url: `http://localhost:3001/api/airports/${code}`,
    method: 'GET',
    success: function (airport) {
      // Fill the modal form with current airport data
      $('#editCode').val(airport.code);
      $('#editCity').val(airport.city);
      $('#editLatitude').val(airport.latitude);
      $('#editLongitude').val(airport.longitude);
      $('#editKind').val(airport.kind);

      // Show Bootstrap modal
      let updateModal = new bootstrap.Modal(
        document.getElementById('updateModal')
      );
      updateModal.show();
    },
    error: function (err) {
      console.error(' Error fetching airport details:', err);
      alert('Failed to fetch airport details.');
    },
  });
};

// Handle update form submission
$('#updateForm').submit((e) => {
  e.preventDefault();

  const code = $('#editCode').val(); // Hidden field for airport code
  const updatedAirport = {
    city: $('#editCity').val(),
    latitude: parseFloat($('#editLatitude').val()),
    longitude: parseFloat($('#editLongitude').val()),
    kind: $('#editKind').val(),
  };

  $.ajax({
    url: `http://localhost:3001/api/airports/${code}`,
    method: 'PUT',
    contentType: 'application/json',
    data: JSON.stringify(updatedAirport),
    success: function () {
      alert(` Airport ${code} updated successfully!`);

      // Hide modal safely
      let updateModal = bootstrap.Modal.getInstance(
        document.getElementById('updateModal')
      );
      updateModal.hide();
      fetchAirports(); // Refresh table
    },
    error: function (err) {
      console.error(' Error updating airport:', err);
      alert(err.responseJSON?.message || 'Failed to update airport.');
    },
  });
});

// Function to delete an airport
window.deleteAirport = function (code) {
  $.ajax({
    url: `http://localhost:3001/api/airports/${code}`,
    method: 'DELETE',
    success: function () {
      alert(` Airport ${code} deleted successfully!`);
      fetchAirports();
    },
    error: function (err) {
      console.error(' Error deleting airport:', err);
      alert('Failed to delete airport.');
    },
  });
};
