import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "../features/Modal/modalSlice";
import { clearCard } from "../features/card/cardSlice";

export default function Modal() {
  const dispatch = useDispatch();
  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Remove all items from your shopping cart?</h4>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(clearCard());
              dispatch(closeModal());
            }}
          >
            confirm
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => dispatch(closeModal())}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
}
