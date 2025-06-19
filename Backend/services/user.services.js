const User = require("../db/Models/User.models.js");

module.exports.createUser = async ({
  fullName: { firstName, lastName },
  email,
  password,
}) => {
  try {
    console.log(firstName, lastName, email, password);
    if (!firstName || !email || !password) {
      throw new Error("All fields are required");
    }
    const user = new User({
      fullName: { firstName, lastName },
      email,
      password,
    });
    await user.save();
    console.log("User created successfully:");
    return user;
  } catch (error) {
    console.error("User creation error:", error);
    throw new Error("Error creating user");
  }
};
