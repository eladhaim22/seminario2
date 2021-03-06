import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import locale from './locale';
import authentication from './authentication';
import administration from './administration';
import courseDetail from './courseDetail';
import course from './course';
import messages from './messages';
import events from './events';
import grade from './grade';
import material from './material';

export default combineReducers({
  authentication,
  locale,
  routing,
  administration,
  courseDetail,
  course,
  messages,
  events,
  grade,
  material
});
