import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import _ from 'lodash';
import {SocialSchool} from 'material-ui/svg-icons';
import {GridList, GridTile} from 'material-ui/GridList';
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
            <div className="col-md-3 col-sm-6">
              <Link to='/admin/user-management'>
                <div className="widget stats-widget">
                  <div className="widget-body clearfix">
                    <div className="pull-left">
                      <h3 className="widget-title text-primary"><span className="counter" data-plugin="counterUp">Usuarios</span></h3>
                      <small className="text-color">Manejo de usuarios</small>
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
              <Link to="/admin/courses">
                <div className="widget stats-widget">
                  <div className="widget-body clearfix">
                    <div className="pull-left">
                      <h3 className="widget-title text-primary"><span className="counter" data-plugin="counterUp">Cursos</span></h3>
                      <small className="text-color">Manejo de cursos</small>
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
              <Link to="/admin/courses-users">
                <div className="widget stats-widget">
                  <div className="widget-body clearfix">
                    <div className="pull-left">
                      <h3 className="widget-title text-primary"><span className="counter" data-plugin="counterUp">Coursos - Usuarios</span></h3>
                      <small className="text-color">Manejo de relacion</small>
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
