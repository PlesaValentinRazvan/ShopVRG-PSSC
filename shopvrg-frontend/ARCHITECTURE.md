# ShopVRG Frontend - Architecture & Flow Documentation

## Project Structure

```
shopvrg-frontend/
├── public/
│   └── index.html                    # HTML entry point
├── src/
│   ├── api/
│   │   └── client.ts                # Type-safe API client
│   │       ├── getProducts()
│   │       ├── placeOrder()
│   │       ├── processPayment()
│   │       ├── shipOrder()
│   │       └── getShippingCarriers()
│   │
│   ├── store/
│   │   ├── cartStore.ts             # Cart state management
│   │   │   ├── items[]
│   │   │   ├── addItem()
│   │   │   ├── removeItem()
│   │   │   └── getTotalPrice()
│   │   │
│   │   ├── checkoutStore.ts         # Checkout state
│   │   │   ├── currentOrder
│   │   │   ├── currentPayment
│   │   │   ├── currentShipment
│   │   │   └── setOrder/setPayment/setShipment()
│   │   │
│   │   └── productStore.ts          # Product state
│   │       ├── products[]
│   │       ├── loading
│   │       └── setProducts()
│   │
│   ├── pages/
│   │   ├── ProductsPage.tsx         # Product listing
│   │   │   └── ProductsPage.css
│   │   │
│   │   ├── CartPage.tsx             # Shopping cart
│   │   │   └── CartPage.css
│   │   │
│   │   ├── CheckoutPage.tsx         # Multi-step checkout
│   │   │   └── CheckoutPage.css
│   │   │
│   │   └── OrderConfirmationPage.tsx # Order confirmation
│   │       └── OrderConfirmationPage.css
│   │
│   ├── App.tsx                      # Main app component
│   ├── App.css                      # Global styles
│   ├── index.tsx                    # React entry point
│   └── index.html
│
├── package.json
├── tsconfig.json
└── README.md
```

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    SHOPVRG STOREFRONT                           │
└─────────────────────────────────────────────────────────────────┘

                         ┌──────────────────┐
                         │   ProductsPage   │
                         └────────┬─────────┘
                                  │
                    ┌─────────────┴──────────────┐
                    │                            │
              useProductStore            useCartStore
              (Get Products)             (Add to Cart)
                    │                            │
                    ▼                            ▼
         ┌────────────────────┐        ┌──────────────────┐
         │  API: GET Products │        │   CartPage       │
         └────────┬───────────┘        └────────┬─────────┘
                  │                             │
        [CPU, GPU, RAM, ...]          [Display Items]
                                              │
                                    useCartStore
                                              │
                                    ┌─────────┴──────────┐
                                    │                    │
                                    ▼                    ▼
                          ┌──────────────────┐  ┌────────────────┐
                          │  CheckoutPage    │  │  Checkout Flow │
                          └────────┬─────────┘  └────────┬───────┘
                                   │                     │
                        ┌──────────┴──────────┐          │
                        │                     │          │
                        ▼                     ▼          │
              ┌─────────────────┐   ┌──────────────────┐ │
              │  Shipping Form  │   │  Payment Form    │ │
              │  Customer Name  │   │  Card Details    │ │
              │  Address        │   │  Carrier Select  │ │
              └────────┬────────┘   └────────┬─────────┘ │
                       │                     │           │
                       └─────────┬───────────┘           │
                                 │                       │
                                 ▼                       │
                    ┌────────────────────────┐          │
                    │  API: Place Order      │          │
                    │  POST /api/orders      │          │
                    └──────────┬─────────────┘          │
                               │                        │
              ┌────────────────┴────────────────┐       │
              │                                 │       │
              ▼                                 ▼       │
        ┌──────────────┐              ┌─────────────────┐
        │ Order Status │              │ useCheckoutStore│
        │ = "Placed"   │              │ setOrder()      │
        └──────┬───────┘              └────────┬────────┘
               │                               │
               └───────────┬───────────────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │  API: Process Payment  │
                │  POST /api/payments    │
                └──────────┬─────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
        ┌──────────────┐        ┌────────────────┐
        │ Payment      │        │ useCheckoutStore
        │ Status =     │        │ setPayment()   │
        │ "Completed"  │        └────────┬───────┘
        └──────┬───────┘               │
               │                       │
               └───────────┬───────────┘
                           │
                           ▼
                ┌────────────────────────┐
                │  API: Ship Order       │
                │  POST /api/shipping    │
                └──────────┬─────────────┘
                           │
              ┌────────────┴────────────┐
              │                         │
              ▼                         ▼
        ┌──────────────┐        ┌────────────────────┐
        │ Shipment     │        │ useCheckoutStore   │
        │ Created      │        │ setShipment()      │
        │ Tracking #   │        └────────┬───────────┘
        └──────┬───────┘                 │
               │                         │
               └───────────┬─────────────┘
                           │
                           ▼
              ┌────────────────────────────┐
              │ OrderConfirmationPage      │
              │ - Order Details            │
              │ - Payment Confirmation     │
              │ - Tracking Number          │
              │ - Timeline                 │
              └────────────────────────────┘
```

## Complete Order Processing Flow

```
USER JOURNEY
────────────────────────────────────────────────────────────────

1. BROWSE PRODUCTS
   ├─ useProductStore.setLoading(true)
   ├─ apiClient.getActiveProducts()
   ├─ useProductStore.setProducts(products)
   └─ useProductStore.setLoading(false)
   
   [ProductsPage displays products by category]

2. ADD TO CART
   ├─ useCartStore.addItem(product, quantity)
   ├─ Cart items updated in state
   └─ Visual feedback (✓ Added)
   
   [User can add multiple items]

3. VIEW CART
   ├─ CartPage fetches useCartStore.items
   ├─ useCartStore.getTotalPrice()
   ├─ useCartStore.getTotalItems()
   └─ User can modify quantities or remove items
   
   [Shopping cart displays all items with totals]

4. CHECKOUT - SHIPPING
   ├─ useState(shippingForm)
   ├─ Form validation (all fields required)
   └─ Step indicator: ① → ②
   
   [User enters shipping address]

5. CHECKOUT - PAYMENT
   ├─ useState(paymentForm)
   ├─ Form validation
   ├─ setState(selectedCarrier)
   └─ Step indicator: ② → ③
   
   [User enters payment details and selects carrier]

6. SUBMIT ORDER
   ├─ setLoading(true)
   └─ Try-catch block for error handling

7. CREATE ORDER
   ├─ apiClient.placeOrder(shippingInfo + orderLines)
   │  POST /api/orders
   ├─ Response: { orderId, status: "Placed", totalPrice, createdAt }
   └─ useCheckoutStore.setOrder(orderResponse)

8. PROCESS PAYMENT
   ├─ apiClient.processPayment(paymentDetails)
   │  POST /api/payments
   ├─ Response: { paymentId, status: "Completed", transactionReference }
   └─ useCheckoutStore.setPayment(paymentResponse)

9. SHIP ORDER
   ├─ apiClient.shipOrder(orderId, carrier)
   │  POST /api/shipping
   ├─ Response: { trackingNumber, estimatedDelivery }
   └─ useCheckoutStore.setShipment(shipmentResponse)

10. SUCCESS
    ├─ useCartStore.clearCart()
    ├─ navigate('/order-confirmation')
    └─ Display confirmation page

11. VIEW CONFIRMATION
    ├─ OrderConfirmationPage displays:
    │  ├─ Order details
    │  ├─ Payment confirmation
    │  ├─ Shipping information
    │  └─ Timeline visualization
    └─ Continue shopping button
```

## State Management Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    ZUSTAND STORES                           │
└─────────────────────────────────────────────────────────────┘

CART STORE (cartStore.ts)
────────────────────────────────────────────────────────────
Interface CartItem {
  product: Product
  quantity: number
}

State:
  - items: CartItem[]
  
Actions:
  - addItem(product, quantity)
    └─> Add or update item in cart
  
  - removeItem(productCode)
    └─> Remove item from cart
  
  - updateQuantity(productCode, quantity)
    └─> Update item quantity or remove if 0
  
  - clearCart()
    └─> Empty cart
  
  - getTotalPrice()
    └─> Calculate sum of all line totals
  
  - getTotalItems()
    └─> Count all items


PRODUCT STORE (productStore.ts)
────────────────────────────────────────────────────────────
State:
  - products: Product[]
  - loading: boolean
  - error: string | null
  
Actions:
  - setProducts(products)
    └─> Update product list
  
  - setLoading(loading)
    └─> Set loading state
  
  - setError(error)
    └─> Set error message
  
  - getProductByCode(code)
    └─> Find product by code


CHECKOUT STORE (checkoutStore.ts)
────────────────────────────────────────────────────────────
Types:
  OrderStatus: 'Placed' | 'Paid' | 'Shipped' | 'Delivered' | 'Cancelled'
  PaymentStatus: 'Pending' | 'Processing' | 'Completed' | 'Failed'
  ShippingStatus: 'Pending' | 'InTransit' | 'Delivered'

State:
  - currentOrder: Order
  - currentPayment: Payment
  - currentShipment: Shipment
  
Actions:
  - setOrder(order)
    └─> Store completed order
  
  - setPayment(payment)
    └─> Store completed payment
  
  - setShipment(shipment)
    └─> Store shipment details
  
  - updateOrderStatus(orderId, status)
    └─> Update order status
  
  - clearCheckout()
    └─> Clear all checkout data
```

## API Endpoints Integration

```
┌─────────────────────────────────────────────────────────┐
│              API CLIENT (src/api/client.ts)             │
└─────────────────────────────────────────────────────────┘

BASE_URL: http://localhost:5156/api

PRODUCTS
────────────────────────────────────────────────────────
GET /products
  └─> Response: Product[]
  └─> useProductStore.setProducts()

GET /products/active
  └─> Response: Product[]
  └─> Used on app init

GET /products/{code}
  └─> Response: Product
  └─> Get single product details


ORDERS
────────────────────────────────────────────────────────
POST /orders
  Input: {
    customerName: string
    customerEmail: string
    shippingStreet: string
    shippingCity: string
    shippingPostalCode: string
    shippingCountry: string
    orderLines: OrderLine[]
  }
  
  Output: {
    orderId: string (GUID)
    status: "Placed"
    totalPrice: number
    createdAt: string (ISO)
  }
  
  └─> useCheckoutStore.setOrder()


PAYMENTS
────────────────────────────────────────────────────────
POST /payments
  Input: {
    orderId: string
    amount: number
    cardNumber: string
    cardHolderName: string
    expiryDate: string
    cvv: string
  }
  
  Output: {
    paymentId: string (GUID)
    orderId: string
    amount: number
    status: "Completed"
    transactionReference: string
    processedAt: string (ISO)
  }
  
  └─> useCheckoutStore.setPayment()


SHIPPING
────────────────────────────────────────────────────────
POST /shipping
  Input: {
    orderId: string
    carrier: string
  }
  
  Output: {
    id: number
    orderId: string
    trackingNumber: string
    carrier: string
    shippedAt: string (ISO)
    estimatedDelivery: string (ISO)
  }
  
  └─> useCheckoutStore.setShipment()

GET /shipping/carriers
  └─> Response: ["FedEx", "UPS", "DHL", "USPS"]
  └─> Used in payment form
```

## Component Hierarchy

```
App
├── Header
│   ├── Logo (ShopVRG)
│   ├── Navigation
│   │   ├── Link to "/"
│   │   └── Link to "/cart" with badge
│   └── Cart badge (useCartStore.getTotalItems())
│
├── Main (Routes)
│   │
│   ├── Route path="/"
│   │   └── ProductsPage
│   │       ├── useProductStore()
│   │       ├── useCartStore()
│   │       ├── Category sections
│   │       └── Product cards
│   │           ├── Product info
│   │           ├── Quantity input
│   │           └── Add to cart button
│   │
│   ├── Route path="/cart"
│   │   └── CartPage
│   │       ├── useCartStore()
│   │       ├── Cart items list
│   │       │   ├── Item details
│   │       │   ├── Quantity control
│   │       │   └── Remove button
│   │       └── Order summary sidebar
│   │           ├── Item count
│   │           ├── Total price
│   │           └── Checkout button
│   │
│   ├── Route path="/checkout"
│   │   └── CheckoutPage
│   │       ├── Step indicator
│   │       ├── Form (shipping or payment)
│   │       │   ├── Shipping form (Step 1)
│   │       │   │   ├── Name & email inputs
│   │       │   │   ├── Address inputs
│   │       │   │   └── Continue button
│   │       │   │
│   │       │   └── Payment form (Step 2)
│   │       │       ├── Card inputs
│   │       │       ├── Carrier select
│   │       │       ├── Back button
│   │       │       └── Complete order button
│   │       │
│   │       └── Order summary sidebar
│   │           ├── useCartStore.items
│   │           ├─ Item list
│   │           └─ Total price
│   │
│   └── Route path="/order-confirmation"
│       └── OrderConfirmationPage
│           ├── useCheckoutStore()
│           ├── Success header
│           ├── Order details section
│           ├── Customer details section
│           ├── Payment confirmation section
│           ├── Shipment details section
│           ├── Timeline visualization
│           └── Continue shopping button
│
└── Footer
    └── Copyright text
```

## Event Flow Diagram

```
USER ACTION                 COMPONENT              STORE              API
────────────────────────────────────────────────────────────────────────────

Click "Add to Cart"  ──→  ProductsPage  ──→  useCartStore.addItem()
                          ↓
                       Visual feedback
                       (✓ Added)


Click "Cart" link    ──→  Navigate to     ──→  CartPage renders
                          /cart                useCartStore.items


Click "Checkout"     ──→  CheckoutPage    
Button                    Step 1 displayed


Fill Shipping Form   ──→  useState()
& Click "Continue"        ↓
                          Validation passed
                          ↓
                          Step 2 displayed


Fill Payment Form    ──→  useState()
& Click "Complete"        ↓
                          Validation passed
                          ↓
                          POST /orders  ──→  useCheckoutStore.setOrder()
                          ↓
                          POST /payments  ──→  useCheckoutStore.setPayment()
                          ↓
                          POST /shipping  ──→  useCheckoutStore.setShipment()
                          ↓
                          useCartStore.clearCart()
                          ↓
                          Navigate to /order-confirmation


View Confirmation    ──→  OrderConfirmationPage
                          useCheckoutStore.currentOrder/Payment/Shipment
                          ↓
                          Display all details
```

## Error Handling Flow

```
User Action
    ↓
Try Block
    ├─ API Call
    │   ├─ Success: Process response
    │   └─ Error: Catch block
    ↓
Catch Block
    ├─ setError(error.response?.data?.message)
    ├─ Display error in UI
    └─ Log to console

User sees:
  ✓ Loading state during request
  ✗ Error message if failed
  ✓ Success confirmation if passed
```

## Mobile Responsiveness

```
Desktop (≥1024px)
├─ Checkout: 2 columns (form + summary)
├─ Cart: Grid layout
└─ Products: Multi-column grid

Tablet (768px - 1024px)
├─ Adjusted spacing
├─ Slightly smaller grid
└─ Touch-friendly sizes

Mobile (<768px)
├─ Single column layouts
├─ Full-width forms
├─ Stacked components
└─ Large touch targets
```

---

## Key Concepts Implemented

1. **React Hooks**: useState, useEffect, custom Zustand hooks
2. **Routing**: React Router v6 with nested routes
3. **State Management**: Zustand stores with actions
4. **Type Safety**: Full TypeScript implementation
5. **API Integration**: Axios with error handling
6. **Form Handling**: Multi-step forms with validation
7. **Responsive Design**: Mobile-first CSS Grid/Flexbox
8. **User Feedback**: Loading states, error messages, success confirmations
9. **Navigation**: Programmatic navigation after order completion
10. **Data Persistence**: Zustand stores for cart & checkout data

This architecture provides a scalable, maintainable, and type-safe React storefront!
