import React, { useEffect, useState } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Heading,
  VStack,
  Text,
  Container,
  useColorModeValue,
  SimpleGrid,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useBookStore } from "../store/books";
import { useUserStore } from "../store/users";
import BookCard from "../components/BookCard";

const AccountPage = () => {
  const { books, fetchBooks, deleteBook, updateBook } = useBookStore(); // Access books, deleteBook, and updateBook from the store
  const { user } = useUserStore(); // Access the logged-in user
  const [userBooks, setUserBooks] = useState([]); // State to store the user's books
  const [selectedBook, setSelectedBook] = useState(null); // State for the selected book
  const [newPrice, setNewPrice] = useState(""); // State for the new price
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal controls

  useEffect(() => {
    const fetchUserBooks = async () => {
      await fetchBooks(); // Fetch all books
      if (user) {
        // Filter books created by the logged-in user
        const filteredBooks = books.filter((book) => book.createdBy === user._id);
        setUserBooks(filteredBooks);
      }
    };

    fetchUserBooks();
  }, [fetchBooks, books, user]);

  const handleUpdateClick = (book) => {
    setSelectedBook(book); // Set the selected book
    setNewPrice(book.price); // Pre-fill the current price
    onOpen(); // Open the modal
  };

  const handleUpdatePrice = async () => {
    if (!newPrice || isNaN(newPrice)) {
        alert("Please enter a valid price.");
        return;
    }

    const { success, message } = await updateBook(selectedBook._id, {
        ...selectedBook,
        price: parseFloat(newPrice), // Update the price
    });

    if (success) {
        toast({
            title: "Success",
            description: "Book price updated successfully.",
            status: "success",
            isClosable: true,
        });

        // Update the local state to reflect the new price
        setUserBooks((prevBooks) =>
            prevBooks.map((book) =>
                book._id === selectedBook._id ? { ...book, price: parseFloat(newPrice) } : book
            )
        );

        onClose(); // Close the modal
    } else {
        toast({
            title: "Error",
            description: message,
            status: "error",
            isClosable: true,
        });
    }
};

const handleDeleteBook = async (bookId) => {
  const confirmation = window.confirm("Are you sure you want to delete this book?");
  if (!confirmation) return;

  const { success, message } = await deleteBook(bookId); // Call the deleteBook function from the store

  if (success) {
    toast({
      title: "Success",
      description: "Book deleted successfully.",
      status: "success",
      isClosable: true,
    });

    // Optionally, update the local state to reflect the deletion
    setUserBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
  } else {
    toast({
      title: "Error",
      description: message,
      status: "error",
      isClosable: true,
    });
  }
};

  return (
    <Box bg="blue.900" minH="100vh" p={8}>
      <Container maxW={"container.xl"} bg={useColorModeValue("yellow.50", "yellow.900")} p={8} minH={"100vh"}>
        <VStack spacing={8}>
          <Heading as="h1" size="xl">
            My Account
          </Heading>

          {/* Tabs for My Books */}
          <Tabs variant="enclosed" w="full" maxW="container.md">
            <TabList>
              <Tab>My Books</Tab>
            </TabList>

            <TabPanels>
              {/* My Books Tab */}
              <TabPanel>
                <Heading as="h2" size="md" mb={4}>
                  My Books
                </Heading>
                {userBooks.length > 0 ? (
                  <SimpleGrid columns={[1, 2, 3]} spacing={6}>
                    {userBooks.map((book) => (
                      <Box key={book._id}>
                        <BookCard
                          title={book.title}
                          price={book.price}
                          image={book.image}
                          createdBy="You" // Since these are the user's books
                        />
                        <Button
                          colorScheme="blue"
                          size="sm"
                          mt={2}
                          onClick={() => handleUpdateClick(book)}
                        >
                          Update Price
                        </Button>
                        <Button
                          colorScheme="red"
                          size="sm"
                          mt={2}
                          ml={2}
                          onClick={() => handleDeleteBook(book._id)}
                        >
                          Delete Book
                        </Button>
                      </Box>
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text>No books found. Start adding your books!</Text>
                )}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>

      {/* Update Price Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Book Price</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedBook && (
              <>
                <Text fontWeight="bold">Book Title:</Text>
                <Text mb={4}>{selectedBook.title}</Text>
                <Text fontWeight="bold">Current Price:</Text>
                <Text mb={4}>${selectedBook.price.toFixed(2)}</Text>
                <Text fontWeight="bold">New Price:</Text>
                <Input
                  placeholder="Enter new price"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdatePrice}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AccountPage;