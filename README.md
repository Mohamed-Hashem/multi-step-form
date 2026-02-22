# Multi-Step Form — Redux Toolkit Assessment

A multi-step form built with **React**, **TypeScript**, **Redux Toolkit**, and **Vite**.

🔗 **GitHub:** [github.com/Mohamed-Hashem/multi-step-form](https://github.com/Mohamed-Hashem/multi-step-form)
🌐 **Live Demo:** [multi-step-form-signit.vercel.app](https://multi-step-form-signit.vercel.app/)

---

## Task Requirements

1. An array of **3 steps**, each with: `value`, `label`, `placeholder`, `type`, `name`, and a `valid` / `invalid` flag.
2. Two buttons — **Next** and **Back**.
3. The **Next** button is disabled when the current step is invalid.
4. The **Back** button is disabled on the first step.
5. Clicking **Next** advances to the next step; clicking **Back** returns to the previous step.
6. The input is validated based on its `type` (e.g. email format, phone number format).
7. The user can see the current step and total steps (e.g. "Step 1 of 3").
8. On the last step, **Submit** resets the form and returns to step 1.

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

**Four reducers:**

| Action        | What it does                                             |
| ------------- | -------------------------------------------------------- |
| `next`        | Increments `currentStep` (clamped to last step)          |
| `previous`    | Decrements `currentStep` (clamped to first step)         |
| `updateValue` | Sets the step's `value` and re-validates based on `type` |
| `reset`       | Resets entire form state to `initialState`               |

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
- Uses safe index clamping to prevent out-of-bounds access.
- Renders the current step's input field with its label and placeholder.
- A **progress bar** shows completed/active segments.
- A **step indicator** displays "Step X of 3".
- **Back** button dispatches `previous()` — disabled when `currentStep === 0`.
- **Next** button dispatches `next()` — disabled when `step.valid === false`.
- On the last step, the Next button becomes **Submit** — dispatches `reset()` after submission.
- Inline validation error appears when the user has typed but the value is invalid.

### Performance Optimizations

- **`React.memo`** on `ProgressBar` and `StepField` to skip unnecessary re-renders.
- **`useCallback`** on all dispatch wrappers so memoized children receive stable props.
- **Code splitting** with `React.lazy` — the Steps component is loaded on demand.
- **`<Suspense>`** with a Loading fallback while the lazy chunk loads.
- **React Profiler** wraps the app to log mount/update timings in development.
- **Proper keys** using `step.name` (not array index) for list rendering.

### Accessibility

- `<main role="main">` landmark wrapping the form.
- `<nav aria-label="Form navigation">` for the button group.
- `aria-label` on all interactive buttons.
- `<label htmlFor>` associated with each input.
- Visually hidden `<h1>` in the Loading fallback for screen readers.
- `role="status"` on the loading text for live region announcements.

### Dev Tools (development only)

Loaded lazily via dynamic `import()` — zero impact on production bundle:

- **React Scan** — highlights renders in the browser.
- **Why Did You Render** — logs unnecessary re-renders to console.
- **@axe-core/react** — runtime accessibility audit in the console.

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
│   └── store.ts                # Redux store configuration
├── features/
│   ├── Loading/
│   │   ├── index.tsx           # Loading spinner component
│   │   └── Loading.css         # Loading spinner styles
│   └── steps/
│       ├── stepSlice.ts        # Slice: state, reducers, validators
│       └── index.tsx           # Steps form UI component
├── hooks/
│   └── reduxHooks.ts           # Typed useDispatch / useSelector
├── App.tsx                     # Root component (Profiler + Suspense + lazy)
├── main.tsx                    # Entry point with <Provider> and dev tools
├── wdyr.ts                     # Why Did You Render configuration
└── index.css                   # Global styles
```

---

## Linting & Security

ESLint flat config with:

- **typescript-eslint** — TypeScript-aware rules
- **eslint-plugin-react-hooks** — enforces Rules of Hooks
- **eslint-plugin-react-refresh** — validates Fast Refresh compatibility
- **eslint-plugin-jsx-a11y** — accessibility linting for JSX
- **eslint-plugin-security** — detects common security anti-patterns
- **eslint-plugin-react-security** — blocks `dangerouslySetInnerHTML`

```bash
npm run lint     # 0 errors, 0 warnings
npm audit        # 0 vulnerabilities
npx knip         # no unused code or dependencies
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

# Lint the codebase
npm run lint
```

---

## Tech Stack

- **React 19** + **TypeScript 5.9**
- **Redux Toolkit 2** for state management
- **Vite 7** for development and bundling
- **ESLint 10** with security + accessibility plugins
