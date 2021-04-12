import React, { Component } from 'react';
import classes from './Modal.module.css'
import Aux from '../../UI/AuxFolder/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

// Same as Aux class, just outputting child elements
class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    }

    componentDidMount() {
        
    }

    render() {
        let output;

        // If recipe is passed in as props we assign values to output
        let recipe, ingredients, tags;
        if (this.props.recipe) {
            recipe = this.props.recipe;
        
            ingredients = this.props.recipe.ingredients.map(ingredient => (
                <li>{ingredient}</li>
                ));

            tags = this.props.recipe.tags.map(tag => (
                <li>{tag}</li>
                ));

            output = (
                <div>
                    <h2>{recipe.name}</h2>
                    <h3>Prep Time: {recipe.time_hours} hours, {recipe.time_minutes} minutes </h3>
                    <h3>Ingredients:</h3>
                    <ul>
                        {ingredients}
                    </ul>
                    <h3>Instructions</h3>
                    <p>{recipe.instructions}</p>
                    <h4>Tags:</h4>
                    <ul>
                        {tags}
                    </ul>
                </div>
            )
        }
        
        if (this.props.showFollowers) {
            if (this.props.followers) {
                output = (
                    this.props.followers.results.map(follower => (
                        <li className={classes.FollowerListItem}>
                            <NavLink 
                                to={"/user/" + follower.username}
                                onClick={this.props.closed}>
                                <img src={follower.profile_pic} alt="profile-pic" className={classes.FollowerPic} /> &nbsp;{follower.username}<br />
                            </NavLink>
                        </li>
                        ))
                );
            }
        }
        

        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.closed} />
                <div
                    className={classes.Modal}
                    //show element or just slide it off the screen
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    
                    {output}

                </div>
            </Aux>
        );

    }
}

const mapStateToProps = state => {
    return {
      followers: state.getFollowers.followers,
      followersLoading: state.getFollowers.loading,
    };
  };

export default connect(mapStateToProps)(Modal);