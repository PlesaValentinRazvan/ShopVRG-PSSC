import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import './CartPage.css';

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } =
    useCartStore();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.product.code} className="cart-item">
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p className="item-code">{item.product.code}</p>
                <p className="item-price">
                  ${item.product.price.toFixed(2)} each
                </p>
              </div>

              <div className="item-quantity">
                <label htmlFor="quantity-input">Quantity:</label>
                <input
                  id="quantity-input"
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(
                      item.product.code,
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                  className="quantity-input"
                />
              </div>

              <div className="item-total">
                <p>
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
              </div>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeItem(item.product.code)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items:</span>
            <span>{items.length}</span>
          </div>
          <div className="summary-row">
            <span>Total Quantity:</span>
            <span>
              {items.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </div>
          <div className="summary-row total">
            <span>Total Price:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>

          <button
            className="btn btn-secondary"
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </button>

          <button
            className="btn btn-secondary"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
