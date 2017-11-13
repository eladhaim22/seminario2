import React, { Component } from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';
import { getInbox,getOutbox } from '../../../reducers/messages';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

export class TeacherMessages extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getInbox();
   	this.props.getOutbox();  
  }

  render() {
    return (
        <div className="col-md-8 col-offset-md-2" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">Mensajes</h4>
            </header>
            <hr className="widget-separator"/>
			<div class="m-b-lg nav-tabs-horizontal">
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active"><a href="#tab-1" aria-controls="tab-3" role="tab" data-toggle="tab" aria-expanded="true">Inbox</a></li>
					<li role="presentation" class="active"><a href="#tab-1" aria-controls="tab-3" role="tab" data-toggle="tab" aria-expanded="true">Outbox</a></li>
				</ul>
			</div>
			<div class="tab-content p-md">
				<div role="tabpanel" class="tab-pane fade active in" id="tab-1">
					<table className="table table-striped">
	                <tbody>
	                  <tr>
	                    <th>ID</th>
	                    <th>Mensaje</th>
	                    <th>Tipo</th>
	                    <th></th>
	                  </tr>
	                  {this.props.inbox.map((message,i) => 
	                    <tr key={i}>
	                      <td>{message.id}</td>
	                      <td>{message.message}</td>
	                      <td>{message.type}</td>
	                      <td>
	                        <div className="btn-group flex-btn-group-container">
	                          <Link to={'teacher/course/' + this.props.params.id + '/message/' + message.id}><FlatButton label="Modificar"/></Link>
	                        </div>
	                      </td>
	                    </tr>
	                  )}
	                </tbody>
	              </table>
				</div>

				<div role="tabpanel" class="tab-pane fade" id="tab-2">
					<table className="table table-striped">
	                <tbody>
	                  <tr>
	                    <th>ID</th>
	                    <th>Mensaje</th>
	                    <th>Tipo</th>
	                    <th></th>
	                  </tr>
	                  {this.props.outbox.map((message,i) => 
	                    <tr key={i}>
	                      <td>{message.id}</td>
	                      <td>{message.message}</td>
	                      <td>{message.type}</td>
	                      <td>
	                        <div className="btn-group flex-btn-group-container">
	                          <Link to={'teacher/course/' + this.props.params.id + '/message/' + message.id}><FlatButton label="Modificar"/></Link>
	                        </div>
	                      </td>
	                    </tr>
	                  )}
	                </tbody>
	              </table>
			</div>
        	</div>  
 		</div>  
    </div>  
    );
  }
}

export default connect(
  (state => ({ 
  	inbox: state.messages.inbox,
  	outbox: state.messages.outbox, 
  })),
  { getInbox,getOutbox }
)(TeacherMessages);