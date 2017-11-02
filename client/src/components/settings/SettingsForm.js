import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../shared/validations/login';
import { connect } from 'react-redux';
import { changeZip } from '../../actions/signupActions';
import PropTypes from 'prop-types';


class SettingsForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      zip: '',
      errors: {},
      isLoading: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid(){
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  onSubmit(e){
    e.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true});
      this.props.changeZip(this.state).then(
        (res) => this.props.addFlashMessage({
          type: 'success',
          text: 'Your zipcode has changed successfully.'
        }),
        (err) => this.setState({ errors: err.response.data.errors, isLoading: false})
      );
    }
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const { errors, zipcode, isLoading} = this.state;
    return(
      <form onSubmit={this.onSubmit}>
        <h1>Settings</h1>

        { errors.form && <div className="alert alert-danger">{errors.form}</div> }

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
  //login: PropTypes.func.isRequired
}

SettingsForm.contextTypes = {
  router: PropTypes.object.isRequired
}
//{ login }
export default connect(null, {changeZip}) (SettingsForm);
