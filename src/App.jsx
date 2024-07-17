
// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './product/productSlice';
import ProductCard from './components/ProductCard';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  let content;

  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'succeeded') {
    content = products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  } else if (status === 'failed') {
    content = <div>{error}</div>;
  }

  return <div className="App">{content}</div>;
}

export default App;


