import { memo, useCallback } from "react";
import { next, previous, updateValue, reset } from "./stepSlice";
import type { StepItem } from "./stepSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";

const ProgressBar = memo(function ProgressBar({
  steps,
  currentStep,
}: {
  steps: StepItem[];
  currentStep: number;
}) {
  return (
    <div className="progress-bar">
      {steps.map((step, i) => (
        <div
          key={step.name}
          className={`progress-segment${i <= currentStep ? " filled" : ""}`}
        />
      ))}
    </div>
  );
});

const StepField = memo(function StepField({
  step,
  onChangeValue,
}: {
  step: StepItem;
  onChangeValue: (value: string) => void;
}) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeValue(e.target.value);
    },
    [onChangeValue],
  );

  const inputClassName = step.value && !step.valid ? "input-error" : "";

  return (
    <div className="step-field">
      <label htmlFor={step.name}>{step.label}</label>
      <input
        id={step.name}
        type={step.type}
        name={step.name}
        placeholder={step.placeholder}
        value={step.value}
        onChange={handleChange}
        className={inputClassName}
      />
      {step.value && !step.valid && (
        <span className="error-text">
          Please enter a valid {step.label.toLowerCase()}
        </span>
      )}
    </div>
  );
});

export default function Steps() {
  const { currentStep, steps } = useAppSelector((state) => state.Steps);
  const dispatch = useAppDispatch();

  const safeIndex = Math.max(
    0,
    Math.min(Math.floor(currentStep), steps.length - 1),
  );
  const step = steps.at(safeIndex);

  const isFirst = safeIndex === 0;
  const isLast = safeIndex === steps.length - 1;

  // useCallback — stable dispatch wrappers so memoized children don't re-render
  const handleNext = useCallback(() => dispatch(next()), [dispatch]);
  const handlePrevious = useCallback(() => dispatch(previous()), [dispatch]);
  const handleChangeValue = useCallback(
    (value: string) => {
      dispatch(updateValue({ index: safeIndex, value }));
    },
    [dispatch, safeIndex],
  );
  const handleSubmit = useCallback(() => {
    alert("Form submitted!");
    dispatch(reset());
  }, [dispatch]);

  if (!step) {
    return <p>No steps available.</p>;
  }

  return (
    <main className="app-container" role="main">
      <h1>Multi-Step Form</h1>

      <p className="step-indicator">
        Step {safeIndex + 1} of {steps.length}
      </p>

      <ProgressBar steps={steps} currentStep={safeIndex} />

      <StepField
        key={safeIndex}
        step={step}
        onChangeValue={handleChangeValue}
      />

      <nav className="buttons" aria-label="Form navigation">
        <button
          onClick={handlePrevious}
          disabled={isFirst}
          aria-label="Go to previous step"
        >
          Back
        </button>
        {isLast ? (
          <button
            className="primary"
            disabled={!step.valid}
            onClick={handleSubmit}
            aria-label="Submit form"
          >
            Submit
          </button>
        ) : (
          <button
            className="primary"
            onClick={handleNext}
            disabled={!step.valid}
            aria-label="Go to next step"
          >
            Next
          </button>
        )}
      </nav>
    </main>
  );
}
