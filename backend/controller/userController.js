import User from "../model/Users.js"
// import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find(); // find all users in the database
        res.status(200).json(users); // send the users as a response
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
}

export const getUserEmail = async (req, res) => {
    const { id } = req.params; // Get the user ID from the URL
    try {
        const user = await User.findById(id); // Find the user by ID
        if (!user) {
            return res.status(404).json({ message: "User not found" }); // Handle case where user doesn't exist
        }
        res.status(200).json(user); // Send the user as a response
    } catch (error) {
        res.status(500).json({ message: "Error fetching user" }); // Handle server errors
    }
}




export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please provide both email and password" });
    }

    try {
        console.log("Email being queried:", email);
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

          // Compare the provided password with the user's password
          if (password !== user.password) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // If login is successful, return the user data
        res.status(200).json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
    }
};

export const addUsers = async (req, res) => {
    const user = req.body;

    if (!user.email || !user.password ) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    const newUser = new User(user);

    try {
        await newUser.save();
        res.status(201).json(newUser); // Send the created user as the response
    } catch (error) {
        res.status(500).json({ message: "Error creating user" });
    }
};

export const updateUsers = async (req, res) => {
    const { id } = req.params; // get the id from the url
    const user = req.body; // get the user from the body

    if(!user.email || !user.password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Error updating user" });
    }
}

export const deleteUsers = async (req, res) => {
    const { id } = req.params; // Get the book ID from the URL

    try {
        const deletedUsers = await User.findByIdAndDelete(id); // Delete the book by ID

        if (!deletedUsers) {
            return res.status(404).json({ message: "Book not found" }); // Handle case where book doesn't exist
        }

        res.status(200).json({ message: "User deleted successfully", deletedUsers });
    } catch (error) {
        res.status(500).json({ message: "Error deleting User" }); // Handle server errors
    }
};