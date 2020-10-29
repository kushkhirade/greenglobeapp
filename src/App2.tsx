import * as React from 'react';
import { connect } from 'react-redux';
import { Control, Form } from 'react-redux-form';

class MyForm extends React.Component {
  // state={arr:  ["one", "two", "three"
  //   // {url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png'url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png' },
  //   // {url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/IumpHh.png'},
  //   // {url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/HdqHLP.png'},
  //  ],}
   constructor(props){
    super(props);
    this.state = {
        data : ["2020-05-14","2020-05-24","2020-05-04","2020-05-10"],
        list:[
        // { index: "05",  price: "2000", url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png' },
        // { index: "1",  price: "1250", url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png'},
        // { index: "2",  price: "1299", url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png' },
        // { index: "3",  price: "1299", url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png' },
        // { index: "4",  price: "2500", url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png' },
        // { index: "5",  price: "2399", url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png' },
        // { index: "6", price: "2000", url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png' },
        // { index: "6", price: "2000", url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png' },
        // { index: "6", price: "2000", url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png' },
        // { index: "78", price: "2000", url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png' },
        // { index: "7",  price: "1699", url:'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png' }
      ]
    };
}    

handleShowImages=()=>{
  return(
    <div>
      <button 
      onClick={() => this.onRemoveItem(2)}
      // onClick={() => this.setState({data :this.state.data.sort((a,b) => new Date(...a.split('-').reverse()) - new Date(...b.split('-').reverse()) )})}
      >
        ASC
      </button>
      <button onClick={ () => {
        const arr = this.state.list;
        arr.push({url: 'https://bucketeer-c550d01e-0ac2-41dc-a762-e083c38260fa.s3.eu-west-1.amazonaws.com/images/w9ASz7.png'})
        this.setState({ list: arr});
      }}
      // onClick={() => this.setState({data :this.state.data.sort((a,b) => new Date(...b.split('-').reverse()) - new Date(...a.split('-').reverse()) )})}
      >
        DESC
      </button>
      { this.state.list.map((product, index) =>
        <div  className="card">
          <img src={product.url} ></img>
        </div>
      )}
    </div>
  )
}
uniqueArray =() => {
  const data = this.state.list;
  data.push({ index: "6",  price: "3000" })
  var unique = data.map(item => item.price)
              .filter((value, index, self) => self.indexOf(value) === index);
  console.log("unique : ", unique);
  this.setState({data2 :null})
  this.state.list.push(unique)
  console.log("data2 : ", this.state.data2);
}
onRemoveItem = (rem) => {
  const arr = this.state.list;
  arr.pop()
  this.setState({list : arr})
};
// iterateArray = () => {
//   const a = this.state.list[6].price === "5000"
//   console.log(this.state.list[5].price === "2399")
//   const arr = this.state.list.filter((item) => item.price === "7777"? item.index = 77: null)
//   if(arr.length === 0 ){
//     this.state.list.push({ index: "99",  price: "9999" })
//   }
//   console.log(this.state.list)
  
// }
render() {
  // const uniqueArray = products.filter((v, i, a) => a.indexOf(v) === i);
  // console.log("uniqueArray : ", uniqueArray);
  // console.log("this.state.list : ", this.state.list);
  // const d = "5/5/2025";
  // console.log(moment(d).format("YYYY/MM/DD"));

  // const phone = "123-756-7890";
  // // console.log(moment(phone).format("(###)"));

  // const date = new Date() - new Date("2020-05-04");
  // console.log(date)
  return (
    <div>
    Sorteren:
      {/* <button onClick={() => this.iterateArray()}> */}
      
      <div >
        {this.handleShowImages() }
      </div>
    </div>
  )
}
}
  // render() {
  //   return (
  //     // <div>
  //     fetchAsBlob(`https://fonts.gstatic.com/s/roboto/v16/d-6IYplOFocCacKzxwXSOJBw1xU1rKptJj_0jans920.woff2`)
  //   .then(convertBlobToBase64)
  //  .then(console.log)
  //   //  <Form model="user" onSubmit={(val) => console.log(val)}>
  //   //     <label>Your name?</label>
  //   //     <Control.text model=".name" />
  //   //     <button>Submit!</button>
  //   //   </Form>

  //   //   <Form model="userForm" onSubmit={(val) => console.log(val)}>
  //   //   <label>Your name?</label>
  //   //   <Control.text model=".Fname" />
  //   //   <Control.text model=".lname" />
  //   //   <button>Submit!</button>
  //   //   </Form> 
  //     // </div>
  //   );
  // }


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