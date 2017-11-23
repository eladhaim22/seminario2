import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import { getSession } from '../../../reducers/authentication';
import { getCourseById } from '../../../reducers/course'
import { setDropDownValue } from '../../../reducers/messages';
import { _ } from 'lodash';
import IconButton from 'material-ui/IconButton';

export class Course extends Component {
    
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getCourseById(this.props.params.id);
  }

  goToMail = () => {
    let value = {};
    value.id = this.props.course.id;
    value.name = this.props.course.name;
    this.props.setDropDownValue(value);
    this.props.router.push('/teacher/mail/');
  }

  render() {
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    const noteStyle = {position: 'absolute',fontSize: '60px',left: '0px',right: '0px',textAlign: 'center',top: 'calc(50% - 30px)'}
    return (
      <div style={{marginTop:'10px'}}>
        <div className="row">
            <div className="col-md-4">
              <Link to={'/teacher/course/' + this.props.course.id + '/notes'}>
                <div className="widget" style={{height:'150px'}}>
                  <header className="widget-header">
                    <h4 className="widget-title pull-left">Notas</h4>
                  </header>
                  <hr className="widget-separator"/>
                  <div className="widget-body clearfix">
                    <div className="pull-left">
                        <sapn>Cargar notas parciales y finales</sapn>
                    </div>
                    <div className="pull-right">
                      <div className="m-t-md" data-plugin="sparkline" data-options="[8,12,4,12,10,13,16], { type: 'bar', chartRangeMin:0, height: 45, barColor: '#188ae2', barWidth: 8, barSpacing: 5 }"><canvas width="86" height="45" style={{display: 'inline-block', width: '86px', height: '45px', verticalAlign: 'top'}}></canvas></div>
                    </div>
                  </div>
                </div>
              </Link>
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
              <Link to={'/teacher/course/' + this.props.params.id + '/materials' }>
              <div className="widget" style={{height:'150px'}}>
                <header className="widget-header">
                  <h4 className="widget-title pull-left">Material de estudio</h4>
                </header>
                <hr className="widget-separator"/>
                <div className="widget-body clearfix">
                  <div className="pull-left">
                      <sapn>Administra los videos associados a la materia</sapn>
                  </div>
                  <div className="pull-right">
                    <div className="m-t-md" data-plugin="sparkline" data-options="[8,12,4,12,10,13,16], { type: 'bar', chartRangeMin:0, height: 45, barColor: '#188ae2', barWidth: 8, barSpacing: 5 }"><canvas width="86" height="45" style={{display: 'inline-block', width: '86px', height: '45px', verticalAlign: 'top'}}></canvas></div>
                  </div>
                </div>
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
  { getCourseById ,setDropDownValue}
)(Course);
