import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
//import validateInput from '../../shared/validations/settings';
import { addFlashMessage } from '../../actions/flashMessages.js';
import { connect } from 'react-redux';
import { changeSettings } from '../../actions/signupActions';
import PropTypes from 'prop-types';



class SettingsForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userID: this.props.id,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      city: this.props.city,
      state: this.props.state,
      zipcode: this.props.zipcode,
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  /*isValid(){
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }*/

  onSubmit(e){
    e.preventDefault();
    //if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true});
      this.props.changeSettings(this.state).then(
        (res) => {
          this.setState({isLoading: false});
          this.props.addFlashMessage({
          type: 'success',
          text: 'Your settings have been saved.'
        })}
        //server verification to be added
        //,(err) => this.setState({ errors: err.response.data.errors, isLoading: false})
      );
    //}
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }
 
  render() {
    let { errors, firstName, lastName, city, state, zipcode, isLoading} = this.state;
    console.log(this.props.globalState);

    return(
      <form onSubmit={this.onSubmit}>
        <h1>Settings</h1>

        {errors.form && <div className="alert alert-danger">{errors.form}</div>}
        <TextFieldGroup
          field="firstName"
          label="First Name"
          value={firstName}
          onChange={this.onChange}
          type="firstName"
        />
        
        <TextFieldGroup
          field="lastName"
          label="Last Name"
          value={lastName}
          onChange={this.onChange}
          type="lastName"
        />
        
        <TextFieldGroup
          field="city"
          label="City"
          value={city}
          onChange={this.onChange}
          type="city"
        />
        
        <TextFieldGroup
          field="state"
          label="State"
          value={state}
          onChange={this.onChange}
          type="state"
        />
        
        <TextFieldGroup
          field="zipcode"
          label="Zipcode"
          value={zipcode}
          error={errors.zipcode}
          onChange={this.onChange}
          type="zipcode"
        />
      <div className="form-goup"><button className="btn btn-primary btn-lg" disabled={isLoading}>Change</button></div>
      </form>
    );
  }
}

SettingsForm.propTypes = {
  changeZip: PropTypes.func.isRequired
}

SettingsForm.contextTypes = {
  router: PropTypes.object.isRequired
}


function mapStateToProps(state) {
    return {
    	globalState: state,
      id: state.auth.user.id,
      firstName: state.auth.user.firstName,
      lastName: state.auth.user.lastName,
      city: state.auth.user.city,
      state: state.auth.user.state,
      zipcode: state.auth.user.zipcode,
    }
}

export default connect(mapStateToProps, {changeSettings, addFlashMessage}) (SettingsForm);
