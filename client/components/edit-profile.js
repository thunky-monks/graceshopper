import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { editUser } from '../store/user';
import { Form, Icon, Button } from 'semantic-ui-react';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...this.props.user };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    const firstName = evt.target.firstName.value;
    const lastName = evt.target.lastName.value;
    const email = evt.target.email.value;
    const address = evt.target.address.value;
    this.props.editUser({
      firstName,
      lastName,
      email,
      address,
      id: this.state.id
    });
    this.props.history.push('/home');
  }

  // componentDidMount() {
  //   this.setState({
  //     firstName: this.props.user.firstName,
  //     lastName: this.props.user.lastName,
  //     address: this.props.user.address,
  //     email: this.props.user.email
  //   });
  // }

  render() {
    console.log('RENDERING');
    return (
      <div className="profile">
        <span className="right floated">
          <Link to="/home">
            <Icon id="edit-icon" name="edit outline" />
          </Link>
        </span>
        <div className="Form">
          <Form onSubmit={this.handleSubmit} name={name}>
            <Form.Field>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input
                name="firstName"
                type="text"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input
                name="lastName"
                type="text"
                onChange={this.handleChange}
                value={this.state.lastName}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label htmlFor="email">
                <small>Email</small>
              </label>
              <input
                name="email"
                type="text"
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label htmlFor="address">
                <small>Address</small>
              </label>
              <textarea
                name="address"
                type="text"
                onChange={this.handleChange}
                value={this.state.address}
              />
            </Form.Field>
            <br />
            <div>
              <Button type="submit">Save Changes</Button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    editUser: user => dispatch(editUser(user))
  };
};

export default connect(state => ({ user: state.user }), mapDispatch)(
  EditProfile
);
