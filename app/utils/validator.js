/**
 * Validate airport data before inserting/updating
 */

export const validateAirport = (airport, isUpdate = false) => {
  const { code, city, latitude, longitude, kind } = airport;

  // Skip code validation on update
  if (!isUpdate) {
    const codeRegex = /^[A-Z]{3,6}$/;
    if (!code || !codeRegex.test(code)) {
      return 'Code must be 3-6 uppercase letters.';
    }
  }

  // Validate city (1-40 characters)
  if (!city || city.length < 1 || city.length > 40) {
    return 'City name must be between 1-40 characters.';
  }

  // Validate latitude (-90 to 90)
  if (latitude === undefined || latitude < -90 || latitude > 90) {
    return 'Latitude must be between -90 and 90.';
  }

  // Validate longitude (-180 to 180)
  if (longitude === undefined || longitude < -180 || longitude > 180) {
    return 'Longitude must be between -180 and 180.';
  }

  // Validate kind (must be one of 'Passenger', 'Cargo', 'Military', 'Private')
  const validKinds = ['Passenger', 'Cargo', 'Military', 'Private'];
  if (!validKinds.includes(kind)) {
    return "Kind must be 'Passenger', 'Cargo', 'Military', or 'Private'.";
  }

  return null; // No validation errors
};

// export const validateAirport = (airport) => {

//   const { code, city, latitude, longitude, kind } = airport;

//   // Validate code (3-6 uppercase characters)
//   const codeRegex = /^[A-Z]{3,6}$/;
//   if (!code || !codeRegex.test(code)) {
//     return 'Code must be 3-6 uppercase letters.';
//   }

//   // Validate city (1-40 characters)
//   if (!city || city.length < 1 || city.length > 40) {
//     return 'City name must be between 1-40 characters.';
//   }

//   // Validate latitude (-90 to 90)
//   if (latitude === undefined || latitude < -90 || latitude > 90) {
//     return 'Latitude must be between -90 and 90.';
//   }

//   // Validate longitude (-180 to 180)
//   if (longitude === undefined || longitude < -180 || longitude > 180) {
//     return 'Longitude must be between -180 and 180.';
//   }

//   // Validate kind (must be one of 'Passenger', 'Cargo', 'Military', 'Private')
//   const validKinds = ['Passenger', 'Cargo', 'Military', 'Private'];
//   if (!validKinds.includes(kind)) {
//     return "Kind must be 'Passenger', 'Cargo', 'Military', or 'Private'.";
//   }

//   return null; // No validation errors
// };
