/*
const express = require('express');
const cors = require('cors');
const app = express();
const Stripe = require('stripe')
const port = 8000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const secret_key = "sk_test_51P4caFDrtegwEnl3dVHanrC9VxeG45YVOFHkVorMg5DAfWHlTnE7GQhWdnDDmK3ugIFXKlO9BnS9iG991zvJfXcr00Twa8Jcbf"

const stripe = new Stripe(secret_key);

app.get('/',(req,res)=>{
    res.json({
        msg: "data ok",

    })
})


// metodo post
app.post('/payment-sheet', async (req,res) => {

  if(req.body=== undefined){
    return res.status(400).json({
      mensaje: 'datos obligatorios'
  })
  }

try {
    const customers = await stripe.customers.list();
 
    const customer = customers.data[0];
   
    if(!customer){
       return res.send({error: 'You have not customer created'});
    }
    console.log('customer :'+customer)
    
    const ephemeralKey = await stripe.ephemeralKeys.create({ customer: customer.id},{apiVersion: '2024-06-20'});

    console.log('ephmeral :'+ephemeralKey)
   
 
    const paymentIntent = await stripe.paymentIntents.create({
       amount: '5099',
       currency: 'usd',
       customer: customer.id,
      // shipping: defaultShippingDetails,
       payment_method_types: ['card']
    });
   console.log('payment :'+paymentIntent)
   
   res.status(201).json({
     mensaje: 'Cliente registrado corectamente',
     paymentIntent: paymentIntent.client_secret,
     ephemeralKey: ephemeralKey.secret,
     customer: customer.id
   })
} catch (error) {
    return res.status(400).json(`Error ${error}`)
}

});



  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
  });

*/

const express = require('express');
const Stripe = require('stripe');
const app = express();
app.use(express.json());
const secret_key = "sk_test_51P4caFDrtegwEnl3dVHanrC9VxeG45YVOFHkVorMg5DAfWHlTnE7GQhWdnDDmK3ugIFXKlO9BnS9iG991zvJfXcr00Twa8Jcbf"

app.get('/',(req,res)=>{
    res.json({
        msg: "data ok",

    })
})

app.post('/payment-sheet', async (_, res) => {
  //const { amount } = req.body;
const stripe = new Stripe(secret_key,{
  apiVersion:'2024-06-20',
  typescript: false
});
  const customers = await stripe.customers.list();
  const customer = customers.data[0];
   
  if(!customer){
     return res.send({error: 'You have no customer created'});
  }
  console.log('customer :'+customer);


  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: '2024-06-20' }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: '5099',
    currency: 'usd',
    customer: customer.id,
      payment_method_types: ['card']
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

app.listen(8000, () => console.log('Server running on port 8000'));
