import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ProductPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Define an async function to fetch the product data
    async function fetchProduct() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/books/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    }

    // Call the fetchProduct function when the component mounts
    fetchProduct();
  }, [id]); // Make sure to include 'id' as a dependency

  if (!product) {
    return <div>Loading...</div>; // You can also render a loading indicator
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ maxWidth: '300px' }} />
      <p>Author: {product.author}</p>
      <p>Genre: {product.genre}</p>
      <p>Description: {product.description}</p>
      <p>ISBN: {product.isbn}</p>
      <p>Published: {product.published}</p>
      <p>Publisher: {product.publisher}</p>
    </div>
  );
}

export default ProductPage;
