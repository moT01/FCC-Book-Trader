import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup';
import { addNewBook } from '../../actions/bookActions';
import { connect } from 'react-redux';
import { addFlashMessage } from '../../actions/flashMessages.js';
import PropTypes from 'prop-types'

class NewBookForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isbn: '',
      userID: this.props.id,
      username: this.props.username,
      errors: {},
      isLoading: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    this.setState({[e.target.name]: e.target.value});
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addNewBook(this.state).then(() => {
      this.props.addFlashMessage({
        type: this.props.messages.messageType,
        text: this.props.messages.messageMessage
      });
    });
  }

  render() {
    const { isbn, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <h1> My Books </h1>
        <TextFieldGroup
          field="isbn"
          label="Add a new ISBN"
          name="isbn"
          value={isbn}
          onChange={this.onChange}
          error={errors.isbn}
          />
        <button type="submit" disabled={isLoading} className="btn btn-primary">Add</button>
      </form>
    );
  }
}

NewBookForm.propTypes = {
  addNewBook: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
    	messages: state.books.message,
      id: state.auth.user.id,
      username: state.auth.user.username
    }
}

export default connect(mapStateToProps, {addNewBook, addFlashMessage})(NewBookForm);
