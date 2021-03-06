const FETCH_INBOX = 'messages/FETCH_INBOX';
const FETCH_INBOX_SUCCESS = 'messages/FETCH_INBOX_SUCCESS';
const FETCH_INBOX_FAIL = 'messages/FETCH_INBOX_FAIL';
const FETCH_OUTBOX = 'messages/FETCH_OUTBOX';
const FETCH_OUTBOX_SUCCESS = 'messages/FETCH_OUTBOX_SUCCESS';
const FETCH_OUTBOX_FAIL = 'messages/FETCH_OUTBOX_FAIL';
const SET_DROPDOWN_VALUE = 'messages/SET_DROPDOWN_VALUE';
const GET_DROPDOWN_VALUE = 'messages/GET_DROPDOWN_VALUE';

const initialState = {
  loading: false,
  inbox: [],
  outbox:[],
  dropdownValue:undefined
};

// Reducer


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_INBOX:
      return {
        ...state,
        loading: true
      };
    case FETCH_INBOX_SUCCESS:
      return {
        ...state,
        inbox: action.result.data,
        loading: false
      };
    case FETCH_INBOX_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: action.error.data
      };
    case FETCH_OUTBOX:
      return {
        ...state,
        loading: true
      };
    case FETCH_OUTBOX_SUCCESS:
      return {
        ...state,
        outbox: action.result.data,
        loading: false
      };
    case FETCH_OUTBOX_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: action.error.data
      };
    case SET_DROPDOWN_VALUE:
     return {
        ...state,
        dropdownValue: action.data,
        loading: false
      };
    case GET_DROPDOWN_VALUE:
     return {
        ...state,
        dropdownValue: state.dropdownValue,
        loading: false
      };
    default:
      return state;
  }
}

// Actions

export function getInbox() {
  return {
    types: [FETCH_INBOX, FETCH_INBOX_SUCCESS, FETCH_INBOX_FAIL],
    promise: messages => messages.get('/api/messageDetail/inbox/')
  };
}

export function getOutbox() {
  return {
    types: [FETCH_OUTBOX, FETCH_OUTBOX_SUCCESS, FETCH_OUTBOX_FAIL],
    promise: messages => messages.get('/api/messageDetail/outbox/')
  };
}

export function setDropDownValue(value){
  return function (dispatch){
    dispatch({type: SET_DROPDOWN_VALUE,data:value});
  }
}

export function getDropDownValue(){
  return function (dispatch,state){
    dispatch({type: GET_DROPDOWN_VALUE});
  }
}1