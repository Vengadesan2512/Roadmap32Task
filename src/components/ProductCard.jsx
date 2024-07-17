import React from 'react';
import { useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../product/productSlice';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const totalAmount = (product.quantity || 0) * product.price;

  return (
    <div className="product-card">
      <div className='imges'><img src={product.images} alt={product.title} /></div>
     <div className='titles'> <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
      <p>Brand: {product.brand}</p>
      <p>Category: {product.category}</p>
      <p>Total Amount: ${totalAmount}</p>
       <div className="buttons">
        <button onClick={() => dispatch(incrementQuantity(product.id))}>Add</button>
        <button onClick={() => dispatch(decrementQuantity(product.id))}>Remove</button>
      </div>
      </div>
     
    </div>
  );
};

export default ProductCard;
