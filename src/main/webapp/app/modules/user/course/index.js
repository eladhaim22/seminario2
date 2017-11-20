import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../../reducers/authentication';
import { getCourseDetail } from '../../../reducers/courseDetail'
import { getCourseById } from '../../../reducers/course'
import { _ } from 'lodash';



export class CourseDetail extends Component {
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCourseDetail(this.props.params.id);
    this.props.getCourseById(this.props.params.id);
  }
  render() {
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    const noteStyle = {position: 'absolute',fontSize: '60px',left: '0px',right: '0px',textAlign: 'center',top: 'calc(50% - 30px)'}
    return (
      <div>
        <div className="row">
          <h2>
            {this.props.course.name}
          </h2>
        </div>
        <div className="col-md-3 col-sm-6">
            <div className="widget stats-widget">
              <div className="widget-body clearfix">
                <div className="pull-left">
                  <h3 className="widget-title text-primary"><span className="counter" data-plugin="counterUp">Nota</span></h3>
                  <medium className="text-color">{this.props.courseDetail.note ? this.props.courseDetail.note : '?'}</medium>
                </div>
                <span className="pull-right big-icon watermark"><i className="fa fa-file-text-o"></i></span>
              </div>
              <footer className="widget-footer bg-primary">
                <small></small>
                <span className="small-chart pull-right" data-plugin="sparkline" data-options="[4,3,5,2,1], { type: 'bar', barColor: '#ffffff', barWidth: 5, barSpacing: 2 }"><canvas width="33" height="16" style={{display: 'inline-block', width: '33px', height: '16px', verticalAlign: 'top'}}></canvas></span>
              </footer>
            </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <Link to={'/user/course/' + this.props.course.id + '/messages'}>
            <div className="widget stats-widget">
              <div className="widget-body clearfix">
                <div className="pull-left">
                  <h3 className="widget-title text-primary"><span className="counter" data-plugin="counterUp">mensajes</span></h3>
                  <small className="text-color">Administracion de mensajes</small>
                </div>
                <span className="pull-right big-icon watermark"><i className="fa fa-file-text-o"></i></span>
              </div>
              <footer className="widget-footer bg-primary">
                <span className="small-chart pull-right" data-plugin="sparkline" data-options="[4,3,5,2,1], { type: 'bar', barColor: '#ffffff', barWidth: 5, barSpacing: 2 }"><canvas width="33" height="16" style={{display: 'inline-block', width: '33px', height: '16px', verticalAlign: 'top'}}></canvas></span>
              </footer>
            </div>
          </Link>
        </div>
      </div>
    );
  }
}

export default connect(
  store => ({
    courseDetail: store.courseDetail.courseDetail,
    course: store.course.course
  }),
  { getCourseDetail , getCourseById }
)(CourseDetail);
