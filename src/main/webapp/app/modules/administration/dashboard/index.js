import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import _ from 'lodash';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  gridList: {
    width: 500,
    overflowY: 'auto',
  },
};

export default class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    return (
      <div style={{marginTop:'10px'}}>
        <div className="row">
            <div className="col-md-4">
              <Link to='/admin/user-management'>
                  <div className="widget" style={{height:'150px'}}>
                    <header className="widget-header">
                      <h4 className="widget-title pull-left">Usuarios</h4>
                    </header>
                    <hr className="widget-separator"/>
                    <div className="widget-body clearfix">
                      <div className="pull-left">
                        <sapn>Administracion de usuarios</sapn>
                      </div>
                      <div className="pull-right">
                        <div className="m-t-md" data-plugin="sparkline" data-options="[8,12,4,12,10,13,16], { type: 'bar', chartRangeMin:0, height: 45, barColor: '#188ae2', barWidth: 8, barSpacing: 5 }"><canvas width="86" height="45" style={{display: 'inline-block', width: '86px', height: '45px', verticalAlign: 'top'}}></canvas></div>
                      </div>
                    </div>
                  </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to="/admin/courses">
                <div className="widget" style={{height:'150px'}}>
                    <header className="widget-header">
                      <h4 className="widget-title pull-left">Materias</h4>
                    </header>
                    <hr className="widget-separator"/>
                    <div className="widget-body clearfix">
                      <div className="pull-left">
                        <sapn>Administracion de materias</sapn>
                      </div>
                      <div className="pull-right">
                        <div className="m-t-md" data-plugin="sparkline" data-options="[8,12,4,12,10,13,16], { type: 'bar', chartRangeMin:0, height: 45, barColor: '#188ae2', barWidth: 8, barSpacing: 5 }"><canvas width="86" height="45" style={{display: 'inline-block', width: '86px', height: '45px', verticalAlign: 'top'}}></canvas></div>
                      </div>
                    </div>
                  </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to={'/admin/events/'}>
                <div className="widget" style={{height:'150px'}}>
                    <header className="widget-header">
                      <h4 className="widget-title pull-left">Actividades</h4>
                    </header>
                    <hr className="widget-separator"/>
                    <div className="widget-body clearfix">
                      <div className="pull-left">
                        <sapn>Administracion de actividades</sapn>
                      </div>
                      <div className="pull-right">
                        <div className="m-t-md" data-plugin="sparkline" data-options="[8,12,4,12,10,13,16], { type: 'bar', chartRangeMin:0, height: 45, barColor: '#188ae2', barWidth: 8, barSpacing: 5 }"><canvas width="86" height="45" style={{display: 'inline-block', width: '86px', height: '45px', verticalAlign: 'top'}}></canvas></div>
                      </div>
                    </div>
                  </div>
              </Link>
            </div>
            <div className="col-md-4">
              <Link to={'/admin/grades/'}>
                <div className="widget" style={{height:'150px'}}>
                  <header className="widget-header">
                    <h4 className="widget-title pull-left">Grados</h4>
                  </header>
                  <hr className="widget-separator"/>
                  <div className="widget-body clearfix">
                    <div className="pull-left">
                      <sapn>Administracion de grados</sapn>
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
