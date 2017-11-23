import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../../reducers/authentication';
import { getCourseDetail } from '../../../reducers/courseDetail';
import { getCourseById } from '../../../reducers/course';
import { setDropDownValue } from '../../../reducers/messages';
import { _ } from 'lodash';



export class CourseDetail extends Component {
  
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCourseDetail(this.props.params.id);
    this.props.getCourseById(this.props.params.id);
  }

  goToMail = () => {
    let value = {};
    value.id = this.props.course.id;
    value.name = this.props.course.name;
    this.props.setDropDownValue(value);
    this.props.router.push('/user/mail/');
  }

  render() {
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    const noteStyle = {position: 'absolute',fontSize: '60px',left: '0px',right: '0px',textAlign: 'center',top: 'calc(50% - 30px)'}
    return (
      <div>
        <div className="col-md-12" style={{marginBottom:'15px'}}>
          <h2>
            {this.props.course.name}
          </h2>
        </div>
        <div className="col-md-4">
          <div className="widget" style={{height:'150px'}}>
          <header className="widget-header">
            <h4 className="widget-title">Notas</h4>
          </header>
          <hr className="widget-separator"/>
          <div className="widget-body row">
            <div className="col-xs-6">
              <div className="text-center" style={{borderRight: '2px solid #eee'}}>
                 <div style={{paddingBottom: '9px'}}>Nota parcial</div>
                 <h4 data-plugin="counterUp">{this.props.courseDetail.note ? this.props.courseDetail.note : '-'}</h4>
              </div>
            </div>
            <div className="col-xs-6">
              <div className="text-center">
                  <div style={{paddingBottom: '9px'}}>Nota final</div>
                 <h4 data-plugin="counterUp">{this.props.courseDetail.finalNote ? this.props.courseDetail.finalNote : '-'}</h4>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="col-md-4" onClick={this.goToMail}>
          <div className="widget" style={{height:'150px'}}>
            <header className="widget-header">
              <h4 className="widget-title pull-left">Mensajes</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body clearfix">
              <div className="pull-left">
                  <sapn>Administra los mensajes entrants y salientes de la materia</sapn>
              </div>
              <div className="pull-right">
                <div className="m-t-md" data-plugin="sparkline" data-options="[8,12,4,12,10,13,16], { type: 'bar', chartRangeMin:0, height: 45, barColor: '#188ae2', barWidth: 8, barSpacing: 5 }"><canvas width="86" height="45" style={{display: 'inline-block', width: '86px', height: '45px', verticalAlign: 'top'}}></canvas></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <Link to={"/user/course/" + this.props.params.id + '/material'}>
          <div className="widget" style={{height:'150px'}}>
            <header className="widget-header">
              <h4 className="widget-title pull-left">Clases</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body clearfix">
              <div className="pull-left">
                  <sapn>Clases grabadas para los que olvidaron!</sapn>
              </div>
              <div className="pull-right">
                <div className="m-t-md" data-plugin="sparkline" data-options="[8,12,4,12,10,13,16], { type: 'bar', chartRangeMin:0, height: 45, barColor: '#188ae2', barWidth: 8, barSpacing: 5 }"><canvas width="86" height="45" style={{display: 'inline-block', width: '86px', height: '45px', verticalAlign: 'top'}}></canvas></div>
              </div>
            </div>
          </div>
          </Link>
        </div>
         <div className="col-md-4">
          <div className="widget" style={{height:'150px'}}>
            <header className="widget-header">
              <h4 className="widget-title pull-left">Material de estudio</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body clearfix">
              <div className="pull-left">
                <sapn>Material de apoyo y ayuda escolar</sapn>
              </div>
              <div className="pull-right">
                <div className="m-t-md" data-plugin="sparkline" data-options="[8,12,4,12,10,13,16], { type: 'bar', chartRangeMin:0, height: 45, barColor: '#188ae2', barWidth: 8, barSpacing: 5 }"><canvas width="86" height="45" style={{display: 'inline-block', width: '86px', height: '45px', verticalAlign: 'top'}}></canvas></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="widget" style={{height:'150px'}}>
            <header className="widget-header">
              <h4 className="widget-title pull-left">Tares</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body clearfix">
              <div className="pull-left">
                <sapn>Trabjos practicos e ejercicios, todo online!</sapn>
              </div>
              <div className="pull-right">
                <div className="m-t-md" data-plugin="sparkline" data-options="[8,12,4,12,10,13,16], { type: 'bar', chartRangeMin:0, height: 45, barColor: '#188ae2', barWidth: 8, barSpacing: 5 }"><canvas width="86" height="45" style={{display: 'inline-block', width: '86px', height: '45px', verticalAlign: 'top'}}></canvas></div>
              </div>
            </div>
          </div>
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
  { getCourseDetail , getCourseById , setDropDownValue}
)(CourseDetail);

