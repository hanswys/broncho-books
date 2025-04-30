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
} from "@chakra-ui/react";
import { useBookStore } from "../store/books";
import { useUserStore } from "../store/users";
import BookCard from "../components/BookCard";

const AccountPage = () => {
  const { books, fetchBooks } = useBookStore(); // Access books and fetchBooks from the store
  const { user } = useUserStore(); // Access the logged-in user
  const [userBooks, setUserBooks] = useState([]); // State to store the user's books

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

  return (
    <Box bg="blue.900" minH="100vh" p={8}>
      <Container maxW={"container.xl"} bg={useColorModeValue("yellow.50", "yellow.900")} p={8} minH={"100vh"}>
        <VStack spacing={8}>
          <Heading as="h1" size="xl">
            My Account
          </Heading>

          {/* Tabs for My Books and My Messages */}
          <Tabs variant="enclosed" w="full" maxW="container.md">
            <TabList>
              <Tab>My Books</Tab>
              {/* <Tab>My Messages</Tab> */}
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
                      <BookCard
                        key={book._id}
                        title={book.title}
                        price={book.price}
                        image={book.image}
                        createdBy="You" // Since these are the user's books
                      />
                    ))}
                  </SimpleGrid>
                ) : (
                  <Text>No books found. Start adding your books!</Text>
                )}
              </TabPanel>

              {/* My Messages Tab */}
              <TabPanel>
                <Heading as="h2" size="md" mb={4}>
                  My Messages
                </Heading>
                <Text>Here you can view your messages.</Text>
                {/* Add logic to display the user's messages */}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};

export default AccountPage;