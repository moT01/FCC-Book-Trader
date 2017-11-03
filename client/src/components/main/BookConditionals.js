import React from 'react';

export function GetIfIsMyBook(props) {
  //if not logged in
  if(!props.userID) {
    return <div></div>  
  }
	
  return <div className="btn btn-danger">Delete</div>
}