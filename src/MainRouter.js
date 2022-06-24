import React from 'react';
import { Route, Switch } from 'react-router-dom';

import notfound from './core/NotFound';
import { isAuthenticated } from "./auth/Index";
import './App.css';
import Home from './core/Home';
import Menu from './core/Menu';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import FindPeople from './user/FindPeople';
import PrivateRoute from './auth/PrivateRoute'; 
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";
import { signin } from './auth/Index';
import Menus from './core/menus';
import Chat from "./user/Chat";
import ChatDef from "./user/ChatDef";

const MainRouter = () => (
    <div>
        <div>
            
                  {isAuthenticated() && <Menus />}
            
                  </div>
                  <div className='conaiter'>
        <Switch>
        <Route exact path="/" component={isAuthenticated() ? Home : Signin } />

            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
            <PrivateRoute exact path="/post/create" component={NewPost} />
            <Route exact path="/post/:postId" component={SinglePost} />
            <PrivateRoute exact path="/post/edit/:postId" component={EditPost} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <PrivateRoute exact path="/user/:userId" component={Profile} />
            <PrivateRoute exact path="/findpeople" component={FindPeople} />
            <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
            <PrivateRoute exact path="/chat/:user1Id/:user2Id" component={Chat} />
            <PrivateRoute exact path="/chats/:userId" component={ChatDef} />
            <Route exact path="" component={notfound} />

        </Switch>
        </div>
    </div>
);

export default MainRouter;