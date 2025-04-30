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
import { useBookStore } from "../store/books";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import imageCompression from "browser-image-compression"; // Import the library

const AddBookPage = () => {
  const { createBook } = useBookStore(); // Import createBook from the store
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const navigate = useNavigate(); // Initialize useNavigate

const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 5 * 1024 * 1024) {
      // Limit file size to 5MB
      toast({
        title: "Error",
        description: "File size exceeds 5MB. Please upload a smaller file.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    try {
      // Compress the image
      const options = {
        maxSizeMB: 1, // Maximum size in MB
        maxWidthOrHeight: 800, // Maximum width or height
        useWebWorker: true, // Use a web worker for better performance
      };
      const compressedFile = await imageCompression(file, options);

      // Convert the compressed image to Base64
      const reader = new FileReader();
      reader.onload = () => {
        setNewProduct((prev) => ({ ...prev, image: reader.result })); // Save the Base64 string
      };
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      console.error("Error compressing the image:", error);
      toast({
        title: "Error",
        description: "Failed to compress the image. Please try again.",
        status: "error",
        isClosable: true,
      });
    }
  }
};

  const handleAddBook = async () => {
    const user = JSON.parse(localStorage.getItem("user")); // Retrieve the current user from localStorage

    if (!user || !user._id) {
      toast({
        title: "Error",
        description: "You must be logged in to add a book.",
        status: "error",
        isClosable: true,
      });
      return;
    }

    const bookWithCreator = {
      ...newProduct,
      createdBy: user._id, // Add the current user's ID as the creator
    };

    const { success, message } = await createBook(bookWithCreator);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true,
      });

      setNewProduct({ title: "", price: "", image: "" }); // Reset the form

      navigate("/"); // Navigate to the homepage after success
    }
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
            Create New Book
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
                placeholder="Book Title"
                name="title"
                value={newProduct.title}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, title: e.target.value })
                }
              />
              <Input
                placeholder="Price"
                name="price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                variant="outline"
                size="sm"
              />
              <Button colorScheme="blue" onClick={handleAddBook} w="full">
                Add Book
              </Button>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default AddBookPage;