import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useCheckoutStore } from '../store/checkoutStore';
import { apiClient, PlaceOrderRequest } from '../api/client';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const { setOrder, setPayment, setShipment } = useCheckoutStore();

  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>(
    'shipping'
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Shipping form state
  const [shippingForm, setShippingForm] = useState({
    customerName: '',
    customerEmail: '',
    shippingStreet: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: '',
  });

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    cvv: '',
  });

  // Shipping selection
  const [selectedCarrier, setSelectedCarrier] = useState('FedEx');

  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <div className="error">Cart is empty. Please add items first.</div>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/')}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !shippingForm.customerName ||
      !shippingForm.customerEmail ||
      !shippingForm.shippingStreet ||
      !shippingForm.shippingCity ||
      !shippingForm.shippingPostalCode ||
      !shippingForm.shippingCountry
    ) {
      setError('Please fill in all shipping fields');
      return;
    }
    setError(null);
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !paymentForm.cardNumber ||
      !paymentForm.cardHolderName ||
      !paymentForm.expiryDate ||
      !paymentForm.cvv
    ) {
      setError('Please fill in all payment fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Step 1: Place Order
      const orderRequest: PlaceOrderRequest = {
        ...shippingForm,
        orderLines: items.map((item) => ({
          productCode: item.product.code,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.product.price,
          lineTotal: item.product.price * item.quantity,
        })),
      };

      const orderResponse = await apiClient.placeOrder(orderRequest);
      setOrder({
        orderId: orderResponse.orderId,
        status: (orderResponse.status || 'Placed') as any,
        totalPrice: orderResponse.totalPrice,
        createdAt: orderResponse.createdAt,
        customerName: shippingForm.customerName,
        customerEmail: shippingForm.customerEmail,
      });

      // Step 2: Process Payment
      const paymentResponse = await apiClient.processPayment({
        orderId: orderResponse.orderId,
        amount: totalPrice,
        cardNumber: paymentForm.cardNumber,
        cardHolderName: paymentForm.cardHolderName,
        expiryDate: paymentForm.expiryDate,
        cvv: paymentForm.cvv,
      });

      setPayment({
        paymentId: paymentResponse.paymentId,
        orderId: paymentResponse.orderId,
        amount: paymentResponse.amount,
        status: paymentResponse.status as any,
        transactionReference: paymentResponse.transactionReference,
        processedAt: paymentResponse.processedAt,
      });

      // Step 3: Ship Order
      const shipmentResponse = await apiClient.shipOrder({
        orderId: orderResponse.orderId,
        carrier: selectedCarrier,
      });

      setShipment({
        id: shipmentResponse.id,
        orderId: shipmentResponse.orderId,
        trackingNumber: shipmentResponse.trackingNumber,
        carrier: shipmentResponse.carrier,
        shippedAt: shipmentResponse.shippedAt,
        estimatedDelivery: shipmentResponse.estimatedDelivery,
      });

      // Clear cart and go to confirmation
      clearCart();
      navigate('/order-confirmation');
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Failed to process order. Please try again.'
      );
      console.error('Checkout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">
        <div className="checkout-steps">
          <div className={`step ${step === 'shipping' ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Shipping</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step === 'payment' ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Payment</span>
          </div>
          <div className="step-line"></div>
          <div className={`step ${step === 'confirmation' ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Confirmation</span>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <div className="checkout-content">
          {step === 'shipping' && (
            <form onSubmit={handleShippingSubmit} className="form">
              <h2>Shipping Address</h2>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  value={shippingForm.customerName}
                  onChange={(e) =>
                    setShippingForm({
                      ...shippingForm,
                      customerName: e.target.value,
                    })
                  }
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  value={shippingForm.customerEmail}
                  onChange={(e) =>
                    setShippingForm({
                      ...shippingForm,
                      customerEmail: e.target.value,
                    })
                  }
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  value={shippingForm.shippingStreet}
                  onChange={(e) =>
                    setShippingForm({
                      ...shippingForm,
                      shippingStreet: e.target.value,
                    })
                  }
                  placeholder="123 Main St"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    value={shippingForm.shippingCity}
                    onChange={(e) =>
                      setShippingForm({
                        ...shippingForm,
                        shippingCity: e.target.value,
                      })
                    }
                    placeholder="New York"
                  />
                </div>
                <div className="form-group">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    value={shippingForm.shippingPostalCode}
                    onChange={(e) =>
                      setShippingForm({
                        ...shippingForm,
                        shippingPostalCode: e.target.value,
                      })
                    }
                    placeholder="10001"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  value={shippingForm.shippingCountry}
                  onChange={(e) =>
                    setShippingForm({
                      ...shippingForm,
                      shippingCountry: e.target.value,
                    })
                  }
                  placeholder="United States"
                />
              </div>

              <button type="submit" className="btn btn-primary">
                Continue to Payment
              </button>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handlePaymentSubmit} className="form">
              <h2>Payment Information</h2>

              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  value={paymentForm.cardNumber}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      cardNumber: e.target.value.replace(/\s/g, ''),
                    })
                  }
                  placeholder="1234 5678 9012 3456"
                  maxLength={16}
                />
              </div>

              <div className="form-group">
                <label>Cardholder Name</label>
                <input
                  type="text"
                  value={paymentForm.cardHolderName}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      cardHolderName: e.target.value,
                    })
                  }
                  placeholder="John Doe"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Expiry Date (MM/YY)</label>
                  <input
                    type="text"
                    value={paymentForm.expiryDate}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        expiryDate: e.target.value,
                      })
                    }
                    placeholder="12/25"
                    maxLength={5}
                  />
                </div>
                <div className="form-group">
                  <label>CVV</label>
                  <input
                    type="text"
                    value={paymentForm.cvv}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        cvv: e.target.value,
                      })
                    }
                    placeholder="123"
                    maxLength={4}
                  />
                </div>
              </div>

              <h3>Select Shipping Carrier</h3>
              <div className="form-group">
                <select
                  value={selectedCarrier}
                  onChange={(e) => setSelectedCarrier(e.target.value)}
                  className="select-input"
                >
                  <option value="FedEx">FedEx</option>
                  <option value="UPS">UPS</option>
                  <option value="DHL">DHL</option>
                  <option value="USPS">USPS</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setStep('shipping')}
                >
                  Back to Shipping
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Complete Order'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {items.map((item) => (
              <div key={item.product.code} className="summary-item">
                <span>
                  {item.product.name} x {item.quantity}
                </span>
                <span>${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
