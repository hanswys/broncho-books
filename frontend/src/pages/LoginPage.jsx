import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { useUserStore } from "../store/users";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const { loginUser } = useUserStore(); // Import loginUser from the store
  const toast = useToast();
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async () => {
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Error",
        description: "Please fill in both fields.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const { success, message } = await loginUser(
      credentials.email,
      credentials.password
    );
    if (success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });
      navigate("/"); // Redirect to the homepage after successful login
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    }

    // Reset the form
    setCredentials({ email: "", password: "" });
  };

  return (
    <Box bg="blue.900" minH="100vh" p={4}>
      <Container
        maxW={"container.xl"}
        bg={useColorModeValue("yellow.50", "yellow.900")}
        p={8}
        minH={"100vh"}
      >
        <VStack spacing={8}>
          <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
            Start selling your used books!
          </Heading>

          <Box
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            p={6}
            rounded={"lg"}
            shadow={"md"}
          >
            <VStack spacing={4}>
              <Input
                placeholder="Email"
                name="email"
                type="email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              <Input
                placeholder="Password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <Button colorScheme="blue" onClick={handleLogin} w="full">
                Login
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default LoginPage;
