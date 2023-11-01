import React, { useState, useEffect } from "react";
import axios from "axios";

function BookManagement() {
    const [books, setBooks] = useState([]);
    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        description: "",
        genre: "",
        isbn: "",
        published: "",
        publisher: "",
        image: "",
    });
    const [editing, setEditing] = useState(false);
    const [editBookId, setEditBookId] = useState(null);

    useEffect(() => {
        // Fetch the list of books when the component mounts
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/books");
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookData({ ...bookData, [name]: value });
    };

    const addBook = async () => {
        try {
            await axios.post("http://127.0.0.1:8000/api/books", bookData);
            setBookData({
                title: "",
                author: "",
                description: "",
                genre: "",
                isbn: "",
                published: "",
                publisher: "",
                image: "",
            });
            fetchBooks();
        } catch (error) {
            console.error("Error adding a book:", error);
        }
    };

    const editBook = async () => {
        if (editBookId) {
            try {
                await axios.put(
                    `http://127.0.0.1:8000/api/books/${editBookId}`,
                    bookData
                );
                setEditing(false);
                setEditBookId(null);
                setBookData({
                    title: "",
                    author: "",
                    description: "",
                    genre: "",
                    isbn: "",
                    published: "",
                    publisher: "",
                    image: "",
                });
                fetchBooks();
            } catch (error) {
                console.error("Error editing a book:", error);
            }
        }
    };

    const deleteBook = async (book) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/api/books/${book.id}`);
            fetchBooks();
        } catch (error) {
            console.error("Error deleting a book:", error);
        }
    };

    const startEditing = (book) => {
        setEditing(true);
        setEditBookId(book.id);
        setBookData(book);
    };

    const toggleEditing = () => {
        setEditing(!editing);
    };

    const cancelEditing = () => {
        setEditing(false);
        setEditBookId(null);
        setBookData({
            title: "",
            author: "",
            genre: "",
            isbn: "",
            published: "",
        });
    };

    return (
        <div className="container">
            <h1>Book Management</h1>
            <button className="btn btn-primary" onClick={toggleEditing}>
                {editing ? "Cancel Editing" : "Add/Edit Book"}
            </button>
            {editing && (
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control pt-2 mb-2"
                        name="title"
                        placeholder="Title"
                        value={bookData.title}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control pt-2 mb-2"
                        name="author"
                        placeholder="Author"
                        value={bookData.author}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control pt-2 mb-2"
                        name="publisher"
                        placeholder="publisher"
                        value={bookData.publisher}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control pt-2 mb-2"
                        name="description"
                        placeholder="Description"
                        value={bookData.description}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control pt-2 mb-2"
                        name="genre"
                        placeholder="Genre"
                        value={bookData.genre}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control pt-2 mb-2"
                        name="image"
                        placeholder="Image"
                        value={bookData.image || ""} // Use an empty string as the default value
                        onChange={handleInputChange}
                    />

                    <input
                        type="text"
                        className="form-control pt-2 mb-2"
                        name="isbn"
                        placeholder="ISBN"
                        value={bookData.isbn}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        className="form-control pt-2 mb-2"
                        name="published"
                        placeholder="Published"
                        value={bookData.published}
                        onChange={handleInputChange}
                    />
                    {editing ? (
                        <div>
                            <button
                                className="btn btn-primary"
                                onClick={editBook}
                            >
                                Save Changes
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={cancelEditing}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <button className="btn btn-success" onClick={addBook}>
                            Add Book
                        </button>
                    )}
                </div>
            )}
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>ISBN</th>
                        <th>Published</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.isbn}</td>
                            <td>{book.published}</td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => startEditing(book)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteBook(book)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookManagement;
