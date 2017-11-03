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

import { locales } from '../../../config/translation';
import appConfig from '../../../config/constants';
import { HEADER_COLOR } from '../../util/global-style';

import './header.scss';

export default class Header extends Component {
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

    let menuCourses = null;
    let menuItemAccountSettings = null;
    let menuItemAccountPassword = null;
    let menuItemAccountSignOut = null;
    let menuItemAdministration = null;

    if (isAuthenticated) {
      menuCourses = (
        <Link to="/dashboard">
          <ListItem key={1.1}
            primaryText="Coursos"
            leftIcon={<ActionList />}
          />
        </Link>
      );

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
      <div>
        <div className="ribbon dev"><a href=""><Translate content="global.ribbon.dev" /></a></div>
        <AppBar
          title={
            <div>
              <Link to="/" className="brand-logo">
                <span className="brand-title"><Translate content="global.title">Seminario2</Translate></span>
                <span className="navbar-version">{appConfig.version}</span>
              </Link>
            </div>
          }
          onLeftIconButtonTouchTap={this.toggleSideBar}
          iconElementRight={
            <DropDownMenu value={currentLocale} onChange={this.handleChange} underlineStyle={{ borderTop: 'none' }} labelStyle={{ color: HEADER_COLOR }}>
              {locales.map(lang => <MenuItem key={lang} value={lang} primaryText={lang.toUpperCase()} />)}
            </DropDownMenu>
          }
        />
        <Drawer open={this.state.sidebarOpen} docked={false} onRequestChange={sidebarOpen => this.setState({ sidebarOpen })}>
          <List>
            <Subheader>Application Menu</Subheader>
            <Link to="/"><ListItem primaryText={<Translate content="global.menu.home" />} leftIcon={<ActionHome />} /></Link>
            {menuCourses}
            {menuItemAdministration}
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
