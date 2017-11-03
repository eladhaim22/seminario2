const FETCH = 'courses/FETCH';
const FETCH_SUCCESS = 'courses/FETCH_SUCCESS';
const FETCH_FAIL = 'courses/FETCH_FAIL';

const initialState = {
  loading: false,
  course: {}
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
        course: action.result.data,
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

export function getCourseById(id) {
  return {
    types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
    promise: courses => courses.get('/api/course/' + id)
  };
}
