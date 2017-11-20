import React, { Component } from 'react';
import { connect } from 'react-redux';

import Translate from 'react-translate-component';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import Select from 'react-select';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';
import { getSession } from '../../../reducers/authentication';

export class MessageForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      messageDetail:{
        priority:undefined,
        message:{
          message:undefined,
          type:undefined
        }  
      },
      course:{},
      users:[],
      select: { 
        removeSelected: true,
        disabled: false,
        crazy: false,
        stayOpen: false,   
        rtl: false
      },
      selectUsers:undefined,
      selectType:undefined
    };
  }

  componentWillReceiveProps() {
    if(this.props.params.id){
      axios.get('/api/messageDetail/' + this.props.params.id).then(response => {
        let user = {};
        user.label = response.data.messageDetail.targetUser.firstName + ' ' + response.data.messageDetail.targetUser.lastName;
        user.value = response.data.messageDetail.targetUser.id;
        let type = {};
        type.value = response.data.messageDetail.message.type;
        this.setState({messageDetail:response.data,selectUsers:user,selectType:getTypes})
      }
      ).catch();
    }
    axios.get('/api/users/byCourse/' + this.props.params.courseId).then(response => {
      this.setState({users:response.data});
    }).catch();
    axios.get('/api/course/' + this.props.params.courseId).then(response => {
      let md = Object.assign({},this.state.messageDetail);
      md.course = response.data;
      this.setState({messageDetail:md});
    }).catch();
  }

  handleMessageChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let newMessageDetail = Object.assign({},this.state.messageDetail);
    newMessageDetail.message[name] = value;

    this.setState({messageDetail:newMessageDetail});
  }

  handleChangeUsers = (val) => {
    this.setState({selectUsers:val});
  }

  handleChangeType = (val) => {
    this.setState({selectType:val});
  }

  getTypes = () => {
    return [
      {label:'Alta',value:'high'},
      {label:'Mediana',value:'medium'},
      {label:'Baja',value:'low'}
    ]
  }

  saveCourse = () => {    
    this.state.messageDetail.isNew = true;
    this.state.messageDetail.message.type = this.state.selectType.value;
    this.state.messageDetail.targetUser = this.state.users.find(user => {return user.id == this.state.selectUsers.value});
    if(!this.props.params.id){
      axios.post('/api/messageDetail/create',this.state.messageDetail)
      .then(response => {
        this.props.router.push('/teacher/course/' + this.props.params.courseId + '/messages')
      }
      ).catch(error => {
                console.log('error');
        console.log(error);
      });
    }
    else{
      axios.put('/api/messageDetail/',this.state.messageDetail)
      .then(response => {
        this.props.router.push('/teacher/course/' + this.props.params.courseId + '/messages')
      }).catch(error => {
        console.log('error');
        console.log(error);
      });
    }
   
  }

  getUsers = () => {
    let users = this.state.users.map(user => {
      let u = {};
      u.label = user.firstName + ' ' + user.lastName;
      u.value = user.id; 
      return u;
    });
    return users;
    //return users.filter(user => {return user.id !=  this.props.account.id});
  }
  
  render() {
    const { crazy, disabled, stayOpen} = this.state.select;
    return (
        <div className="col-md-8 col-offset-md-2" >
          <div className="widget">
            <header className="widget-header">
              <h4 className="widget-title">{!this.props.params.id ? 'Mensaje nuevo' : 'Editar Mensaje' }</h4>
            </header>
            <hr className="widget-separator"/>
            <div className="widget-body">
              <form>
                <div className="form-group">
                    <label>Usuarios</label>
                      <div>
                      <Select
                        closeOnSelect={!stayOpen}
                        disabled={disabled}
                        onChange={this.handleChangeUsers}
                        options={this.getUsers()}
                        removeSelected={this.state.select.removeSelected}
                        rtl={this.state.select.rtl}
                        value={this.state.selectUsers}
                      />
                      </div>
                </div>
                <div className="form-group">
                    <label>Mensaje</label>
                      <div>
                        <textarea className="form-control" placeholder="Tu mensaje..." name="message" 
                        onChange={this.handleMessageChange} value={this.state.messageDetail.message.message}/>
                      </div>
                </div>
                <div className="form-group">
                    <label>Tipo</label>
                      <div>
                        <Select
                        closeOnSelect={!stayOpen}
                        disabled={disabled}
                        onChange={this.handleChangeType}
                        options={this.getTypes()}
                        removeSelected={this.state.select.removeSelected}
                        rtl={this.state.select.rtl}
                        value={this.state.selectType}
                        />
                      </div>
                </div>
              </form>
             </div> 
          </div>
          <div style={{width:'100%'}}>
            <FlatButton label="Guardar" style={{float:'right'}} onClick={this.saveCourse} primary={true}/>
          </div>
        </div>  
    );
  }
}

export default connect(
  store => ({
    account: store.authentication.account
  }),
  { getSession }
)(MessageForm);
