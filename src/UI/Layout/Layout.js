import React, { Component } from 'react';
import classes from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Home from '../../Components/Home/Home';
import Search from '../../Components/Search/Search';
import Add from '../../Components/Add/Add';
import Popular from '../../Components/Popular/Popular';
import Profile from '../../Components/Profile/Profile';
import { connect } from 'react-redux';


class Layout extends Component {
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
        {component}
        <Navbar />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    sp: state.selectedPage
  };
};

export default connect(mapStateToProps)(Layout);
