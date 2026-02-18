import { useState } from "react";
import { increment, decrement, incrementByAmount, reset } from "./counterSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

export default function Counter() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [amount, setAmount] = useState(0);

  const resetCounter = () => {
    dispatch(reset());
    setAmount(0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Counter: {count}</h2>

      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={resetCounter}>Reset</button>

      <div style={{ marginTop: 10 }}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button onClick={() => dispatch(incrementByAmount(amount))}>
          Add Amount
        </button>
      </div>
    </div>
  );
}
