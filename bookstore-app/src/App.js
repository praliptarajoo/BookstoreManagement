import './App.css';
import SearchComponent from './components/Search';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductPage from './components/ProductPage';
import BookManagement from './components/BookManagement';

const router = createBrowserRouter([
  {
    path: "/",
    element: <SearchComponent />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "/bookManagement",
    element: <BookManagement />,
  },
]);

function App() {
  return (
    <div className="App">
        <RouterProvider router={router} />
    </div>
  );
}

export default App;
