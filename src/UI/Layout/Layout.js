import React, { Component } from 'react';
import classes from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Home from '../../Components/Home/Home';
import Search from '../../Components/Search/Search';
import Add from '../../Components/Add/Add';
import Popular from '../../Components/Popular/Popular';
import Profile from '../../Components/Profile/Profile';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import SideDrawer from '../SideDrawer/SideDrawer';
import Toolbar from '../Toolbar/Toolbar';


class Layout extends Component {
  state = {
      showSideDrawer: false
  }

  componentDidMount() {
    if (this.props.token !== null && this.props.profileInfo.loaded === false) {
      this.props.getProfileInfo(this.props.token);
    }
    if (this.props.token !== null && this.props.profileRecipes.loaded === false) {
      this.props.getProfileRecipes(this.props.token);
    }
    if (this.props.token !== null && this.props.homeRecipes.loaded === false) {
      this.props.getHomeRecipes(this.props.token);
    }
    if (this.props.popularRecipes.loaded === false) {
      this.props.getPopularRecipes();
    }
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
        component = <Home
          recipes={this.props.homeRecipes.recipes} />;
        break;
      case 2:
        component = <Search />;
        break;
      case 3:
        component = <Add />;
        break;
      case 4:
        component = <Popular
          recipes={this.props.popularRecipes.recipes} />;
        break;
      case 5:
        component = <Profile
          profileInfo={this.props.profileInfo}
          recipes={this.props.profileRecipes.recipes} />;
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
    sp: state.navbar.selectedPage,
    token: state.auth.token,
    profileInfo: state.profileInfo,
    profileRecipes: state.profileRecipes,
    homeRecipes: state.homeRecipes,
    popularRecipes: state.popularRecipes,

  };
};

const mapDispatchToProps = dispatch => {
  return {
      getProfileInfo: (token) => dispatch(actions.profileInfo(token)),
      getProfileRecipes: (token) => dispatch(actions.profileRecipes(token)),
      getHomeRecipes: (token) => dispatch(actions.homeRecipes(token)),
      getPopularRecipes: () => dispatch(actions.popularRecipes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
