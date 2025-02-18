window.validateAirportInput = function (code, city, latitude, longitude, kind) {
  // console.log(
  //   `Validating: Code=${code}, City=${city}, Lat=${latitude}, Long=${longitude}, Kind=${kind}`
  // );

  const codeRegex = /^[A-Z]{3,6}$/;
  const cityRegex = /^[A-Za-z\s]{1,40}$/;

  if (!codeRegex.test(code)) {
    alert('Code must be 3-6 uppercase letters.');
    return false;
  }

  if (!cityRegex.test(city)) {
    alert('City must be 1-40 characters and only contain letters/spaces.');
    return false;
  }

  if (isNaN(latitude) || latitude < -90 || latitude > 90) {
    alert('Latitude must be between -90 and 90.');
    return false;
  }

  if (isNaN(longitude) || longitude < -180 || longitude > 180) {
    alert('Longitude must be between -180 and 180.');
    return false;
  }

  const validKinds = ['Passenger', 'Cargo', 'Military', 'Private'];
  if (!validKinds.includes(kind)) {
    alert("Kind must be 'Passenger', 'Cargo', 'Military', or 'Private'");
    return false;
  }

  console.log('Validation passed!');
  return true; // Validation passed
};
