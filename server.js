const express = require("express");
const axios = require("axios").default
const app = express();
const PORT = 9898;

app.use(express.static("public"));

const DIBSY_SK = 'sk_live_bba02441e140a8abcdc4bdd8b89e4da70460'
// const DIBSY_SK = 'sk_test_bd56bdbd9858a2ba8ce8fb8384b8d34a87e9'
// const DIBSY_URL = 'https://api.dibsy.dev/v1'
const DIBSY_URL = 'http://localhost:5000/v1'

axios.defaults.baseURL = DIBSY_URL
axios.defaults.headers['content-type'] = 'application/json'
axios.defaults.headers['accept'] = 'application/json'
//we set default authorization header, to our secret key
axios.defaults.headers['Authorization'] = `bearer ${DIBSY_SK}`

app.post("/create-payment", async (req, res) => {
    try{
        //we call Dibsy api to create our payment, 
        const {data} = await axios({
            url:'/payments',
            method: 'POST',
            data:{
                // redirectUrl: "http://localhost:4545/thankyou/",
                customer:{
                    name:'Jone Doe',
                    email:'jhon@example.com',
                    phone:'+2126352321'
                },
                amount:13.75,
                description:'Purchase for order #65231',
                metadata:{
                    order_id:'65231'
                }
            }
        })
        //when the payment is created, the payment object will be returned.
        //in our example, we're only interested in paymentToken, so we return it to our frontend.
        return res.send(data.paymentToken);
    }
    catch(ex){
        console.log(ex);
        return res.status(500).send()
    }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
