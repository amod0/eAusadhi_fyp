// import myKey from "./KhaltiKey";
// // import Product from "../Product";
// import axios from "axios";

// const order = { totalPrice: 1000 }; // Example order object
// let totalPriceInPaisa = order.totalPrice * 100;
// const config = {
//     "publicKey": myKey.publicTestKey,
//     "productIdentity": "123112",
//     "productName": "eAusadhi",
//     "productUrl": "http://localhost:3000/",
//     "eventHandler": {
//         onSuccess (payload) {
//             // hit merchant api for initiating verfication
//             console.log(payload);
//             let data = {
//                 "token": payload.token,
//                 "amount": payload.totalPriceInPaisa,
//               };
//             console.log(data);
          
              
//               // let config = {
//               //   headers: {'Authorization': myKey.secretKey },
//               // };
//         //       axios
//         //       .get(`https://meslaforum.herokuapp.com/khalti/{payload.token}/${data.amount}/${myKey.secretKey}`)
//         //       .then(response => {
//         //         console.log(response.data);
//         //         alert('Thank you')
//         //       })
//         //       .catch(error => {
//         //         console.log(error);
//         //       });
//         // }
              
//               axios
//               // .get(`http://localhost:3000/api/config/khalti/{payload.token}/${data.totalPriceInPaisa}/${myKey.secretKey}`,{
//               .post('/api/orders/verify-payment', {
//                 token: payload.token, // Assuming payload.token contains the payment token from Khalti
//                 amount: totalPriceInPaisa, // Assuming data.amount contains the payment amount
//                 // orderId: _id, // Assuming order contains the order object
//               }, 
//               {
//                 headers: {
//                   Authorization: `Key ${myKey.secretKey}`, // Assuming myKey.secretKey contains your Khalti secret key
//                   'Content-Type': 'application/json',
//                 }
//               })
//               .then(response => {
//                 console.log(response.data);
//                 alert('Thank you');
//               })
//               .catch(error => {
//                 console.log(error);
//               });
//             },
//         // onError handler is optional
//         onError (error) {
//             // handle errors
//             console.log(error);
//         },
//         onClose () {
//             console.log('widget is closing');
//         }
//     },
//     "paymentPreference": [
//       "KHALTI", 
//       "EBANKING",
//       "MOBILE_BANKING", 
//       "CONNECT_IPS", 
//       "SCT"],
// };

// export default config
