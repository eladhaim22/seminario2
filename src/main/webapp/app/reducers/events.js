const FETCH = 'events/fetch';
const FETCH_EVENTS_SUCCESS = 'events/fetch_events_success';
const FETCH_EVENTS_FAIL = 'events/fetch_events_fail';
const FETCH_ALL_EVENTS_SUCCESS = 'events/fetch_all_events_fail';
const FETCH_ALL_EVENTS_FAIL = 'events/fetch_all_events_fail';
const FETCH_EVENTS_BY_GRADE_SUCCESS = 'events/fetch_events_by_grade_success';
const FETCH_EVENTS_BY_GRADE_FAIL = 'events/fetch_events_by_grade_fail';
const initialState = {
  loading: false,
  events:[],
  allEvents:[],
  eventsByGrade:[]
};

// Reducer


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        loading: true
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.result.data,
        loading: false
      };
    case FETCH_EVENTS_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: action.error.data
      };
    case FETCH_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        allEvents: action.result.data,
        loading: false
      };
    case FETCH_ALL_EVENTS_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: action.error.data
      };
    case FETCH_EVENTS_BY_GRADE_SUCCESS:
      return {
        ...state,
        eventsByGrade: action.result.data,
        loading: false
      };
    case FETCH_EVENTS_BY_GRADE_FAIL:
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
export function getAllEvents(){
  return {
    types: [FETCH, FETCH_ALL_EVENTS_SUCCESS, FETCH_ALL_EVENTS_FAIL],
    promise: events => events.get('/api/event/')
  };
}

export function getEvents() {
  return {
    types: [FETCH, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAIL],
    promise: events => events.get('/api/event/detail/')
  };
}

export function getAllEventsByGrade(){
 return {
    types: [FETCH, FETCH_EVENTS_BY_GRADE_SUCCESS, FETCH_EVENTS_BY_GRADE_FAIL],
    promise: events => events.get('/api/event/eventByGrade/')
  }; 
}