import Book from "../model/Books.js"

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find(); // find all books in the database
        res.status(200).json(books); // send the books as a response
    } catch (error) {
        res.status(500).json({ message: "Error fetching books" });
    }
}

export const addBooks = async (req, res) => {
    const book = req.body;

    if (!book.title || !book.price || !book.image || !book.createdBy) {
        return res.status(400).json({ message: "Please fill all the fields, including the creator." });
    }

    const newBook = new Book(book);

    try {
        await newBook.save();
        res.status(201).json(newBook); // Send the created book as the response
    } catch (error) {
        res.status(500).json({ message: "Error creating book" });
    }
};

export const updateBooks = async (req, res) => {
    const { id } = req.params; // get the id from the url
    const book = req.body; // get the book from the body

    if(!book.title || !book.price || !book.image) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const updatedBook = await Book.findByIdAndUpdate(id, book, { new: true });
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(500).json({ message: "Error updating book" });
    }
}

export const deleteBooks = async (req, res) => {
    const { id } = req.params; // Get the book ID from the URL

    try {
        const deletedBook = await Book.findByIdAndDelete(id); // Delete the book by ID

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" }); // Handle case where book doesn't exist
        }

        res.status(200).json({ message: "Book deleted successfully", deletedBook });
    } catch (error) {
        res.status(500).json({ message: "Error deleting book" }); // Handle server errors
    }
};