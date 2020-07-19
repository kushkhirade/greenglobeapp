import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import { combineForms } from 'react-redux-form';

// import MyForm from './App2';

// const initialUser = { name: '' };

// const store = createStore(combineForms({
//   user: initialUser,
// }));

// class Appxyz extends React.Component {
//   render() {
//     return (
//       <Provider store={ store }>
//         <MyForm />
//       </Provider>
//     );
//   }
// }

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement);
registerServiceWorker();
