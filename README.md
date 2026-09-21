# Flipcart Clone (React)

A practice e-commerce project built with React, styled to look like Flipkart.
No real backend — cart, checkout and login are all handled with front-end state only.

## Setup

1. Make sure Node.js is installed (check with `node -v` in a terminal — version 16 or higher is fine).
2. Open this folder in VS Code.
3. Open a terminal in VS Code (Terminal → New Terminal) and run:

   ```
   npm install
   ```

   This downloads React and the other packages listed in `package.json` into a `node_modules` folder (it will NOT exist until you run this).

4. Start the project:

   ```
   npm start
   ```

   This opens the app automatically at http://localhost:3000 and reloads the page whenever you save a file.

## Project structure

```
flipcart-react/
├── public/
│   └── index.html          -> the single HTML page React mounts into
├── src/
│   ├── index.js             -> entry point, renders <App />
│   ├── index.css            -> all styling (colors, layout, responsive rules)
│   ├── App.js                -> main state (cart, page, login) + page routing
│   ├── data/
│   │   └── products.js       -> product list + category list
│   ├── utils/
│   │   └── format.js         -> currency formatting helper
│   ├── components/
│   │   ├── Header.jsx         -> logo, search bar, login/user menu, cart icon
│   │   ├── CategoryBar.jsx    -> category filter tabs
│   │   ├── ProductCard.jsx    -> one product tile in the grid
│   │   └── LoginModal.jsx     -> login/signup popup (fake auth, demo only)
│   └── pages/
│       ├── HomePage.jsx        -> product grid + search/category filtering
│       ├── DetailsPage.jsx     -> single product view with quantity + add to cart
│       ├── CartPage.jsx        -> cart items, quantity update, price summary
│       ├── CheckoutPage.jsx    -> delivery address form + payment method
│       └── ConfirmationPage.jsx -> order placed screen with a generated order ID
└── package.json
```

## Notes for explaining this to your team lead

- Page navigation (Home / Details / Cart / Checkout / Confirmation) is handled with a `page` state variable in `App.js`, not a routing library like React Router — simple, but works fine for a project this size.
- Cart data lives in `App.js` and is passed down to pages via props (no Redux or Context API).
- The Login modal accepts any input as valid — it's meant to demonstrate the UI flow, not real authentication.
- Cart and login state reset on page refresh, since nothing is saved to a database or browser storage.
