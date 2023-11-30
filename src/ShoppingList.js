// ShoppingList.js
import React, { useState } from 'react';
import './ShoppingList.css';

const ShoppingList = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Chleb', price: 2.5 },
    { id: 2, name: 'Mleko', price: 1.5 },
    { id: 3, name: 'Jajka', price: 3.0 },
    { id: 4, name: 'Masło', price: 4.5 },
    { id: 5, name: 'Cukier', price: 2.0 },
    { id: 6, name: 'Jogurt', price: 3.5 },
    { id: 7, name: 'Pomidory', price: 5.0 },
    { id: 8, name: 'Ser', price: 6.0 },
    { id: 9, name: 'Szynka', price: 7.5 },
    { id: 10, name: 'Chipsy', price: 4.0 },
    { id: 11, name: 'Woda', price: 1.0 },
    { id: 12, name: 'Kawa', price: 8.0 },
    { id: 13, name: 'Herbata', price: 3.0 },
  ]);

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const addToCart = () => {
    if (selectedProduct && selectedQuantity > 0) {
      const updatedCart = [
        ...cart,
        { ...selectedProduct, quantity: selectedQuantity },
      ];
      setCart(updatedCart);
      setTotalPrice(
        totalPrice + selectedProduct.price * selectedQuantity
      );
      setSelectedProduct(null);
      setSelectedQuantity(1);
    }
  };

  const removeFromCart = (productId) => {
    const removedProduct = cart.find((item) => item.id === productId);
    if (removedProduct) {
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
      setTotalPrice(
        totalPrice - removedProduct.price * removedProduct.quantity
      );
    }
  };

  const renderProducts = () => {
    return products.map((product) => (
      <div key={product.id} className="product-card">
        <h3>{product.name}</h3>
        <p>Cena: {product.price.toFixed(2)} zł</p>
        <div className="product-controls">
          <label htmlFor={`quantity-${product.id}`}>Ilość:</label>
          <input
            type="number"
            id={`quantity-${product.id}`}
            min="1"
            value={selectedProduct === product ? selectedQuantity : 1}
            onChange={(e) => {
              setSelectedProduct(product);
              setSelectedQuantity(parseInt(e.target.value, 10) || 1);
            }}
          />
          <button
            onClick={addToCart}
            disabled={!selectedProduct || selectedQuantity <= 0}
          >
            Dodaj do koszyka
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="shopping-list-container">
      <div className="cart">
        <h2>Koszyk</h2>
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <h3>{item.name}</h3>
            <p>Cena: {(item.price * item.quantity).toFixed(2)} zł</p>
            <p>Ilość: {item.quantity}</p>
            <button onClick={() => removeFromCart(item.id)}>Usuń</button>
          </div>
        ))}
        <p className="total-price">Łączna cena: {totalPrice.toFixed(2)} zł</p>
      </div>

      <div className="product-list">{renderProducts()}</div>
    </div>
  );
};

export default ShoppingList;
