import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SearchComponent() {
    // State for search input and filter values
    const [title, setTitle] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [searchResult, setSearchResult] = useState([]);

    const [showInput, setShowInput] = useState(false);
    const [email, setEmail] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(true);

    // Function to handle the search
    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/api/books/search?title=${title}&genre=${genreFilter}`
            );
            setSearchResult(response.data);
        } catch (error) {
            console.error("Error searching for books:", error);
            setSearchResult([]);
        }
    };

    const verifyEmail = () => {
        if (email === "admin@test.com") {
            setIsEmailVerified(true);
            setIsEmailValid(true);
        } else {
            setIsEmailValid(false);
        }
    };

    return (
        <div className="container my-5">
            <h1>Search for Books</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                />
                <div className="input-group-append">
                    <button className="btn btn-primary" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </div>

            {!isEmailVerified ? (
                <div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowInput(true)}
                    >
                        Verify Email
                    </button>
                    <br />
                    {showInput && (
                        <div className="container mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button
                                className="btn btn-primary mt-2"
                                onClick={verifyEmail}
                            >
                                Submit
                            </button>
                        </div>
                    )}
                    {isEmailValid ? null : (
                        <p className="text-danger mt-2">
                            Email is not valid. Try again.
                        </p>
                    )}
                </div>
            ) : (
                <div>
                    <p>
                        Email Verified! You can now access the following link:
                    </p>
                    <Link to="/bookManagement" className="btn btn-success mt-3">
                        Manage your books here
                    </Link>
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
                    </tr>
                </thead>
                <tbody>
                    {searchResult.length > 0 ? (
                        searchResult.map((book) => (
                            <tr key={book.id}>
                                <td>
                                    <Link to={`/product/${book.id}`}>
                                        {book.title}
                                    </Link>
                                </td>
                                <td>{book.author}</td>
                                <td>{book.genre}</td>
                                <td>{book.isbn}</td>
                                <td>{book.published}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No books found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SearchComponent;
