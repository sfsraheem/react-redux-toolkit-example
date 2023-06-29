import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { calculateTotals, getCartItems } from "./features/card/cardSlice";
import Modal from "./components/Modal";

function App() {
  const { cardItems, isLoading } = useSelector((state) => state.card);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(calculateTotals());
  }, [cardItems]);
  useEffect(() => {
    dispatch(getCartItems({ data: "random" }));
  }, []);
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  );
}
export default App;
