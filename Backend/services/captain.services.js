const Captain = require('../db/Models/captain.model');

module.exports.createCaptain = async ({
    fullName: { firstName, lastName },
    email,
    password,
    vehicle: { color, plate, capacity, vehicleType }
  }) => {
  try {
    if (!firstName || !email || !password || !color || !plate || !capacity || !vehicleType) {
      throw new Error('All fields are required');
    }
    
    const captain = new Captain({
      fullName: { firstName, lastName },
      email,
      password,
      vehicle: { color, plate, capacity, vehicleType }
    });
    
    await captain.save();
    console.log('Captain created successfully:');
    return captain;
  } catch (error) {
    console.error('Captain creation error:', error);
    throw new Error('Error creating captain');
  }
}