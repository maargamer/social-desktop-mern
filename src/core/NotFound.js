import React, { useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';

import './notfound.css';
const ESCAPE_KEYS = ["27", "Enter"];
const useEventListener = (eventName, handler, element = window) => {

  
  const savedHandler = useRef();

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => {
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

function NotFound  ()  {
  const history = useHistory();
 
  function handler  ({ key }) {
  
    if (ESCAPE_KEYS.includes(String(key))) {
  
      history.push('/');
    }
  }
  useEventListener("keydown", handler);

  
  return (
    <div style={{ 
      background: "#000084", 

      height: 1020,
      marginTop: "-10px",
      textAlign: "center"   


  }}>
    <div class="notfound"  >

    <div class="centered"><span class="inverted">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>&nbsp;</div>
    <div class="centered"><span class="inverted">&nbsp;4&nbsp;0&nbsp;4&nbsp;</span><span class="shadow">&nbsp;</span></div>
    <div class="centered"><span class="inverted">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span class="shadow">&nbsp;</span></div>
    <div class="centered">&nbsp;<span class="shadow">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
    <div class="row">&nbsp;</div>
    <div class="row">A fatal exception 404 has occurred at C0DE:ABAD1DEA in 0xC0DEBA5E.</div>
    <div class="row">The current request will be terminated.</div>
    <div class="row">&nbsp;</div>
    <div class="row">* Press Enter to return to the previous page.</div>
    <div class="row">* Press CTRL+ALT+DEL to restart your computer. You will</div>
    <div class="row">&nbsp;&nbsp;lose any unsaved information in all applications.</div>
    <div class="row">&nbsp;</div>
    <div class="centered">Press Enter to continue...<span class="blink">&#9608;</span></div>
</div>
</div>
  );
}

export default NotFound;
