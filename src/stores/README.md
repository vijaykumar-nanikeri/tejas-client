# Redux Store Documentation

This directory contains the Redux store configuration for the Tejas application.

## Structure

```
stores/
├── index.ts              # Main store configuration
├── hooks.ts              # Typed Redux hooks
├── slices/
│   └── claimsSlice.ts    # Claims state management
└── README.md             # This file
```

## Store Configuration

The main store is configured in `index.ts` and includes:

- Claims slice for managing parsed claims data
- TypeScript support with proper typing

## Slices

### Claims Slice (`claimsSlice.ts`)

Manages the state for parsed claims from file uploads.

**State Interface:**

```typescript
interface ClaimsState {
  claims: Claim[];
  isLoading: boolean;
  error: string | null;
}

interface Claim {
  claim: string;
  claimType: string;
  evidenceChecklist: string[];
}
```

**Actions:**

- `setClaims(claims: Claim[])` - Set all claims
- `addClaim(claim: Claim)` - Add a single claim
- `updateClaim({ index, claim })` - Update a specific claim
- `removeClaim(index: number)` - Remove a claim by index
- `clearClaims()` - Clear all claims
- `setLoading(loading: boolean)` - Set loading state
- `setError(error: string)` - Set error message

## Usage

### In Components

```typescript
import { useAppDispatch, useAppSelector } from 'src/stores/hooks';
import { setClaims, setLoading, setError } from 'src/stores/slices/claimsSlice';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { claims, isLoading, error } = useAppSelector((state) => state.claims);

  // Dispatch actions
  dispatch(setClaims(parsedClaims));
  dispatch(setLoading(true));
  dispatch(setError('Error message'));

  return (
    // Component JSX
  );
};
```

### Provider Setup

The Redux Provider is already set up in `AppProviders.tsx` and wraps the entire application.

## Integration Points

1. **FileSelection Component**: Parses claims and stores them in Redux
2. **EvidenceChecklist Component**: Reads claims from Redux and displays them
3. **Petition Component**: No longer manages claims state locally

## Benefits

- Centralized state management
- Type-safe operations with TypeScript
- Easy state persistence and debugging
- Cleaner component architecture
- Better separation of concerns
