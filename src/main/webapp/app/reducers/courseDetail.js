import _ from 'lodash';
const FETCH_COURSE_DETAIL = 'courseDetail/FETCH_COURSE_DETAIL';
const FETCH_COURSE_DETAIL_SUCCESS = 'courseDetail/FETCH_COURSE_DETAIL_SUCCESS';
const FETCH_COURSE_DETAIL_FAIL = 'courseDetail/FETCH_COURSE_DETAIL_FAIL';

const FETCH_COURSES_DETAIL = 'courseDetail/FETCH_COURSES_DETAIL';
const FETCH_COURSES_DETAIL_SUCCESS = 'courseDetail/FETCH_COURSES_DETAIL_SUCCESS';
const FETCH_COURSES_DETAIL_FAIL = 'courseDetail/FETCH_COURSES_DETAIL_FAIL';

const POST_COURSES_DETAIL = "post_courses_detail";
const POST_COURSES_DETAIL_SUCCESS = "post_courses_detail_success";
const POST_COURSES_DETAIL_FAIL = "post_courses_detail_fail";

const initialState = {
  loading: false,
  courseDetail: {},
  coursesDetail: []
};

// Reducer


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSE_DETAIL:
      return {
        ...state,
        loading: true
      };
    case FETCH_COURSE_DETAIL_SUCCESS:
      return {
        ...state,
        courseDetail: action.result.data,
        loading: false
      };
    case FETCH_COURSE_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: action.error.data
      };
    case FETCH_COURSES_DETAIL:
      return {
        ...state,
        loading: true
      };
    case FETCH_COURSES_DETAIL_SUCCESS:
      let courseDetails = action.result[0].data;
      courseDetails.map((courseDetail) => courseDetail.student.user = _.find(action.result[1].data,function(user){return user.id == courseDetail.student.userId}));
      return {
        ...state,
        coursesDetail: courseDetails,
        loading: false
      };
    case FETCH_COURSES_DETAIL_FAIL:
      return {
        ...state,
        loading: false,
        errorMessage: action.error.data
      };
    case POST_COURSES_DETAIL:
      return {
        ...state,
        loading: true
      };
    case POST_COURSES_DETAIL_SUCCESS:
      let courseDetailsAfterPost = action.result[0].data;
      courseDetailsAfterPost.map((courseDetail) => courseDetail.student.user = _.find(action.result[1].data,function(user){return user.id == courseDetail.student.userId}));
      return {
        ...state,
        coursesDetail: courseDetailsAfterPost,
        loading: false
      };
    case POST_COURSES_DETAIL_FAIL:
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

export function getCourseDetail(courseId) {
  return {
    types: [FETCH_COURSE_DETAIL, FETCH_COURSE_DETAIL_SUCCESS, FETCH_COURSE_DETAIL_FAIL],
    promise: courses => courses.get('/api/courseDetail/byCourse/' + courseId)
  };
}

export function getCourseDetails(courseId) {
  return {
    types: [FETCH_COURSES_DETAIL, FETCH_COURSES_DETAIL_SUCCESS, FETCH_COURSES_DETAIL_FAIL],
    promise: courses => courses.all([courses.get('api/courseDetail/course/' + courseId),courses.get('/api/users')])
  };
}

export function saveAllCourseDetail(courseDetails){
  return{
    types: [POST_COURSES_DETAIL, POST_COURSES_DETAIL_SUCCESS,POST_COURSES_DETAIL_FAIL],
    promise: courses => courses.all([courses.post('api/courseDetail/saveAll', courseDetails),courses.get('/api/users')])
  };
}


