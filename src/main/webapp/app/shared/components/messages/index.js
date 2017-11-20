import React, { Component } from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';
import { getInbox,getOutbox } from '../../../reducers/messages';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

const active = {cursor:'pointer',border:'none',borderBottom: '2px solid #188ae2',backgroundColor:'transparent'}

const tab = {backgroundColor:'transparent',cursor:'pointer'}


export class TeacherMessages extends Component {

  constructor(props) {
    super(props);
    this.state = {
    	tabs:{
    		tab1:true,
    		tab2:false
    	}
    }
  }

  componentWillMount() {
    this.props.getInbox();
   	this.props.getOutbox();  
  }

  setActive = (tab) => {
  	let tabs = Object.assign({},this.state.tabs); 
  	tabs.tab1 = false;
  	tabs.tab2 = false;
  	tabs[tab] = true;
  	this.setState({tabs:tabs});
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

  render() {
    return (
        <div className="col-md-8 col-offset-md-2" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">Mensajes</h4>
            </header>
            
			<div className="widget-body">
			
			<div className="m-b-lg nav-tabs-horizontal">
				<ul className="nav nav-tabs" role="tablist">
					<li role="presentation" className={this.state.tabs.tab1 ? 'active' : ''}><a style={this.state.tabs.tab1 ? active : tab} onClick={this.setActive.bind(this,'tab1')} aria-controls="tab-3" role="tab" data-toggle="tab" aria-expanded="true">Inbox</a></li>
					<li role="presentation" className={this.state.tabs.tab2 ? 'active' : ''}><a style={this.state.tabs.tab2 ? active : tab} onClick={this.setActive.bind(this,'tab2')} aria-controls="tab-3" role="tab" data-toggle="tab" aria-expanded="true">Outbox</a></li>
				</ul>
			</div>
			<div className="tab-content p-md">
				<div role="tabpanel" className={`tab-pane fade ${this.state.tabs.tab1 ? 'active in' : ''}`}>
					<table className="table table-striped">
	                <tbody>
	                  <tr>
	                    <th>Desde</th>
	                    <th>Mensaje</th>
	                  </tr>
	                  {this.props.inbox.map((messageDetail,i) => {
	                  	if(messageDetail.course.id == this.props.params.id){
	                    return(<tr key={i} className={this.getColor(messageDetail.message.type) + ' text-color'}>
	                      <td>{messageDetail.owner.firstName + ' ' + messageDetail.owner.lastName}</td>
	                      <td>{messageDetail.message.message}</td>
	                    </tr>)
	                	}}
	                  )}
	                </tbody>
	              </table>
				</div>

				<div role="tabpanel" className={`tab-pane fade ${this.state.tabs.tab2 ? 'active in' : ''}`}>
					<table className="table table-striped">
	                <tbody>
	                  <tr>
	                    <th>A</th>
	                    <th>Mensaje</th>
	                  </tr>
	                  {this.props.outbox.map((messageDetail,i)	 => {
	                  	if(messageDetail.course.id == this.props.params.id){
	                    return(<tr key={i} className={this.getColor(messageDetail.message.type) + ' text-color'}>
	                      <td>{messageDetail.targetUser.firstName + ' ' + messageDetail.targetUser.lastName}</td>
	                      <td>{messageDetail.message.message}</td>
	                    </tr>)
	                	}}
	                  )}
	                </tbody>
	              </table>
			</div>
        	</div>  
 		</div>
 		</div>  
 		<div style={{width:'100%'}}>
              <Link to={'teacher/course/' + this.props.params.id + '/message'}>
                <FlatButton label="Agregar" style={{float:'right'}} primary={true}/>
              </Link>
            </div>
    </div>  
    );
  }
}

export default connect(
  (store => ({ 
  	inbox: store.messages.inbox,
  	outbox: store.messages.outbox, 
  })),
  { getInbox,getOutbox }
)(TeacherMessages);