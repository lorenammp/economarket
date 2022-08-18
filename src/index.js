import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { WishlistProvider } from "./Providers/wishlist";
import { ProductProvider } from "./Providers/products";
import { ReservedProvider } from "./Providers/reserved";
import { UserProvider } from "./Providers/userProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <ProductProvider>
        <WishlistProvider>
          <ReservedProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ReservedProvider>
        </WishlistProvider>
      </ProductProvider>
    </UserProvider>
  </React.StrictMode>
);
