import React, { Component } from 'react';
import { follow, unfollow } from './apiUser';

class FollowProfileButton extends Component{

    followClick = () => {
        this.props.onButtonClick(follow);
    };

    unfollowClick = () => {
        this.props.onButtonClick(unfollow);
    };

    render(){
        return(
            <div>
                { !this.props.following ? 
                    (
                        <button onClick={this.followClick} className="btn btn-sm btn-info btn-raised">Follow</button>
                    ) : (
                        <button onClick={this.unfollowClick} className="btn btn-sm btn-raised btn-danger">UnFollow</button>
                    )
                } 
            </div>
        );
    }
}

export default FollowProfileButton;