import React, { Component } from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';
import { getInbox, getOutbox , getDropDownValue } from '../../../reducers/messages';
import { getSession } from '../../../reducers/authentication';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MessageForm from './form';
import axios from 'axios';
import moment from 'moment';
const active = {cursor:'pointer',border:'none',borderBottom: '2px solid #188ae2',backgroundColor:'transparent'}

const tab = {backgroundColor:'transparent',cursor:'pointer'}


export class TeacherMessages extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	messages:[],
      open:false,
      dropdown:false,
      dropdownValue:undefined,
      allMessages:[],
      message:{
        show:false,
        message:{}
      },
      bandeja:undefined
    }
  }

  componentWillMount() {
    this.props.getSession();
    this.props.getInbox();
   	this.props.getOutbox();
    this.props.getDropDownValue();
  }

  componentWillReceiveProps(nextProps){
    if(this.state.bandeja){
      this.setShow(this.state.bandeja);
    }
    else{
      this.setShow('inbox');
      this.setState({bandeja:'inbox'})
    }
    if(nextProps.dropDownValue && this.props.dropdownValue != nextProps.dropDownValue){
      this.filterByCourseId(nextProps.dropDownValue.id,nextProps.dropDownValue.name);
    }
  }

  getColor = (type) => {
  	switch (type){
  		case 'high':
  			return 'danger';
  		case 'medium':
  			return  'warning';
  		default:
  			return 'success';
  	}
  }

  getText = (type) => {
    switch (type){
      case 'high':
        return 'Urgente';
      case 'medium':
        return 'Alerta';
      default:
        return 'Common';
    }
  }

  setShow = (operation) => {
    switch(operation){
      case 'inbox':
        let messages = this.props.inbox.filter(message => {if (message.active) return message})
        this.setState({messages:messages,allMessages:messages,bandeja:operation});
        break;
      case 'urgent':
        let urgent = this.props.inbox.filter(message => {if(message.message.type == 'high' && message.active) return message});
        urgent = urgent ? urgent : [];
        this.setState({messages:urgent,allMessages:messages,bandeja:operation});
        break;
      case 'outbox':
        let outbox = this.props.outbox.filter(message => {if(message.active) return message});
        this.setState({messages:outbox,allMessages:outbox,bandeja:operation});
        break;
      case 'all':
        let allMail = this.props.inbox.concat(this.props.outbox).sort((a,b) => {return a.createdDate - b.createdDate});
        this.setState({messages:allMail,allMessages:allMail,bandeja:operation});
        break;
      case 'deleted':
        let deleted = this.props.inbox.concat(this.props.outbox).sort((a,b) => {return a.createdDate - b.createdDate}).filter(message => {if (message.active == false) return message});
        this.setState({messages:deleted,allMessages:deleted,bandeja:operation});
        break;
    }
    let message = {};
    message.show = false;
    message.message = {};
    this.setState({message:message,dropdownValue:undefined});
  }

  filterByCourseId = (id,name) => {
    let messages = this.state.allMessages.slice();
    if(id){
      messages = messages.filter(message => {if(message.course.id == id)return message});
    }
    this.setState({messages:messages,dropdownValue:name});
    
  }

  getMoment =() => {
    let m = moment();
    m.locale('es');
    return m;
  }

  goToMessage = (id) => {
    let message = {};
    message.show = true;
    message.message = this.state.messages.find(message => {return message.id == id});
    if(message.message.new){
      axios.get('/api/messageDetail/visited/' + message.message.id).then(response => {
        message.message.new = false;
        this.setState({messages:this.state.messages,message:message});
      });
    }
    else{
      this.setState({message:message});
    }
  }

  deleteMessage = () => {
    if(this.state.message.show){
      axios.get('/api/messageDetail/delete/' + this.state.message.message.id).then(response => {
        this.props.getInbox();
        this.props.getOutbox();
      });
    }
    let message = {};
    message.show = false;
    message.message = {};
    this.setState({message:message});
  }

  handleClose = () => {
    this.setState({open:false});
    this.props.getInbox();
    this.props.getOutbox();
  }

  render() {
    return (
        <div>
        <div className="col-md-2">
          <div className="app-action-panel">
          <div className="m-b-lg">
            <a onClick={() => this.setState({open:true})} type="button" data-toggle="modal" data-target="#composeModal" className="btn action-panel-btn btn-default btn-block">Mensaje nuevo</a>
          </div>
          <div className="app-actions-list scrollable-container ps-container ps-theme-default ps-active-y" data-ps-id="6547c596-bfa9-1e9a-b184-77f0e725da75" style={{height: '507px'}}>
            <div className="list-group">
              <a className="text-color list-group-item" style={this.state.bandeja == 'inbox' ? {backgroundColor:'#f5f5f5'} : {}} onClick={this.setShow.bind(this,'inbox')}><i className="m-r-sm fa fa-envelope"></i>Entrantes</a>
              <a className="text-color list-group-item" style={this.state.bandeja == 'urgent' ? {backgroundColor:'#f5f5f5'} : {}} onClick={this.setShow.bind(this,'urgent')}><i className="m-r-sm fa fa-bookmark"></i>Urgentes</a>
              <a className="text-color list-group-item" style={this.state.bandeja == 'outbox' ? {backgroundColor:'#f5f5f5'} : {}} onClick={this.setShow.bind(this,'outbox')}><i className="m-r-sm fa fa-paper-plane"></i>Enviados</a>
              <a className="text-color list-group-item" style={this.state.bandeja == 'all' ? {backgroundColor:'#f5f5f5'} : {}} onClick={this.setShow.bind(this,'all')}><i className="m-r-sm fa fa-folder"></i>Todo</a>
              <a className="text-color list-group-item" style={this.state.bandeja == 'deleted' ? {backgroundColor:'#f5f5f5'} : {}} onClick={this.setShow.bind(this,'deleted')}><i className="m-r-sm fa fa-trash"></i>Borrados</a>
            </div>
          </div>    
        </div>
        </div>
        <div className="col-md-10" >
        <div className="mail-toolbar m-b-lg">               
            <div className={this.state.dropDown ? 'btn-group open' : 'btn-group' } role="group">
                <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" 
                onFocus={() => this.setState({dropDown:true})} onBlur={() => this.setState({dropDown:false})}>{this.state.dropdownValue ? this.state.dropdownValue : 'Filtro'}<span className="caret"></span></button>
                <ul className="dropdown-menu">
                  <li><a onMouseDown={this.filterByCourseId.bind(this,undefined,undefined)}>Sin filtros</a></li>
                  {this.props.account.grade ? this.props.account.grade.courses.map(course => <li><a onMouseDown={this.filterByCourseId.bind(this,course.id,course.name)}>{course.name}</a></li>) : null}
                </ul>
              </div>
            <div className="btn-group" role="group">
              <a onClick={this.deleteMessage.bind(this)} className="btn btn-default"><i className="fa fa-trash"></i></a>
              <a className="btn btn-default"><i className="fa fa-exclamation-circle"></i></a>
            </div>
            <a className="btn btn-default"><i className="fa fa-refresh"></i></a>

            <div className="btn-group pull-right" role="group">
              <a className="btn btn-default"><i className="fa fa-chevron-left"></i></a>
              <a className="btn btn-default"><i className="fa fa-chevron-right"></i></a>
            </div>
          </div>
          {this.state.message.show ? 
          <div className="mail-view">
          <h4 className="m-0">{this.state.message.message.message.title}</h4>
          <div className="divid"></div>
          <div className="media">
            <div className="media-left">
              <div className="avatar avatar-lg avatar-circle">
                <img className="img-responsive" src={this.state.message.message.owner.id == this.props.account.id ? this.state.message.message.targetUser.imageUrl : this.state.message.message.owner.imageUrl} alt="avatar"/>
              </div>
            </div>

          <div class="media-body">
              <div class="m-b-sm">
                <h4 class="m-0 inline-block m-r-lg">
                  <span class="title-color">{this.state.message.message.owner.id == this.props.account.id ? 
                    this.state.message.message.targetUser.firstName + ' ' + this.state.message.message.targetUser.lastName :
                    this.state.message.message.owner.firstName + ' ' + this.state.message.message.owner.lastName}</span>
                </h4>
                <a><span className={`label label-${this.getColor(this.state.message.message.message.type)}`}>{this.getText(this.state.message.message.message.type)}</span></a>
              </div>
            </div>
          </div>
          <div className="divid"></div>

          <div className="row">
            <div className="col-md-12">
              <div className="m-h-lg lh-xl">
                <p>{this.state.message.message.message.message}</p>
              </div>
            </div>
          </div>
        </div>
          :
            <div className="table-responsive">
            <table className="table mail-list">
              <tbody>
              {this.state.messages.map(inboxMessage =>    
              <tr>
                <td style={{borderTop:'none',padding:'0px'}}>
                  <div className="mail-item">
                    <table className="mail-container">
                      <tbody><tr>
                        <td className="mail-left">
                          <div className="avatar avatar-lg avatar-circle">
                            <img src={inboxMessage.owner.id == this.props.account.id ?  inboxMessage.targetUser.imageUrl : inboxMessage.owner.imageUrl} alt="sender photo"/>
                          </div>
                        </td>
                        <td className="mail-center">
                          <div className="mail-item-header">
                            <h4 className="mail-item-title"><a onClick={this.goToMessage.bind(this,inboxMessage.id)} className="title-color">{inboxMessage.new && inboxMessage.owner.id != this.props.account.id  ? <strong>{inboxMessage.message.title}</strong> : inboxMessage.message.title}</a></h4>
                            <a><span className={`label label-${this.getColor(inboxMessage.message.type)}`}>{this.getText(inboxMessage.message.type)}</span></a>
                          </div>
                          <p className="mail-item-excerpt">{inboxMessage.new && inboxMessage.owner.id != this.props.account.id ? <strong>{inboxMessage.message.message}</strong> : inboxMessage.message.message}</p>
                        </td>
                        <td className="mail-right">
                          <p className="mail-item-date"></p>
                          <p className="mail-item-star starred">
                            <a href="#"><i className="zmdi zmdi-star"></i></a>
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </td>
              </tr>)}
              </tbody>
            </table>
          </div> }
      </div>
      <MessageForm open={this.state.open} closed={this.handleClose.bind(this)}/>
    </div>
    );
  }
}

export default connect(
  (store => ({ 
  	inbox: store.messages.inbox,
  	outbox: store.messages.outbox,
    account: store.authentication.account,
    dropDownValue : store.messages.dropdownValue
  })),
  { getInbox, getOutbox , getSession , getDropDownValue}
)(TeacherMessages);