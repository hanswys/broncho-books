import { create } from "zustand";

export const useBookStore = create((set) => ({
    books: [],
    setBooks: (books) => set({ books }),
    createBook: async (newBook) => {
        if (!newBook.title || !newBook.image || !newBook.price) {
            return { success: false, message: "Please fill in all fields." };
        }
    
        const res = await fetch("http://localhost:3000/api/books", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook), // Include the createdBy field
        });
    
        if (!res.ok) {
            return { success: false, message: "Failed to create book" };
        }
    
        const data = await res.json();
        set((state) => ({ books: [...state.books, data] }));
        return { success: true, message: "Book created successfully" };
    },

    fetchBooks: async () => {
        const res = await fetch("http://localhost:3000/api/books"); // Updated URL
        const data = await res.json();
        set({ books: data });
    },
    deleteBook: async (bid) => {
        const res = await fetch(`http://localhost:3000/api/books/${bid}`, { // Updated URL
            method: "DELETE",
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({ books: state.books.filter((book) => book._id !== bid) }));
        return { success: true, message: data.message };
    },
    updateBook: async (bid, updatedBook) => {
        const res = await fetch(`http://localhost:3000/api/books/${bid}`, { // Updated URL
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set((state) => ({
            books: state.books.map((book) => (book._id === bid ? data : book)),
        }));

        return { success: true, message: data.message };
    },
}));