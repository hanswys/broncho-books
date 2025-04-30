import React from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

const BookCard = ({ title, price, image, createdBy }) => {
    return (
        <Box
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            shadow="md"
            p={3}
            w="270px" // Fixed width for consistent layout
            bg="white"
        >
            <Image src={image} alt={title} boxSize="300px" objectFit="cover" mx="auto" mb={2} />
            <VStack spacing={2} align="start">
                <Text fontSize="xl" fontWeight="bold">
                    {title}
                </Text>
                <Text fontSize="md" color="gray.600">
                    ${price.toFixed(2)}
                </Text>
                <Text fontSize="sm" color="gray.500">
                    Created by: {createdBy}
                </Text>
            </VStack>
        </Box>
    );
};

export default BookCard;