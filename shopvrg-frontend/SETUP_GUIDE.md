# ShopVRG Frontend - Complete Setup & Usage Guide

## 📋 Prerequisites

- **Node.js** 18+ with npm
- **ShopVRG API** running on `http://localhost:5156`
- **Git** (optional, for version control)

## 🚀 Setup Instructions

### Step 1: Navigate to Frontend Directory

```bash
cd c:\Users\plesa\Desktop\ShopVRG-PSSC\shopvrg-frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- react (UI framework)
- react-dom (React bindings)
- react-router-dom (Routing)
- axios (HTTP client)
- zustand (State management)
- typescript (Type safety)

### Step 3: Verify API is Running

Make sure the ShopVRG.Api is running on `http://localhost:5156`:

```bash
# In another terminal, from the API directory:
cd c:\Users\plesa\Desktop\ShopVRG-PSSC\ShopVRG.Api
dotnet run --launch-profile http
```

You should see:
```
Swagger UI: http://localhost:5156/swagger/index.html
API Base: http://localhost:5156/api
```

### Step 4: Start Frontend Development Server

```bash
npm start
```

The application will automatically open in your browser at `http://localhost:3000`

You should see:
```
Compiled successfully!

You can now view shopvrg-frontend in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
To create a production build, use npm run build.
```

## ✅ Verify Everything Works

### 1. Check Products Load

When the app opens, you should see:
- Header with "ShopVRG" logo
- "Shop" and "Cart" links in navigation
- Product categories (CPU, GPU, RAM, etc.)
- Product cards with details and "Add to Cart" buttons

### 2. Test Add to Cart

1. Click on any product's quantity input
2. Change the number (e.g., to 2)
3. Click "Add to Cart"
4. You should see:
   - A confirmation (✓ Added)
   - Cart badge updates to show count
   - Item appears in cart

### 3. Test Shopping Cart

1. Click "Cart" in the navigation
2. You should see:
   - All added items listed
   - Ability to adjust quantities
   - Remove buttons for each item
   - Order summary on the right
   - "Proceed to Checkout" button

### 4. Test Checkout Flow

1. Click "Proceed to Checkout"
2. **Shipping Step:**
   - Fill in all shipping fields
   - Click "Continue to Payment"
3. **Payment Step:**
   - Fill in card details (any valid format, this is dev mode)
   - Select a carrier
   - Click "Complete Order"

### 5. Verify Order Confirmation

You should see:
- Success animation (🎉)
- Order ID and status
- Customer information
- Payment confirmation
- Shipping details with tracking number
- Timeline showing order progression

## 📱 Available Commands

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (one-way operation)
npm run eject
```

## 🔍 Project Structure Overview

```
shopvrg-frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── api/
│   │   └── client.ts           # API integration
│   ├── store/
│   │   ├── cartStore.ts        # Cart state
│   │   ├── checkoutStore.ts    # Order/Payment state
│   │   └── productStore.ts     # Products state
│   ├── pages/
│   │   ├── ProductsPage.tsx    # Product listing
│   │   ├── CartPage.tsx        # Shopping cart
│   │   ├── CheckoutPage.tsx    # Checkout form
│   │   └── OrderConfirmationPage.tsx  # Confirmation
│   ├── App.tsx                 # Main app
│   ├── App.css                 # Styles
│   └── index.tsx               # React entry
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
└── README.md                   # Documentation
```

## 📂 Key Files Explained

### API Integration (`src/api/client.ts`)

Handles all HTTP requests to the backend:

```typescript
// Get products
const products = await apiClient.getActiveProducts();

// Place order
const orderResponse = await apiClient.placeOrder({
  customerName: "John Doe",
  customerEmail: "john@example.com",
  // ... shipping details
  // ... order lines
});

// Process payment
const paymentResponse = await apiClient.processPayment({
  orderId: orderResponse.orderId,
  amount: 1500.00,
  cardNumber: "4532...",
  // ... more details
});

// Ship order
const shipmentResponse = await apiClient.shipOrder({
  orderId: orderResponse.orderId,
  carrier: "FedEx"
});
```

### State Stores

```typescript
// Cart Store - manage shopping cart
import { useCartStore } from './store/cartStore';

const { items, addItem, removeItem, getTotalPrice } = useCartStore();

// Product Store - manage products
import { useProductStore } from './store/productStore';

const { products, loading, error } = useProductStore();

// Checkout Store - manage order/payment/shipment
import { useCheckoutStore } from './store/checkoutStore';

const { currentOrder, currentPayment, setOrder } = useCheckoutStore();
```

### Page Components

Each page represents a step in the user journey:

1. **ProductsPage**: Browse and add items
2. **CartPage**: Review items before checkout
3. **CheckoutPage**: Enter shipping & payment
4. **OrderConfirmationPage**: View order success

## 🎨 Styling

The app uses modern CSS with:
- Gradient backgrounds
- Responsive grid layouts
- Flexbox for component layout
- Media queries for mobile responsiveness
- CSS animations (bounce, spin)
- Smooth transitions and hover effects

All styles are in `src/App.css` and individual page CSS files.

## 🐛 Troubleshooting

### Issue: Products not loading

**Solution:** 
- Check API is running on `http://localhost:5156`
- Check browser console for CORS errors
- Verify API endpoints in `src/api/client.ts`

```bash
# Test API manually:
curl http://localhost:5156/api/products
```

### Issue: Can't add items to cart

**Solution:**
- Check browser console for errors
- Verify product quantity > 0
- Check localStorage in DevTools

### Issue: Checkout fails

**Solution:**
- Verify all form fields are filled
- Check API response in Network tab
- Use test card: 4532 1111 1111 1111

### Issue: Port 3000 already in use

**Solution:**
```bash
# Kill process on port 3000 (Windows):
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port:
PORT=3001 npm start
```

## 📊 Component Data Flow

```
App.tsx
├── Header (Navigation)
│   └── uses: useCartStore (for badge)
│
├── Routes
│   ├── ProductsPage
│   │   ├── uses: useProductStore (for products)
│   │   └── uses: useCartStore (to add items)
│   │
│   ├── CartPage
│   │   └── uses: useCartStore (for items & totals)
│   │
│   ├── CheckoutPage
│   │   ├── uses: useCartStore (for items)
│   │   ├── uses: useCheckoutStore (to save order)
│   │   └── calls: apiClient methods
│   │
│   └── OrderConfirmationPage
│       └── uses: useCheckoutStore (to display data)
│
└── Footer (Static)
```

## 🔐 Security Notes

This is a **development version**. For production:

1. **HTTPS**: Enable SSL/TLS encryption
2. **API Key**: Add authentication tokens
3. **Card Details**: Never store real card numbers
4. **Validation**: Add more robust input validation
5. **Environment Variables**: Use `.env` files for sensitive data

## 📈 Performance Tips

1. **Code Splitting**: React Router automatically splits code by route
2. **Lazy Loading**: Images load as needed
3. **State Optimization**: Zustand provides selective re-renders
4. **Build Optimization**: Use `npm run build` for production

## 🚀 Deployment to Azure

### Build for production:

```bash
npm run build
```

### Deploy to Azure Static Web Apps:

1. Create a `.github/workflows/deploy.yml` file
2. Set up GitHub Actions to deploy on push
3. Configure environment variable:
   ```
   REACT_APP_API_URL=https://your-api.azurewebsites.net/api
   ```

### Or manually:

1. Upload `build/` folder to Azure Static Web Apps
2. Configure API URL in deployment settings

## 💡 Development Tips

### React DevTools

Install React DevTools browser extension to:
- Inspect component hierarchy
- View props and state
- Track re-renders
- Profile performance

### Network Inspector

Use browser DevTools (F12) → Network tab to:
- Monitor API calls
- Check request/response payloads
- Identify CORS issues
- Debug timing

### Console Debugging

Add logs to track data flow:

```typescript
console.log('Products loaded:', products);
console.log('Cart items:', useCartStore.getState().items);
```

## 📚 Learning Resources

- [React Hooks Docs](https://react.dev/reference/react)
- [React Router Docs](https://reactrouter.com/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Docs](https://github.com/pmndrs/zustand)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

## ✨ Next Steps

1. ✅ **Run the app** - Follow setup instructions
2. ✅ **Test flows** - Try browsing, cart, and checkout
3. ✅ **Check console** - Look for any errors
4. ✅ **Explore code** - Understand component structure
5. ✅ **Customize** - Adjust styles and add features

## 📝 Common Customizations

### Change API URL

Edit `src/api/client.ts`:
```typescript
const API_BASE_URL = 'https://your-api-url.com/api';
```

### Update Colors

Edit `src/App.css`:
```css
/* Change primary color */
.btn-primary {
  background-color: #your-color;
}
```

### Add New Page

1. Create `src/pages/NewPage.tsx`
2. Add route in `App.tsx`
3. Import and use

### Add Product Filtering

1. Add filter state in `ProductsPage`
2. Filter products before rendering
3. Update product display

## 🎯 Project Checklist

- ✅ API Integration
- ✅ Product Listing
- ✅ Shopping Cart
- ✅ Multi-step Checkout
- ✅ Order Processing
- ✅ Order Confirmation
- ✅ State Management
- ✅ Error Handling
- ✅ Responsive Design
- ✅ TypeScript Support
- ✅ CSS Styling
- ✅ Documentation

## 📞 Support

If you encounter issues:

1. Check the browser console for errors
2. Review the API response in Network tab
3. Check `.env` configuration
4. Verify API is running
5. Review error messages

## 🎉 You're All Set!

Your ShopVRG storefront is ready to use. Start by running:

```bash
npm install
npm start
```

Then navigate through the application to test all features!
