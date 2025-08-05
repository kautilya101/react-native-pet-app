// context/AppContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';

export type PetData = {
  image: string | null;
  petName: string;
  breed: string;
  age?: string;
};

type State = {
  submissions: PetData[];
  currentForm: PetData;
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: State = {
  submissions: [],
  currentForm: {
    image: null,
    petName: '',
    breed: '',
    age: '',
  },
  loading: false,
  error: null,
  success: false,
};

type Action =
  | { type: 'SET_IMAGE'; payload: string }
  | { type: 'SET_FORM'; payload: Partial<PetData> }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_ERROR'; payload: string }
  | { type: 'SAVE_SUBMISSION' }
  | { type: 'RESET_FORM' }
  | { type: 'RESET_ALL' };


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_IMAGE':
      return {
        ...state,
        currentForm: { ...state.currentForm, image: action.payload },
      };
    case 'SET_FORM':
      return {
        ...state,
        currentForm: { ...state.currentForm, ...action.payload },
      };
    case 'SUBMIT_START':
      return { ...state, loading: true, error: null, success: false };
    case 'SUBMIT_SUCCESS':
      return { ...state, loading: false, success: true };
    case 'SUBMIT_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SAVE_SUBMISSION':
      return {
        ...state,
        submissions: [...state.submissions, state.currentForm],
      };
    case 'RESET_FORM':
      return {
        ...state,
        currentForm: {
          image: null,
          petName: '',
          breed: '',
          age: '',
        },
        loading: false,
        error: null,
        success: false,
      };
    case 'RESET_ALL':
      return initialState;
    default:
      return state;
  }
}

export const PetContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PetContext.Provider value={{ state, dispatch }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = () => {
  const ctx = useContext(PetContext);
  if (!ctx) throw new Error("useAppContext must be used within AppProvider");
  return ctx;
};
