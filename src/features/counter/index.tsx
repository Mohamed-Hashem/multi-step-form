import { useState } from "react";
import { increment, decrement, incrementByAmount, reset } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);

  return (
    <div className="app-container">
      <h1>Redux Toolkit Counter</h1>

      <div className="counter-value">{count}</div>

      <div className="buttons">
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(decrement())}>-</button>
        <button
          onClick={() => {
            dispatch(reset());
            setAmount(0);
          }}
        >
          Reset
        </button>
      </div>

      <div className="input-group">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
          className="primary"
          onClick={() => {
            dispatch(incrementByAmount(amount));
          }}
        >
          Add Amount
        </button>
      </div>
    </div>
  );
}
