import * as React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';

class MyForm extends React.Component {

  render() {
    return (
      // <div>
      fetchAsBlob(`https://fonts.gstatic.com/s/roboto/v16/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2`)
    .then(convertBlobToBase64)
   .then(console.log)
    //  <Form model="user" onSubmit={(val) => console.log(val)}>
    //     <label>Your name?</label>
    //     <Control.text model=".name" />
    //     <button>Submit!</button>
    //   </Form>

    //   <Form model="userForm" onSubmit={(val) => console.log(val)}>
    //   <label>Your name?</label>
    //   <Control.text model=".Fname" />
    //   <Control.text model=".lname" />
    //   <button>Submit!</button>
    //   </Form> 
      // </div>
    );
  }
}

export const fetchAsBlob = url => fetch(url)
    .then(response => response.blob());

export const convertBlobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});


// No need to connect()!
export default MyForm;