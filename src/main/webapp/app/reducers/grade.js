const FETCH = 'grades/FETCH';
const FETCH_SUCCESS = 'grades/FETCH_SUCCESS';
const FETCH_FAIL = 'grades/FETCH_FAIL';

const initialState = {
  loading: false,
  grades:[]
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
        grades: action.result.data,
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

export function getGrades() {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: courses => courses.get('/api/grade/')
  };
}

