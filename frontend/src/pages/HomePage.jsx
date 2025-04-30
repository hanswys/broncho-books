import React, { useEffect, useState } from "react";
import {
    Input,
    Flex,
    Heading,
    useColorModeValue,
    VStack,
    Container,
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Text,
} from "@chakra-ui/react";
import BookCard from "../components/BookCard.jsx";
import { useBookStore } from "../store/books";

const HomePage = () => {
    const { books, fetchBooks } = useBookStore(); // Fetch books from the store
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [filteredBooks, setFilteredBooks] = useState([]); // State for filtered books
    const [userEmails, setUserEmails] = useState({}); // Map of userId to email
    const [selectedBook, setSelectedBook] = useState(null); // State for the selected book
    const { isOpen, onOpen, onClose } = useDisclosure(); // Modal controls

    useEffect(() => {
        fetchBooks(); // Fetch books when the component mounts
    }, [fetchBooks]);

    useEffect(() => {
        // Filter books based on the search query
        setFilteredBooks(
            books.filter((book) =>
                book.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
        );
    }, [searchQuery, books]);

    useEffect(() => {
        // Fetch emails for all unique `createdBy` user IDs
        const fetchEmails = async () => {
            const uniqueUserIds = [...new Set(books.map((book) => book.createdBy))];
            const emailMap = {};

            for (const userId of uniqueUserIds) {
                if (userId) {
                    try {
                        const res = await fetch(`http://localhost:3000/api/users/${userId}`);
                        const data = await res.json();
                        emailMap[userId] = data.email; // Map userId to email
                    } catch (error) {
                        console.error(`Error fetching email for userId ${userId}:`, error);
                    }
                }
            }

            setUserEmails(emailMap); // Update state with the email map
        };

        if (books.length > 0) {
            fetchEmails();
        }
    }, [books]);

    const handleContactClick = (book) => {
        setSelectedBook(book); // Set the selected book
        onOpen(); // Open the modal
    };

    return (
        <Box bg="blue.900" minH="100vh" p={4}>
            <Container maxW={"container.xl"} bg={useColorModeValue("yellow.50", "yellow.900")} p={8} minH={"100vh"}>
                <VStack spacing={8}>
                    <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                        UCO Marketplace for Used Books
                    </Heading>

                    {/* Search Input */}
                    <Input
                        placeholder="Search books by title..."
                        size="md"
                        mb={8}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        bg="white"
                        color="blue"
                    />

                    {/* Book Flexbox */}
                    <Flex wrap="wrap" justify="space-between" gap={3}>
                        {filteredBooks.map((book) => (
                            <Box
                                key={book._id}
                                onClick={() => handleContactClick(book)} // Make the book card clickable
                                cursor="pointer"
                            >
                                <BookCard
                                    title={book.title}
                                    price={book.price}
                                    image={book.image}
                                    createdBy={userEmails[book.createdBy] || "Unknown"} // Pass the email or "Unknown"
                                />
                            </Box>
                        ))}
                    </Flex>
                </VStack>
            </Container>

            {/* Contact Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Contact Book Owner</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedBook && (
                            <>
                                <Text fontWeight="bold">Book Title:</Text>
                                <Text mb={4}>{selectedBook.title}</Text>
                                <Text fontWeight="bold">Price:</Text>
                                <Text mb={4}>${selectedBook.price.toFixed(2)}</Text>
                                <Text fontWeight="bold">Owner's Email:</Text>
                                <Text>{userEmails[selectedBook.createdBy] || "Unknown"}</Text>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button
                            as="a"
                            href={`mailto:${userEmails[selectedBook?.createdBy]}`}
                            colorScheme="green"
                            isDisabled={!userEmails[selectedBook?.createdBy]}
                        >
                            Contact
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default HomePage;