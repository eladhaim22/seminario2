import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import locale from './locale';
import authentication from './authentication';
import administration from './administration';
import dashboard from './dashboard';
import courseDetail from './courseDetail';
import course from './course';

export default combineReducers({
  authentication,
  locale,
  routing,
  administration,
  dashboard,
  courseDetail,
  course
});
