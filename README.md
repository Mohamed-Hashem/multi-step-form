# Multi-Step Form — Redux Toolkit Assessment

A multi-step form built with **React**, **TypeScript**, **Redux Toolkit**, and **Vite**.

---

## Task Requirements

1. An array of **3 steps**, each with: `value`, `label`, `placeholder`, `type`, `name`, and a `valid` / `invalid` flag.
2. Two buttons — **Next** and **Back**.
3. The **Next** button is disabled when the current step is invalid.
4. The **Back** button is disabled on the first step.
5. Clicking **Next** advances to the next step; clicking **Back** returns to the previous step.
6. The input is validated based on its `type` (e.g. email format, phone number format).
7. The user can see the current step and total steps (e.g. "Step 1 of 3").

---

## How It Works

### State Management (`stepSlice.ts`)

All form state lives in a single Redux Toolkit slice:

```ts
interface StepsState {
  currentStep: number; // index of the active step (0–2)
  steps: StepItem[]; // array of 3 step objects
}
```

Each step object holds:

| Field         | Purpose                                            |
| ------------- | -------------------------------------------------- |
| `value`       | Current input value (controlled component)         |
| `label`       | Display label above the input                      |
| `placeholder` | Input placeholder text                             |
| `type`        | `"text"` · `"email"` · `"tel"` — drives validation |
| `name`        | HTML `name` / `id` attribute                       |
| `valid`       | Whether the current value passes validation        |

**Three reducers:**

| Action        | What it does                                             |
| ------------- | -------------------------------------------------------- |
| `next`        | Increments `currentStep` (clamped to last step)          |
| `previous`    | Decrements `currentStep` (clamped to first step)         |
| `updateValue` | Sets the step's `value` and re-validates based on `type` |

**Validation rules** (applied on every keystroke via `updateValue`):

- **text** — non-empty after trimming
- **email** — regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
- **tel** — regex: `^\+?\d{7,15}$` (after stripping spaces/dashes)

### The 3 Steps

| #   | Label         | Type    | Example valid input |
| --- | ------------- | ------- | ------------------- |
| 1   | Full Name     | `text`  | `John Doe`          |
| 2   | Email Address | `email` | `john@example.com`  |
| 3   | Phone Number  | `tel`   | `+1234567890`       |

### UI Component (`features/steps/index.tsx`)

- Reads `currentStep` and `steps` from the Redux store via `useAppSelector`.
- Renders the current step's input field with its label and placeholder.
- A **progress bar** shows completed/active segments.
- A **step indicator** displays "Step X of 3".
- **Back** button dispatches `previous()` — disabled when `currentStep === 0`.
- **Next** button dispatches `next()` — disabled when `step.valid === false`.
- On the last step, the Next button becomes **Submit**.
- Inline validation error appears when the user has typed but the value is invalid.

### Store (`app/store.ts`)

```ts
export const store = configureStore({
  reducer: {
    Steps: stepsReducer,
  },
});
```

Typed hooks (`useAppDispatch`, `useAppSelector`) are in `hooks/reduxHooks.ts`.

---

## Project Structure

```
src/
├── app/
│   └── store.ts            # Redux store configuration
├── features/
│   └── steps/
│       ├── stepSlice.ts     # Slice: state, reducers, validators
│       └── index.tsx        # Steps form UI component
├── hooks/
│   └── reduxHooks.ts       # Typed useDispatch / useSelector
├── App.tsx                  # Root component (renders <Steps />)
├── main.tsx                 # Entry point with <Provider>
└── index.css                # Global styles
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

---

## Tech Stack

- **React 19** + **TypeScript 5.9**
- **Redux Toolkit 2** for state management
- **Vite 7** for development and bundling
