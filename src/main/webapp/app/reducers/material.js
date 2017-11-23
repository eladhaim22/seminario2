const FETCH = 'material/FETCH';
const FETCH_SUCCESS = 'material/FETCH_SUCCESS';
const FETCH_FAIL = 'material/FETCH_FAIL';

const initialState = {
  loading: false,
  materials: []
};

// Reducer


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        loading: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        materials: action.result.data,
        loading: false
      };
    case FETCH_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: action.error.data
      };
    default:
      return state;
  }
}

// Actions

export function getMaterial() {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: material => material.get('/api/material/')
  };
}
