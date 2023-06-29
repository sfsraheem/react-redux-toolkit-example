import React from "react";
import CartItem from "./CartItem";
import { useSelector, useDispatch } from "react-redux";
import { clearCard } from "../features/card/cardSlice";
import { openModal } from "../features/Modal/modalSlice";

export default function CartContainer() {
  const { cardItems, amount, total } = useSelector((state) => state.card);

  const dispatch = useDispatch();
  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cardItems.map((card) => {
          return <CartItem key={card.id} {...card} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(openModal())}>
          clear cart
        </button>
      </footer>
    </section>
  );
}
