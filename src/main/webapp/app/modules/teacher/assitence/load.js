import React, { Component } from 'react';
import { Link } from 'react-router';
import Translate from 'react-translate-component';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { getSession } from '../../../reducers/authentication';
import { getCourseById } from '../../../reducers/course'
import { getCourseDetails , saveAllCourseDetail} from '../../../reducers/courseDetail'
import { _ } from 'lodash';
import Select from 'react-select';
import FlatButton from 'material-ui/FlatButton';
import Subheader from 'material-ui/Subheader';
import axios from 'axios';
import moment from 'moment';


export class LoadAssitence extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
       users:[],
       select: { 
        removeSelected: true,
        disabled: false,
        crazy: false,
        stayOpen: false,   
        rtl: false
      }
    }
  }

  componentWillMount() {
    this.props.getSession();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.account.grade){
      axios.get('/api/users/grade/' + nextProps.account.grade.id).then(response => {
        let users = response.data.filter(user => {return user.id != this.props.account.id});
        this.setState({users:users});
      }).catch();
    }
  };

  handlePresent = (studentId,assitanceId,value) => {
    let newUsers = this.state.users.slice();
    let user = newUsers.find(user => user.id == studentId);
    if(user.assitenceDTOS.find(a => a.id == assitanceId)){
     user.assitenceDTOS.find(assitence => assitence.id == assitanceId)['present'] = value.value;
    }
    else{
      let date = moment(this.props.location.query.date).toDate();
      user.assitenceDTOS.push({id:assitanceId,date:date,present:value.value})
    }
    this.setState({users:newUsers});
  }

  onSubmit = () => {
    this.state.users.map(user => user.assitenceDTOS.map(assitence => {
      if(isNaN(assitence.id)){
        assitence.id = null;
      }
      }));
    this.state.users.map(user => {
      let as = user.assitenceDTOS.find(a => {return moment(a.date).format('YYYY-MM-DD') == moment(this.props.location.query.date).format('YYYY-MM-DD')});
      if(!as){
        let date = moment(this.props.location.query.date).toDate();
        user.assitenceDTOS.push({id:null,date:date,present:false})
      }
    });
    axios.post('/api/users/saveAll',this.state.users);
    this.props.router.push('/teacher/assitence/');
  }

  render() {
    const titleStyle = {textTransform: 'capitalize',top: '10px',position: 'absolute',margin: 'auto',left:'0px',right:'0px',textAlign: 'center'};
    const noteStyle = {position: 'absolute',fontSize: '60px',left: '0px',right: '0px',textAlign: 'center',top: 'calc(50% - 30px)'}
    const { crazy, disabled, stayOpen} = this.state.select;
    return (
      <div className="widget">
        <hr className="widget-separator"/>
        <div className="widget-body">
          <div>              
            <table className="table no-cellborder">
              <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Presente</th>                
                </tr>
              </thead>
              <tbody>
                  {this.state.users.map((user,index) => 
                    {let assitence = user.assitenceDTOS.find(a => {return moment(a.date).format('YYYY-MM-DD') == moment(this.props.location.query.date).format('YYYY-MM-DD')});
                    if(!assitence){
                      assitence = {};
                      assitence.id = 'id' + index;
                      assitence.present = false;
                    }
                    return (<tr key={index}>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>
                        <Select
                            style={{zIndex:100}}
                            closeOnSelect={!stayOpen}
                            disabled={disabled}
                            multi={false}
                            onChange={this.handlePresent.bind(this,user.id,assitence.id)}
                            options={[{label:'Si',value:true},{label:'No',value:false}]} 
                            removeSelected={this.state.select.removeSelected}
                            rtl={this.state.select.rtl}
                            value={assitence.present}
                          /> 
                      </td>
                    </tr>)
                    }
                  )}
                </tbody>
            </table>
          </div>
        </div> 
        <div style={{width:'100%'}}><FlatButton label="Guardar" style={{float:'right'}} primary={true} onClick={this.onSubmit}/></div>
      </div>
    );
  }
}

export default connect(
  store => ({
    account: store.authentication.account,
  }),
  { getSession}
)(LoadAssitence);
