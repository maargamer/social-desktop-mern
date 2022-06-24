//import useState hook to create menu collapse state
import React, { useState } from "react";
import { Link, useLocation } from 'react-router-dom';

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent
} from "react-pro-sidebar";

//import icons from react icons
import {  FaAddressBook, FaMedapps, FaRegHeart } from "react-icons/fa";
import {
FiUser,
FiMessageCircle,
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle
} from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import { signout, isAuthenticated } from "../auth/Index";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./menu.css";
window.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("menu-btn");
    const minimizeButton = document.getElementById("minimize-btn");
    const maxUnmaxButton = document.getElementById("max-unmax-btn");
    const closeButton = document.getElementById("close-btn");
  
  
 
  
   
  });
const Menus = (props,history) => {
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  const location = useLocation();

  return (
    
      <div id="header">
    
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            
            <div className="logotext">
                
              {/* small and big change using menucollapse state */}
              <p> {menuCollapse ?             <i className="fas fa-search mr-2"></i> :             <i  className="fas fa-search mr-2">  Maarweb</i> }</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
                <Link to='/' >

              <MenuItem active={location.pathname === "/"} icon={<FiHome />}>
                Home
              </MenuItem>
              </Link>
             
              <MenuItem active={location.pathname === "/findpeople"} icon={<FaAddressBook />}>                <Link to='/findpeople' />find People</MenuItem>
              <MenuItem active={location.pathname === `/chats/${isAuthenticated().user._id}`} icon={<FiMessageCircle />}> <Link to={`/chats/${isAuthenticated().user._id} `} />Chats</MenuItem>
              <MenuItem  active={location.pathname === "/post/create"} icon={<RiPencilLine />}><Link to='/post/create'/>Create Post</MenuItem>
 
              <MenuItem active={location.pathname === `/user/${isAuthenticated().user._id}`} icon={<FiUser />}>
              <Link to={`/user/${isAuthenticated().user._id}`}></Link>Settings</MenuItem>
              
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem                                 onClick={ signout}
icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
   
  );
};

export default  Menus;
