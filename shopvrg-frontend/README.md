# ShopVRG Frontend - React + TypeScript Storefront

A fully functioning e-commerce storefront for ShopVRG PC Components Store, built with React and TypeScript, integrating with the .NET 9 API backend.

## Features

✅ **Product Browsing**
- Browse PC components organized by category
- View detailed product information
- Real-time stock availability

✅ **Shopping Cart**
- Add/remove products
- Update quantities
- Real-time cart totals

✅ **Complete Checkout Flow**
- Shipping address collection
- Payment processing
- Carrier selection
- Order confirmation with tracking

✅ **Order Management**
- Order status tracking
- Payment confirmation
- Shipment tracking
- Timeline visualization

✅ **State Management**
- Zustand stores for cart, products, and checkout
- Type-safe state management
- Persistence-ready architecture

✅ **API Integration**
- RESTful API client
- All CRUD operations supported
- Error handling
- Loading states

## Project Structure

```
shopvrg-frontend/
├── src/
│   ├── api/
│   │   └── client.ts           # API client with all endpoints
│   ├── store/
│   │   ├── cartStore.ts        # Shopping cart state
│   │   ├── checkoutStore.ts    # Checkout flow state
│   │   └── productStore.ts     # Products state
│   ├── pages/
│   │   ├── ProductsPage.tsx    # Product listing
│   │   ├── CartPage.tsx        # Shopping cart
│   │   ├── CheckoutPage.tsx    # Checkout form
│   │   └── OrderConfirmationPage.tsx  # Order confirmation
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # Global styles
│   └── index.tsx               # React entry point
├── public/
│   └── index.html              # HTML template
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

### Prerequisites
- Node.js 18+ and npm installed
- ShopVRG API running on `http://localhost:5156`

### Setup Steps

1. **Install Dependencies**
```bash
cd shopvrg-frontend
npm install
```

2. **Start Development Server**
```bash
npm start
```

The storefront will open at `http://localhost:3000`

3. **Build for Production**
```bash
npm run build
```

## API Integration

The frontend integrates with these API endpoints:

### Products
- `GET /api/products` - List all products
- `GET /api/products/active` - List active products
- `GET /api/products/{code}` - Get product by code

### Orders
- `POST /api/orders` - Place new order

### Payments
- `POST /api/payments` - Process payment

### Shipping
- `POST /api/shipping` - Ship order
- `GET /api/shipping/carriers` - List available carriers

## Complete Order Flow

1. **Product Browsing**
   - Browse products by category
   - View stock and pricing

2. **Add to Cart**
   - Select quantity
   - Add item to cart
   - Cart updates in real-time

3. **Checkout**
   - Step 1: Enter shipping address
   - Step 2: Enter payment details & select carrier
   - Step 3: Process order

4. **Order Processing**
   - Order created with status "Placed"
   - Payment processed
   - Shipment created with tracking number
   - Order status updated to "Shipped"

5. **Confirmation**
   - View complete order details
   - See payment information
   - Track shipment details
   - Timeline visualization

## State Management with Zustand

### Cart Store
```typescript
useCartStore((state) => ({
  items,
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  getTotalPrice,
  getTotalItems
}))
```

### Checkout Store
```typescript
useCheckoutStore((state) => ({
  currentOrder,
  currentPayment,
  currentShipment,
  setOrder,
  setPayment,
  setShipment,
  clearCheckout
}))
```

### Product Store
```typescript
useProductStore((state) => ({
  products,
  loading,
  error,
  setProducts,
  setLoading,
  setError,
  getProductByCode
}))
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type-safe code
- **React Router v6** - Navigation
- **Zustand** - State management
- **Axios** - HTTP client
- **CSS3** - Styling with modern features

## Components Architecture

### Pages
- **ProductsPage**: Browse and search products
- **CartPage**: View and manage cart items
- **CheckoutPage**: Multi-step checkout form
- **OrderConfirmationPage**: Order success page

### Stores
- **cartStore**: Shopping cart management
- **checkoutStore**: Order, payment, and shipment tracking
- **productStore**: Product list and caching

### API Client
- Type-safe API calls
- Error handling
- Request/response transformations

## Styling

- Modern gradient headers
- Responsive grid layouts
- Card-based design
- Smooth animations
- Mobile-friendly breakpoints

## Error Handling

- API error messages displayed to user
- Loading states during async operations
- Form validation
- Network error handling

## Future Enhancements

- Product search and filtering
- User authentication
- Order history
- Wishlist functionality
- Product reviews
- Coupon codes
- Multiple payment methods
- Save addresses
- Email notifications

## Environment Variables

Create a `.env` file for production deployment:

```env
REACT_APP_API_URL=https://your-api-domain.com/api
```

## Building for Azure Static Web Apps

```bash
npm run build
```

Deploy the `/build` folder to Azure Static Web Apps.

## Testing

Run tests with:
```bash
npm test
```

## License

MIT
