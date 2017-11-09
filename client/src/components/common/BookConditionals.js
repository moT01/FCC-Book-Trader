import React from 'react';

export function GetBookStatus(props) {
  //if not logged in
  if(!props.userID) {
    return <div></div>
  }

  //if my book  
  if(props.username === props.book.current_owner) {
    return <button onClick={props.deleteBook} className="btn btn-danger bookButtonRight">delete</button>
  }
  
  //if I already requested
  for(let i=0; i<props.book.requested_From.length; i++) {
    if (props.book.requested_From[i] === props.username) {
      return <button onClick={props.unrequestBook} className="btn btn-secondary bookButtonRight">unrequest</button>
    }
  }
  
  //if not my book - and not already requested by me
  if(props.username !== props.book.current_owner) {
    return <button onClick={props.requestBook} className="btn btn-primary bookButtonRight">request</button>
  } 

  return <div></div>
}
