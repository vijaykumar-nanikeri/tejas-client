import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Claim {
  claim: string;
  claimType: string;
  evidenceChecklist: string[];
}

export interface ClaimsState {
  claims: Claim[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ClaimsState = {
  claims: [],
  isLoading: false,
  error: null,
};

const claimsSlice = createSlice({
  name: "claims",
  initialState,
  reducers: {
    setClaims: (state, action: PayloadAction<Claim[]>) => {
      state.claims = action.payload;
      state.error = null;
    },
    addClaim: (state, action: PayloadAction<Claim>) => {
      state.claims.push(action.payload);
    },
    updateClaim: (
      state,
      action: PayloadAction<{ index: number; claim: Claim }>
    ) => {
      const { index, claim } = action.payload;
      if (index >= 0 && index < state.claims.length) {
        state.claims[index] = claim;
      }
    },
    removeClaim: (state, action: PayloadAction<number>) => {
      const index = action.payload;
      if (index >= 0 && index < state.claims.length) {
        state.claims.splice(index, 1);
      }
    },
    clearClaims: (state) => {
      state.claims = [];
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setClaims,
  addClaim,
  updateClaim,
  removeClaim,
  clearClaims,
  setLoading,
  setError,
} = claimsSlice.actions;

export default claimsSlice.reducer;
