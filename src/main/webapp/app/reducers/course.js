const FETCH = 'courses/FETCH';
const FETCH_SUCCESS = 'courses/FETCH_SUCCESS';
const FETCH_FAIL = 'courses/FETCH_FAIL';
const FETCH_COURSES_SUCCESS = 'courses/FETCH_COURSES_SUCCESS';
const FETCH_COURSES_FAIL = 'courses/FETCH_COURSES_FAIL';

const initialState = {
  loading: false,
  course: {},
  courses:[]
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
       case FETCH_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.result.data,
        loading: false
      };
    case FETCH_COURSES_FAIL:
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

export function getCourses() {
  return {
    types: [FETCH, FETCH_COURSES_SUCCESS, FETCH_COURSES_FAIL],
    promise: courses => courses.get('/api/course/getAllByUser')
  };
}

