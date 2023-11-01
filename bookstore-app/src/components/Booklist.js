import React, { useEffect, useState } from "react";

function BookList() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Fetch the list of books from your Laravel API
        fetch("http://127.0.0.1:8000/api/books")
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>Book List</h1>
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Description</th>
                        <th>ISBN</th>
                        <th>Image</th>
                        <th>Published</th>
                        <th>Publisher</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.genre}</td>
                            <td>{book.description}</td>
                            <td>{book.isbn}</td>
                            <td>
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    style={{ maxWidth: "100px" }}
                                />
                            </td>
                            <td>{book.published}</td>
                            <td>{book.publisher}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default BookList;
