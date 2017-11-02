import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import './NavigationBar.css';

class NavigationBar extends React.Component {
  logout(e){
    e.preventDefault();
    this.props.logout();
  }
  render(){
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="navbarButtonContainer">
        <li className="singleButtonContainer"><Link to="/" className="navbarButton"}>Browse</Link></li>
        <li className="singleButtonContainer"><Link to="/my-books" className="navbarButton"}>My Books</Link></li>
        <li className="singleButtonContainer"><Link to="/offers" className="navbarButton"}>Offers</Link></li>
        <li className="singleButtonContainer"><Link to="/settings" className="navbarButton"}>Settings</Link></li>
        <li className="singleButtonContainer"><Link to="#" className="navbarButton" onClick={this.logout.bind(this)}>logout</Link></li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbarButtonContainer">
        <li className="singleButtonContainer"><Link to="/signup" className="navbarButton">Sign up</Link></li>
        <li className="singleButtonContainer"><Link to="/login" className="navbarButton">login</Link></li>
      </ul>
    );

    return (
      <nav className="navbarContainer">
        <div className="singleButtonContainer"><Link to="/" className="navbarBrand">bookTrader</Link></div>

        { isAuthenticated ? userLinks : guestLinks }
      </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps, { logout })(NavigationBar);
