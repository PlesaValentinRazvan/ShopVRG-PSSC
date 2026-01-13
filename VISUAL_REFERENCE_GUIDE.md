# 🎨 ShopVRG Frontend - Visual Reference Guide

## 🖼️ Application Screenshots (Text Description)

### 1. Header Navigation
```
═══════════════════════════════════════════════════════════════════════════
║  🖥️ ShopVRG                                    Shop    Cart [5]        ║
║  PC Components Store                                                    ║
═══════════════════════════════════════════════════════════════════════════
```

**Components:**
- Logo with gradient background (purple → violet)
- Navigation links (Shop, Cart)
- Cart badge showing item count
- Sticky positioning

---

### 2. Products Page

```
╔════════════════════════════════════════════════════════════════════════╗
║ PC Components Catalog                                                  ║
║ Premium Computer Parts for Gaming & Workstations                       ║
╠════════════════════════════════════════════════════════════════════════╣
║                                                                        ║
║  CPU (Central Processing Units)                                        ║
║  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐      ║
║  │ CPU001          │  │ CPU002          │  │ (more...)       │      ║
║  │ Intel Core i9   │  │ AMD Ryzen 9     │  │                 │      ║
║  │ 24-core...      │  │ 16-core...      │  │                 │      ║
║  │ $589.99         │  │ $549.99         │  │                 │      ║
║  │ 50 in stock     │  │ 45 in stock     │  │                 │      ║
║  │ Qty: [1]        │  │ Qty: [1]        │  │                 │      ║
║  │ [Add to Cart]   │  │ [Add to Cart]   │  │                 │      ║
║  └─────────────────┘  └─────────────────┘  └─────────────────┘      ║
║                                                                        ║
║  GPU (Graphics Cards)                                                  ║
║  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐      ║
║  │ GPU001          │  │ GPU002          │  │ (more...)       │      ║
║  │ NVIDIA RTX 4090 │  │ AMD Radeon RX   │  │                 │      ║
║  │ 24GB GDDR6X     │  │ 24GB GDDR6      │  │                 │      ║
║  │ $1599.99        │  │ $999.99         │  │                 │      ║
║  │ 25 in stock     │  │ 30 in stock     │  │                 │      ║
║  │ Qty: [1]        │  │ Qty: [1]        │  │                 │      ║
║  │ [Add to Cart]   │  │ [Add to Cart]   │  │                 │      ║
║  └─────────────────┘  └─────────────────┘  └─────────────────┘      ║
║  ... (more categories)                                                ║
╚════════════════════════════════════════════════════════════════════════╝
```

**Features:**
- Organized by category
- Product cards with hover effect
- Stock indicator (Low Stock badge if < 10)
- Quantity selector
- Add to cart button
- Responsive grid layout

---

### 3. Shopping Cart Page

```
╔═══════════════════════════════════════════════════════════════════════╗
║ Shopping Cart                                                         ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  ┌─────────────────────────────────────────┬────┬────────┬──────┐  ║
║  │ Intel Core i9-14900K                    │ x2 │ $1179  │ [×]  │  ║
║  │ CPU001 - $589.99 each                   │    │        │      │  ║
║  ├─────────────────────────────────────────┼────┼────────┼──────┤  ║
║  │ NVIDIA GeForce RTX 4090                 │ x1 │ $1600  │ [×]  │  ║
║  │ GPU001 - $1599.99 each                  │    │        │      │  ║
║  ├─────────────────────────────────────────┼────┼────────┼──────┤  ║
║  │ Corsair Vengeance DDR5-6000 32GB        │ x1 │ $160   │ [×]  │  ║
║  │ RAM001 - $159.99 each                   │    │        │      │  ║
║  └─────────────────────────────────────────┴────┴────────┴──────┘  ║
║                                                                       ║
║                              ORDER SUMMARY                            ║
║                              ═════════════                            ║
║                         Items:        3                              ║
║                         Total Qty:    4                              ║
║                         ─────────────────                            ║
║                         Total: $2,939.00                             ║
║                                                                       ║
║                    [Proceed to Checkout]                             ║
║                    [Continue Shopping]                               ║
║                    [Clear Cart]                                      ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

**Features:**
- Item list with name and code
- Quantity adjustment (quantity input)
- Remove button per item
- Order summary sidebar
- Sticky summary (stays visible while scrolling)
- Action buttons (Checkout, Continue, Clear)

---

### 4. Checkout - Step 1: Shipping

```
╔═══════════════════════════════════════════════════════════════════════╗
║ Checkout                                                              ║
║                                                                       ║
║  [1] ──── [2] ──── [3]                                               ║
║ Shipping  Payment  Confirm                                           ║
║                                                                       ║
╠═════════════════════════════════════┬═════════════════════════════════╣
║ SHIPPING ADDRESS                    │ ORDER SUMMARY                   ║
║                                     │                                 ║
║ Full Name                           │ Intel Core i9 x 2: $1,179.00   ║
║ [____________________]              │ NVIDIA RTX 4090 x 1: $1,599.99 ║
║                                     │ RAM 32GB x 1: $159.99          ║
║ Email                               │                                 ║
║ [____________________]              │ ─────────────────────           ║
║                                     │ Total: $2,939.00               ║
║ Street Address                      │                                 ║
║ [____________________]              │                                 ║
║                                     │                                 ║
║ City        [______]  Postal Code   │                                 ║
║             [______]                │                                 ║
║                                     │                                 ║
║ Country                             │                                 ║
║ [____________________]              │                                 ║
║                                     │                                 ║
║            [Continue to Payment]    │                                 ║
║                                     │                                 ║
╚═════════════════════════════════════╩═════════════════════════════════╝
```

**Features:**
- Step indicator showing current step
- Shipping form with validation
- Order summary on right (sticky)
- Form fields for customer info & address
- Continue button

---

### 5. Checkout - Step 2: Payment & Shipping

```
╔═══════════════════════════════════════════════════════════════════════╗
║ Checkout                                                              ║
║                                                                       ║
║  [1] ──── [2] ──── [3]                                               ║
║ Shipping  Payment  Confirm                                           ║
║                                                                       ║
╠═════════════════════════════════════┬═════════════════════════════════╣
║ PAYMENT INFORMATION                 │ ORDER SUMMARY                   ║
║                                     │                                 ║
║ Card Number                         │ Intel Core i9 x 2: $1,179.00   ║
║ [____________________]              │ NVIDIA RTX 4090 x 1: $1,599.99 ║
║                                     │ RAM 32GB x 1: $159.99          ║
║ Cardholder Name                     │                                 ║
║ [____________________]              │ ─────────────────────           ║
║                                     │ Total: $2,939.00               ║
║ Expiry (MM/YY)    CVV               │                                 ║
║ [_______]         [___]             │                                 ║
║                                     │                                 ║
║ SELECT SHIPPING CARRIER             │                                 ║
║                                     │                                 ║
║ [FedEx ▼]                           │                                 ║
║ ├─ FedEx                            │                                 ║
║ ├─ UPS                              │                                 ║
║ ├─ DHL                              │                                 ║
║ └─ USPS                             │                                 ║
║                                     │                                 ║
║ [Back] [Complete Order]             │                                 ║
║                                     │                                 ║
╚═════════════════════════════════════╩═════════════════════════════════╝
```

**Features:**
- Payment form with card fields
- Carrier selection dropdown
- Form validation
- Back button to previous step
- Complete order button
- Processing state during submission

---

### 6. Order Confirmation

```
╔═══════════════════════════════════════════════════════════════════════╗
║                                                                       ║
║                              🎉                                        ║
║                        Order Confirmed!                               ║
║                   Thank you for your purchase                         ║
║                                                                       ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║ ORDER INFORMATION          │  CUSTOMER INFORMATION                   ║
║ ─────────────────────      │  ──────────────────────                 ║
║ Order ID:                  │  Name: John Doe                         ║
║ 550e8400-e29b-41d4-a716... │  Email: john@example.com               ║
║ Status: ✓ Paid             │                                         ║
║ Date: 01/11/2026          │  PAYMENT CONFIRMATION                   ║
║ Total: $2,939.00          │  ──────────────────────                 ║
║                            │  Payment ID: 660e8400-e29b-41d4-a716... ║
║ SHIPPING DETAILS           │  Status: ✓ Completed                    ║
║ ─────────────────────      │  Amount: $2,939.00                      ║
║ Carrier: 🚚 FedEx         │  Ref: TXN-2026-01-11-12345             ║
║ Tracking: FDX123456789    │                                         ║
║ Shipped: 01/11/2026       │  TIMELINE                               ║
║ Est. Delivery: 01/14/2026 │  ─────────────                          ║
║                            │                                         ║
║                            │  1️⃣ Order Placed                        ║
║                            │     01/11/2026                         ║
║                            │                                         ║
║                            │  2️⃣ Payment Processed                   ║
║                            │     01/11/2026                         ║
║                            │                                         ║
║                            │  3️⃣ Order Shipped                       ║
║                            │     via FedEx                          ║
║                            │                                         ║
║                            │  4️⃣ Order Delivered                     ║
║                            │     Coming soon                        ║
║                                                                       ║
║                    [Continue Shopping]                               ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

**Features:**
- Success animation (bouncing 🎉)
- Order details display
- Customer information
- Payment confirmation
- Shipping/tracking information
- Timeline visualization
- Completed steps shown as green
- Continue shopping button

---

## 🎨 Color Palette

```
Primary Gradient:  #667eea → #764ba2 (Purple to Violet)
Success:          #51cf66 (Green)
Danger:           #ff6b6b (Red)
Warning:          #f57c00 (Orange)
Background:       #f5f5f5 (Light Gray)
Text Primary:     #333333 (Dark)
Text Secondary:   #666666 (Medium)
Text Tertiary:    #999999 (Light)
Border:           #ddd (Light Gray)
Card Background:  #ffffff (White)
```

---

## 📐 Typography

```
Heading 1 (h1):  2.5rem, bold, color: #333
Heading 2 (h2):  1.8rem, bold, color: #667eea
Heading 3 (h3):  1.2rem, bold, color: #333
Paragraph:       1rem, normal, color: #666
Label:           0.85rem, 600, color: #999, uppercase
Badge:           0.85rem, bold, padded
```

---

## 🔲 Button States

```
DEFAULT:
┌────────────────┐
│ Primary Button │
└────────────────┘
Background: #667eea, Color: white

HOVER:
┌────────────────┐
│ Primary Button │  ← Slightly darker
└────────────────┘
Background: #5568d3, Color: white

ACTIVE/CLICKED:
┌────────────────┐
│ Primary Button │  ← Pressed effect
└────────────────┘
Transform: scale(0.98)

DISABLED:
┌────────────────┐
│ Primary Button │  ← Faded
└────────────────┘
Opacity: 0.6, Cursor: not-allowed

SECONDARY:
┌────────────────┐
│Secondary Button│
└────────────────┘
Background: #e0e0e0, Color: #333

DANGER:
┌────────────────┐
│  Delete/Remove │
└────────────────┘
Background: #ff6b6b, Color: white
```

---

## 📱 Responsive Breakpoints

```
DESKTOP (≥1024px):
├─ Checkout: 2-column layout (form + summary)
├─ Products: 4-column grid
└─ All features visible

TABLET (768px - 1024px):
├─ Checkout: 2-column with adjusted spacing
├─ Products: 3-column grid
├─ Slightly smaller components
└─ Touch-friendly sizes

MOBILE (<768px):
├─ Checkout: 1-column (form above summary)
├─ Products: 1-column or 2-column grid
├─ Full-width forms
├─ Larger touch targets (44px minimum)
└─ Vertical scrolling
```

---

## 🎯 UI Component Examples

### Product Card
```
┌──────────────────────┐
│ CPU001               │
│ [Low Stock Badge]    │
├──────────────────────┤
│ Intel Core i9-14900K │
│ 24-core processor... │
│ $589.99   50 in stock│
│ Qty: [1]             │
│ [Add to Cart] (✓)    │
└──────────────────────┘
```

### Form Input
```
Label
[____________________]  ← Focused border: #667eea
                        ← Box shadow: rgba(102,126,234,0.1)
```

### Cart Item
```
┌─────────────────────────────────────────┐
│ Product Name          │  Qty: [2]  $XXX │
│ CODE001              │            [×]  │
│ $X.XX each           │                 │
└─────────────────────────────────────────┘
```

### Timeline Item
```
    [1] ← Completed
    │
    ├─ Order Placed
    │  01/11/2026
    │
    [2] ← Completed
    │
    ├─ Payment Processed
    │  01/11/2026
    │
    [3] ← In Progress
    │
    ├─ Order Shipped
    │  via FedEx
    │
    [4] ← Pending
    │
    └─ Order Delivered
       Coming soon
```

---

## 🎬 Animations

### Bounce Animation
```
@keyframes bounce {
  0%:   transform: translateY(0)
  50%:  transform: translateY(-10px)
  100%: transform: translateY(0)
}
Applied to: .success-icon
Duration: 0.6s ease
```

### Spin Animation
```
@keyframes spin {
  0%:   transform: rotate(0deg)
  100%: transform: rotate(360deg)
}
Applied to: .spinner
Duration: 1s linear infinite
```

### Transition Effects
```
Button hover:  all 0.3s ease
Border focus:  border-color 0.3s, box-shadow 0.3s
Card hover:    transform 0.3s, box-shadow 0.3s
Opacity:       0.3s ease
```

---

## 🖥️ Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Latest 2 versions |
| Firefox | ✅ Full | Latest 2 versions |
| Safari | ✅ Full | Latest 2 versions |
| Edge | ✅ Full | Latest version |
| Mobile Safari | ✅ Full | iOS 13+ |
| Chrome Mobile | ✅ Full | Latest version |

---

## 🎓 Component Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation
- Focus states visible
- Color contrast meets WCAG AA
- Form labels associated with inputs

---

**This visual guide shows the complete UI/UX design of the ShopVRG storefront!** 🎨
