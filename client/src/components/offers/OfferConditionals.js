import React from 'react';

export function GetIfOffer(props) {
  //if not logged in
  if(!props.userID) {
    return <div></div>
  }

  //if my book && >= 1 requests
  if(props.username === props.book.current_owner && props.book.requestFrom.length > 0) {
    return (
      <div>
        {props.book.requestedFrom.map(user => 
          <div className="offerContainer">
            <div>user {user} wants {props.book.title}</div>
            <button onClick={props.accept} className="btn btn-secondary">unrequest</button>
          </div>
        )}
      </div>
    );
  }
   
  return <div></div>   
}

export function GetIfRequest(props) {
  //if not logged in
  if(!props.userID) {
    return <div></div>
  }

  //if I requested this book
  for(let i=0; i < props.book.requestedFrom.length; i++) {
    if(props.book.requestedFrom[i] === props.username) {
      return (
        <div className="singleOfferContainer">
          <div>you want {props.book.title}</div>
          <button onClick={props.unrequest} className="btn btn-secondary">unrequest</button>
        </div>
      );
    }
  }

  return <div></div>
}
