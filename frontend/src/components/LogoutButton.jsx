import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/users";

const LogoutButton = () => {
    const { logoutUser } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(); // Clear user data
        navigate("/login"); // Redirect to login page
    };

    return (
        <Button colorScheme="red" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;