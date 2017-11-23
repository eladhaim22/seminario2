import React, { Component, PropTypes } from 'react';
import Translate from 'react-translate-component';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {
  ActionHome, ActionList, ActionVerifiedUser, DeviceAccessTime,
  ActionSettings, ActionLock, ActionNoteAdd,
  ActionExitToApp, CommunicationVpnKey,
  SocialPersonAdd, SocialGroup, ActionAssessment,
  ActionFavorite, ActionBuild, AlertAddAlert,
  ActionAssignment, AvLibraryBooks
} from 'material-ui/svg-icons';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { locales } from '../../../config/translation';
import appConfig from '../../../config/constants';
import { HEADER_COLOR } from '../../util/global-style';
import Avatar from 'material-ui/Avatar';
import IconMenu from 'material-ui/IconMenu';

import './header.scss';

export class Header extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    currentLocale: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    onLocaleChange: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false
    };
  }
  handleChange = (event, index, language) => {
    this.props.onLocaleChange(language);
  };

  toggleSideBar = () => {
    this.setState({
      sidebarOpen: !this.state.sidebarOpen
    });
  }

  render() {
    const { currentLocale, isAuthenticated, handleLogout } = this.props;
    const menuListStyle = { marginLeft: 18 };

    let menuItemAccountLogin = (
      <Link to="/login">
        <ListItem
          key={2.1} innerDivStyle={menuListStyle}
          primaryText={<Translate content="global.menu.account.login" />}
          leftIcon={<ActionLock />}
        />
      </Link>
    );
    let menuItemAccountRegister = (
      <Link to="/register">
        <ListItem
          key={2.2} innerDivStyle={menuListStyle}
          primaryText={<Translate content="global.menu.account.register" />}
          leftIcon={<ActionNoteAdd />}
        />
      </Link>
    );

    let menuDashboard = null;
    let menuItemAccountSettings = null;
    let menuItemAccountPassword = null;
    let menuItemAccountSignOut = null;
    let menuItemAdministration = null;

    if (isAuthenticated && this.props.authentication.account.authorities) {
        if(this.props.authentication.account.authorities.includes('ROLE_ADMIN')){
          menuDashboard = ([<Link to="admin/dashboard">
            <ListItem key={1.1}
              primaryText="Dashboard"
              leftIcon={<ActionList />}
            />
          </Link>])
        }
        else if (this.props.authentication.account.authorities.includes('ROLE_PROFESSOR')){
          menuDashboard = ([<Link to="teacher/dashboard">
            <ListItem key={1.1}
              primaryText="Dashboard"
              leftIcon={<ActionList />}
            />
          </Link>,
          <Link to="/teacher/mail/">
            <ListItem key={1.3}
              primaryText="Mensajeria"
              leftIcon={<ActionList />}
            />
          </Link>,
          <Link to="/teacher/assitence/">
            <ListItem key={1.4}
              primaryText="Asistencia"
              leftIcon={<ActionList />}
            />
          </Link>])
        }
        else {
          menuDashboard = (
           [<Link to="/user/dashboard/">
            <ListItem key={1.1}
              primaryText="Dashboard"
              leftIcon={<ActionList />}
            />
            </Link>,
           <Link to="/user/courses/">
            <ListItem key={1.1}
              primaryText="Materias"
              leftIcon={<ActionList />}
            />
            </Link>,
            <Link to="/user/events/">
            <ListItem key={1.2}
              primaryText="Eventos"
              leftIcon={<ActionList />}
            />
            </Link>,
            <Link to="/user/mail/">
            <ListItem key={1.3}
              primaryText="Mensajeria"
              leftIcon={<ActionList />}
            />
            </Link>
            ]
            ) 
        }

      menuItemAccountLogin = null;
      menuItemAccountRegister = null;
      menuItemAccountSettings = (
        <Link to="/account/settings">
          <ListItem
            key={2.3} innerDivStyle={menuListStyle}
            primaryText={<Translate content="global.menu.account.settings" />}
            leftIcon={<ActionSettings />}
          />
        </Link>
      );
      menuItemAccountPassword = (
        <Link to="/account/password">
          <ListItem
            key={2.4} innerDivStyle={menuListStyle}
            primaryText={<Translate content="global.menu.account.password" />}
            leftIcon={<CommunicationVpnKey />}
          />
        </Link>
      );
      menuItemAccountSignOut = (
        <ListItem
          key={2.5} onClick={() => handleLogout()} innerDivStyle={menuListStyle}
          primaryText={<Translate content="global.menu.account.logout" />}
          leftIcon={<ActionExitToApp />}
        />
      );

      menuItemAdministration = (
        <ListItem
          key={4}
          primaryText={<Translate content="global.menu.admin.main" />}
          leftIcon={<SocialPersonAdd />}
          initiallyOpen={false}
          primaryTogglesNestedList
          nestedItems={[
            <Link to="/admin/user-management">
              <ListItem
                key={4.2} innerDivStyle={menuListStyle}
                leftIcon={<SocialGroup />}
                primaryText={<Translate content="global.menu.admin.userManagement" />}
              />
            </Link>,
            <Link to="/admin/metrics">
              <ListItem
                key={4.3} innerDivStyle={menuListStyle}
                leftIcon={<ActionAssessment />}
                primaryText={<Translate content="global.menu.admin.metrics" />}
              />
            </Link>,
            <Link to="/admin/health">
              <ListItem
                key={4.4} innerDivStyle={menuListStyle}
                leftIcon={<ActionFavorite />}
                primaryText={<Translate content="global.menu.admin.health" />}
              />
            </Link>,
            <Link to="/admin/configuration">
              <ListItem
                key={4.5} innerDivStyle={menuListStyle}
                leftIcon={<ActionBuild />}
                primaryText={<Translate content="global.menu.admin.configuration" />}
              />
            </Link>,
            <Link to="/admin/audits">
              <ListItem
                key={4.6} innerDivStyle={menuListStyle}
                leftIcon={<AlertAddAlert />}
                primaryText={<Translate content="global.menu.admin.audits" />}
              />
            </Link>,
            <Link to="/admin/logs">
              <ListItem
                key={4.7} innerDivStyle={menuListStyle}
                leftIcon={<ActionAssignment />}
                primaryText={<Translate content="global.menu.admin.logs" />}
              />
            </Link>,
            <Link to="/admin/docs">
              <ListItem
                key={4.8} innerDivStyle={menuListStyle}
                leftIcon={<AvLibraryBooks />}
                primaryText={<Translate content="global.menu.admin.apidocs" />}
              />
            </Link>]}
        />
      );
    }

    return (

      <div className="navbar navbar-inverse navbar-fixed-top primary in">
        <AppBar
          className="navbar-header"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          style={{maxHeight:'340px',backgroundColor:'#1576c2'}}
          title={
            <div>
              <Link to="/" className="brand-logo">
                <span className="brand-title"><Translate content="global.title">Boletin Offical</Translate></span>
              </Link>
            </div>
          }
          onLeftIconButtonTouchTap={this.toggleSideBar}
          iconStyleRight={{marginRight:'16px'}}
          iconElementRight=
          {this.props.authentication.isAuthenticated ? 
            <div>  
            <IconMenu iconButtonElement={<Avatar src={this.props.authentication.account.imageUrl} style={{height:'60px',width:'60px'}} />} underlineStyle={{ borderTop: 'none' }} labelStyle={{ color: HEADER_COLOR }}>
              <MenuItem primaryText="Perfil"></MenuItem>
            </IconMenu>
            </div>
          : null}
        />
        <Drawer open={this.state.sidebarOpen} containerStyle={{width:'220px'}} docked={false} onRequestChange={sidebarOpen => this.setState({ sidebarOpen })}>
          <List>
            <Subheader><span className="brand-icon"><i className="fa fa-gg"></i></span><span className="brand-name">Boletin Digital</span></Subheader>
            {this.props.authentication.isAuthenticated ? <ListItem
                disabled={true}
                leftAvatar={
                <Avatar src={this.props.authentication.account.imageUrl} />
            }
            >
            {this.props.authentication.account.firstName ?
                  this.props.authentication.account.firstName + ' ' + this.props.authentication.account.lastName 
                  : ' '  }
            </ListItem> : null}
            {menuDashboard ? menuDashboard.map(e => e) : null}
            <ListItem
              primaryText={<Translate content="global.menu.account.main" />}
              leftIcon={<ActionLock />}
              initiallyOpen={false}
              primaryTogglesNestedList key={2}
              nestedItems={[
                menuItemAccountLogin,
                menuItemAccountRegister,
                menuItemAccountSettings, 
                menuItemAccountPassword,
                menuItemAccountSignOut
              ]}
            />
          </List>
        </Drawer>
      </div>
    );
  }
}

export default connect(
  store => ({
    authentication: store.authentication
  }),null
)(Header);