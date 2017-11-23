import React from 'react';
import { Route, IndexRoute } from 'react-router';

import AppComponent from './app';
import PrivateRoute from './shared/components/private-route/private-route';

if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable */
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/home/home');
  require('./modules/login/login');
  // require('./modules/account/settings');
  // require('./modules/account/password');
  // require('./modules/administration/gateway/gateway');
  require('./modules/administration/logs/logs');
  require('./modules/administration/health/health');
  require('./modules/administration/metrics/metrics');
  // require('./modules/administration/user-management/user-management');
  require('./modules/administration/configuration/configuration');
  require('./modules/administration/audits/audits');
  require('./modules/administration/docs/docs');
  /* eslint-enable */
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (onLogout) => {
  return (
    <Route path="/" component={AppComponent}>
      <IndexRoute
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/home/home').default);
          });
        }}
      />
      <routes
        path="/login"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/login/login').default);
          });
        }}
      />
      <Route
        path="/logout"
        onEnter={onLogout}
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/login/login').default);
          });
        }}
      />
      {/*
      <Route
        path="/account/settings"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/account/settings/settings').default));
          });
        }}
      />
      <Route
        path="/account/password"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/account/password/password').default));
          });
        }}
      />
      <Route
        path="/admin/gateway"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/gateway/gateway').default));
          });
        }}
      />*/}
      <Route
        path="/admin/user-management"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/user-management/user-management').default));
          });
        }}
      />
      
      <Route
        path="/admin/metrics"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/metrics/metrics').default));
          });
        }}
      />
      <Route
        path="/admin/metrics-detail"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/administration/metrics/metrics-detail/metrics-detail').default);
          });
        }}
      />
      <Route
        path="/admin/health"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/health/health').default));
          });
        }}
      />
      <Route
        path="/admin/health-detail"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, require('./modules/administration/health/health-detail/health-detail').default);
          });
        }}
      />
      <Route
        path="/admin/configuration"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/configuration/configuration').default));
          });
        }}
      />
      <Route
        path="/admin/audits"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/audits/audits').default));
          });
        }}
      />
      <Route
        path="/admin/logs"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/logs/logs').default));
          });
        }}
      />
      <Route
        path="/admin/docs"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/docs/docs').default));
          });
        }}
      />
      <Route
        path="/admin/dashboard"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/dashboard/index').default));
          });
        }}
      />
      <Route
        path="/admin/courses"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/course/index').default));
          });
        }}
      />
      <Route
        path="/admin/course(/:id)"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/course/form').default));
          });
        }}
      />
      <Route
        path="/admin/user(/:id)"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/user-management/form').default));
          });
        }}
      />
      <Route
        path="/admin/events"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/events/index').default));
          });
        }}
      />
      <Route
        path="/admin/event(/:id)"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/events/form').default));
          });
        }}
      />
      <Route
        path="/admin/grades"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/grade/index').default));
          });
        }}
      />
      <Route
        path="/admin/grade(/:id)"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/administration/grade/form').default));
          });
        }}
      />
      <Route
        path="/teacher/dashboard"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/teacher/dashboard/index').default));
          });
        }}
      />
      <Route
        path="/teacher/course/(:id)"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/teacher/course/index').default));
          });
        }}
      />
      <Route
        path="/teacher/course/(:id)/notes"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/teacher/notes/load').default));
          });
        }}
      />
      <Route
        path="/teacher/course/:courseId/message(/:id)"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./shared/components/messages/form').default));
          });
        }}
      />
      <Route
        path="/teacher/course/:courseId/assitence"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./shared/components/messages/form').default));
          });
        }}
      />
      <Route
        path="/user/dashboard"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/user/dashboard/index').default));
          });
        }}
      />
      <Route
        path="/user/events"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/user/event/index').default));
          });
        }}
      />
      <Route
        path="/user/mail"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./shared/components/messages/index2').default));
          });
        }}
      />
       <Route
        path="/teacher/mail"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./shared/components/messages/index2').default));
          });
        }}
      />
      <Route
        path="/user/event/:eventId/eventDetail(/:id)"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/user/event/form').default));
          });
        }}
      />
      <Route
        path="/user/course/:courseId/message(/:id)"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./shared/components/messages/form').default));
          });
        }}
      />
      <Route
        path="/user/course/(:id)"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/user/course/index').default));
          });
        }}
      />
      <Route
        path="/user/courses/"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/user/courses/index').default));
          });
        }}
      />
      <Route
        path="/teacher/assitence/"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/teacher/assitence/index').default));
          });
        }}
      />
      <Route
        path="/teacher/course/:courseId/materials"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/teacher/material/index').default));
          });
        }}
      />
    <Route
        path="/teacher/course/:courseId/material(/:materialId)"
        getComponent={(nextState, cb) => {
          require.ensure([], (require) => {
            cb(null, PrivateRoute(require('./modules/teacher/material/form').default));
          });
        }}
      />
    <Route
      path="/teacher/course/:courseId/material"
      getComponent={(nextState, cb) => {
        require.ensure([], (require) => {
          cb(null, PrivateRoute(require('./modules/user/videos/index').default));
        });
      }}
    />
    </Route>
  );
};
