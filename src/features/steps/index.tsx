import { next, previous, updateValue } from "./stepSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

export default function Steps() {
  const { currentStep, steps } = useAppSelector((state) => state.Steps);
  const dispatch = useAppDispatch();

  const step = steps[currentStep];
  const isFirst = currentStep === 0;
  const isLast = currentStep === steps.length - 1;

  return (
    <div className="app-container">
      <h1>Steps Form</h1>

      <p className="step-indicator">
        Step {currentStep + 1} of {steps.length}
      </p>

      <div className="progress-bar">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`progress-segment${i <= currentStep ? " filled" : ""}`}
          />
        ))}
      </div>

      <div className="step-field" key={currentStep}>
        <label htmlFor={step.name}>{step.label}</label>
        <input
          id={step.name}
          type={step.type}
          name={step.name}
          placeholder={step.placeholder}
          value={step.value}
          autoFocus
          onChange={(e) =>
            dispatch(updateValue({ index: currentStep, value: e.target.value }))
          }
          className={step.value && !step.valid ? "input-error" : ""}
        />
        {step.value && !step.valid && (
          <span className="error-text">
            Please enter a valid {step.label.toLowerCase()}
          </span>
        )}
      </div>

      <div className="buttons">
        <button onClick={() => dispatch(previous())} disabled={isFirst}>
          Back
        </button>
        {isLast ? (
          <button
            className="primary"
            disabled={!step.valid}
            onClick={() => alert("Form submitted!")}
          >
            Submit
          </button>
        ) : (
          <button
            className="primary"
            onClick={() => dispatch(next())}
            disabled={!step.valid}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
