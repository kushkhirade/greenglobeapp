import * as React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';

class MyForm extends React.Component {

  render() {
    return (
      <Form model="user" onSubmit={(val) => console.log(val)}>
        <label>Your name?</label>
        <Control.text model=".name" />
        <button>Submit!</button>
      </Form>
    );
  }
}

// No need to connect()!
export default MyForm;