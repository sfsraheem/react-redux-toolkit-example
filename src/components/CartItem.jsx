import React from "react";
import { ChevronDown, ChevronUp } from "../icons";
import { useDispatch } from "react-redux";
import { removeItem, toggleItem } from "../features/card/cardSlice";

export default function CartItem({ id, title, price, img, amount }) {
  const dispatch = useDispatch();
  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        <button className="remove-btn" onClick={() => dispatch(removeItem(id))}>
          remove
        </button>
      </div>
      <div>
        <button
          className="amount-btn"
          onClick={() => dispatch(toggleItem({ id, action: "increase" }))}
        >
          <ChevronUp />
        </button>
        <p className="amount">{amount}</p>
        <button
          // disabled={amount <= 1 ? true : false}
          className="amount-btn"
          onClick={() => {
            if (amount <= 1) {
              dispatch(removeItem(id));
              return;
            }
            dispatch(toggleItem({ id, action: "decrease" }));
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  );
}
