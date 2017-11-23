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
        message:{
          message:undefined,
          type:undefined
        }  
      },
      users:[],
      select: { 
        removeSelected: true,
        disabled: false,
        crazy: false,
        stayOpen: false,   
        rtl: false
      },
      selectUsers:undefined,
      selectType:undefined,
      selectCourse:undefined,
      open:false
    };
  }

  componentWillMount(){
    this.props.getSession();
  }


  componentWillReceiveProps(nextProps) {
    if(nextProps.account.grade){
      axios.get('/api/users/grade/' + nextProps.account.grade.id).then(response => {
        let users = response.data.filter(user => {return user.id != this.props.account.id});
        this.setState({users:users});
      }).catch();
    }

   
    if(nextProps.open != this.props.open){
      this.setState({open:nextProps.open});
    }
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

  handleChangeCourse = (val) => {
    this.setState({selectCourse:val});
  }

  getTypes = () => {
    return [
      {label:'Alta',value:'high'},
      {label:'Mediana',value:'medium'},
      {label:'Baja',value:'low'}
    ]
  }

  getCourses = () => {
    return this.props.account.grade.courses.map(course => {return {label:course.name,value:course.id}});
  }
  

  saveCourse = () => {    
    let wrapper = {};
    wrapper.users = [];
    this.state.messageDetail.message.type = this.state.selectType.value;
    let usersIds = this.state.selectUsers.map(user => user.value);
    wrapper.users = this.state.users.filter(user => {if(usersIds.includes(user.id))return user});
    let course = {};
    course.id = this.state.selectCourse.value;
    course.name = this.state.selectCourse.label;
    this.state.messageDetail.course = course;
    wrapper.messageDetail = this.state.messageDetail;
    axios.post('/api/messageDetail/create',wrapper)
    .then(response => {
      this.props.router.push('/user/mail/')
    }
    ).catch(error => {
              console.log('error');
      console.log(error);
    });
    this.resetState();
    this.props.closed();
  }

  resetState= () => {
    this.setState({
      messageDetail:{
        message:{
          message:undefined,
          type:undefined
        }  
      },
      users:[],
      select: { 
        removeSelected: true,
        disabled: false,
        crazy: false,
        stayOpen: false,   
        rtl: false
      },
      selectUsers:undefined,
      selectType:undefined,
      selectCourse:undefined,
    });
  }

  cancel = () => {
    this.resetState();
    this.props.closed();
  }

  getUsers = () => {
    let users = this.state.users.map(user => {
      let u = {};
      u.label = user.firstName + ' ' + user.lastName;
      u.value = user.id; 
      return u;
    });
    return users;
  }

  render() {
    const { crazy, disabled, stayOpen} = this.state.select;
    const actions = [
      <FlatButton
        label="Canceler"
        primary={true}
        onClick={this.cancel}
      />,
      <FlatButton
        label="Mandar"
        primary={true}
        keyboardFocused={true}
        onClick={this.saveCourse}
      />,
    ];
    return (
        this.props.account.id ?
        <Dialog
          title="Mandar mensaje"
          actions={actions}
          open={this.state.open}
        >
          <div class="modal-body">
              <form>
                <div className="form-group">
                    <label>Destinatarios</label>
                      <div>
                      <Select
                        multi={true}
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
                <div className="row">
                  <div className="col-md-6">
                  <div className="form-group">
                      <label>Prioridad</label>
                        <div>
                          <Select
                          closeOnSelect={!stayOpen}
                          disabled={disabled}
                          onChange={this.handleChangeType}
                          options={this.getTypes()}
                          removeSelected={this.state.select.removeSelected}
                          rtl={this.state.select.rtl}
                          value={this.state.selectType}
                          style={{zIndex:'10'}}/>
                        </div>
                  </div>
                  </div>
                  <div className="col-md-6">
                  <div className="form-group">
                      <label>Materia</label>
                        <div>
                          <Select
                          closeOnSelect={!stayOpen}
                          disabled={disabled}
                          onChange={this.handleChangeCourse}
                          options={this.getCourses()}
                          removeSelected={this.state.select.removeSelected}
                          rtl={this.state.select.rtl}
                          value={this.state.selectCourse}
                          style={{zIndex:'100'}}
                          />
                        </div>
                  </div>
                </div>
                </div>
                <div className="form-group">
                    <label>Titulo</label>
                      <div>
                        <input className="form-control"  name="title" 
                        onChange={this.handleMessageChange} value={this.state.messageDetail.message.title}/>
                      </div>
                </div>
                <div className="form-group">
                    <label>Mensaje</label>
                      <div>
                        <textarea className="form-control" placeholder="Tu mensaje..." name="message" 
                        onChange={this.handleMessageChange} value={this.state.messageDetail.message.message}/>
                      </div>
                </div>
              </form>
          </div>
        </Dialog> : null
    );
  }
}

export default connect(
  store => ({
    account: store.authentication.account
  }),
  { getSession }
)(MessageForm);
