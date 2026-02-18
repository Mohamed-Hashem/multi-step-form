import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface StepItem {
  value: string;
  label: string;
  placeholder: string;
  type: "text" | "email" | "tel";
  name: string;
  valid: boolean;
}

interface StepsState {
  currentStep: number;
  steps: StepItem[];
}

const validators: Record<string, (value: string) => boolean> = {
  text: (v) => v.trim().length > 0,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  tel: (v) => /^\+?\d{7,15}$/.test(v.replace(/[\s-]/g, "")),
};

const initialState: StepsState = {
  currentStep: 0,
  steps: [
    {
      value: "",
      label: "Full Name",
      placeholder: "Enter your full name",
      type: "text",
      name: "fullName",
      valid: false,
    },
    {
      value: "",
      label: "Email Address",
      placeholder: "Enter your email",
      type: "email",
      name: "email",
      valid: false,
    },
    {
      value: "",
      label: "Phone Number",
      placeholder: "Enter your phone number",
      type: "tel",
      name: "phone",
      valid: false,
    },
  ],
};

const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    next: (state) => {
      if (state.currentStep < state.steps.length - 1) {
        state.currentStep += 1;
      }
    },
    previous: (state) => {
      if (state.currentStep > 0) {
        state.currentStep -= 1;
      }
    },
    updateValue: (
      state,
      action: PayloadAction<{ index: number; value: string }>,
    ) => {
      const { index, value } = action.payload;
      const step = state.steps[index];
      step.value = value;
      const validate = validators[step.type] ?? validators.text;
      step.valid = validate(value);
    },
  },
});

export const { next, previous, updateValue } = stepsSlice.actions;

export default stepsSlice.reducer;
