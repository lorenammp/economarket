import "./reset.css";
import Ways from "./Routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductProvider } from "./Providers/products";
import { ReservedProvider } from "./Providers/reserved";
import { WishlistProvider } from "./Providers/wishlist";

function App() {
  return (
    <div id="content-wrap">
      <ProductProvider>
        <ReservedProvider>
          <WishlistProvider>
            <Ways />
            <ToastContainer
              position="top-left"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </WishlistProvider>
        </ReservedProvider>
      </ProductProvider>
    </div>
  );
}

export default App;
