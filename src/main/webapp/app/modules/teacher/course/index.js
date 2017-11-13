import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import { getSession } from '../../../reducers/authentication';
import { getCourseById } from '../../../reducers/course'
import { _ } from 'lodash';
import IconButton from 'material-ui/IconButton';

export class Course extends Component {
    
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCourseById(this.props.params.id);
  }

  render() {
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    const noteStyle = {position: 'absolute',fontSize: '60px',left: '0px',right: '0px',textAlign: 'center',top: 'calc(50% - 30px)'}
    return (
      <div style={{marginTop:'10px'}}>
        <div className="row">
            <div className="col-md-3 col-sm-6">
              <Link to={'/teacher/course/' + this.props.course.id + '/notes'}>
                <div className="widget stats-widget">
                  <div className="widget-body clearfix">
                    <div className="pull-left">
                      <h3 className="widget-title text-primary"><span className="counter" data-plugin="counterUp">Notas</span></h3>
                      <small className="text-color">Administracion de notas</small>
                    </div>
                    <span className="pull-right big-icon watermark"><i className="fa fa-file-text-o"></i></span>
                  </div>
                  <footer className="widget-footer bg-primary">
                    <span className="small-chart pull-right" data-plugin="sparkline" data-options="[4,3,5,2,1], { type: 'bar', barColor: '#ffffff', barWidth: 5, barSpacing: 2 }"><canvas width="33" height="16" style={{display: 'inline-block', width: '33px', height: '16px', verticalAlign: 'top'}}></canvas></span>
                  </footer>
                </div>
              </Link>
            </div>
            <div className="col-md-3 col-sm-6">
              <Link to={'/teacher/course/' + this.props.course.id + '/messages'}>
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
      </div> 
    );
  }
}

export default connect(
  store => ({
    course: store.course.course
  }),
  { getCourseById }
)(Course);