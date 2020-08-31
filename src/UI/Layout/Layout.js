import React, { Component } from 'react';
import classes from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Home from '../../Components/Home/Home';
import Search from '../../Components/Search/Search';
import Add from '../../Components/Add/Add';
import Popular from '../../Components/Popular/Popular';
import Profile from '../../Components/Profile/Profile';
import { connect } from 'react-redux';
import SideDrawer from '../SideDrawer/SideDrawer';
import Toolbar from '../Toolbar/Toolbar';


class Layout extends Component {
  state = {
      showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
      this.setState( { showSideDrawer: false } );
  }

  sideDrawerToggleHandler = () => {
      this.setState( ( prevState ) => {
          return { showSideDrawer: !prevState.showSideDrawer };
      } );
  }

  render() {
    let component = null;
    switch (this.props.sp) {
      case 1:
        component = <Home />;
        break;
      case 2:
        component = <Search />;
        break;
      case 3:
        component = <Add />;
        break;
      case 4:
        component = <Popular />;
        break;
      case 5:
        component = <Profile />;
        break;
    }

    return (
      <div className={classes.main}>
      <Toolbar
          drawerToggleClicked={this.sideDrawerToggleHandler} />
      <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        {component}
        <Navbar />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sp: state.navbar.selectedPage
  };
};

export default connect(mapStateToProps)(Layout);
