import React from "react";
import { Button, Flex, Text, Box } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/users";

const Navbar = () => {
  const { user, logoutUser } = useUserStore(); // Access user and logoutUser from the store
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Clear user data from localStorage and store
    navigate("/login"); // Redirect to login page
  };

  const handleAccount = () => {
    navigate("/account"); // Redirect to account page
  }

  return (
    <Flex bg="yellow.300" justifyContent="space-between" flexDirection="row" padding="1rem">
      <Flex alignItems="center" gap="1rem">
        <img
          src="/uco.png"
          alt="UCO Logo"
          style={{
            height: "40px", // Adjust height to fit the navbar
            width: "auto", // Maintain aspect ratio
            objectFit: "contain", // Ensure the image fits within the dimensions
          }}
        />
        <Link to="/">
          <Button colorScheme="blue">Broncho Books</Button>
        </Link>
      </Flex>

      <Flex gap="1rem" alignItems="center">
        {user ? (
          <>
            <Button colorScheme="green" onClick={handleAccount}>
              My Account
            </Button>
            <Box
              bg="white" // White background
              color="black" // Black text color
              px={4} // Horizontal padding
              py={2} // Vertical padding
              borderRadius="md" // Rounded corners
              shadow="md" // Add a shadow for a button-like appearance
            >
              <Text>Welcome, {user.email}</Text>
            </Box>
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
            {/* If logged in, link to the Add Book page */}
            <Link to="/addbook">
              <Button colorScheme="blue">+</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button colorScheme="blue">Login / Sign Up</Button>
            </Link>
            {/* If not logged in, link to the Login page */}
            <Link to="/login">
              <Button colorScheme="blue">+</Button>
            </Link>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
