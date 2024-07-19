

const bodyParser = require("body-parser");
const express = require("express");
const Stripe = require("stripe");

const base64 = require("base-64");
const axios = require("axios");
const env = require("dotenv");
env.config({ path: "./server/.env" });
const stripePublishableKey = process.env.STRIPE_PUBLIC_KEY|| "";
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";



const app = express();


const wooCommerceApiUrl = 'https://dev.cupmakes.com//wp-json/wc/v3/products';
const consumerKey = "ck_fd5c542c02aa26ba0073ab69b91b78585e72ca05";
const consumerSecret = "cs_48662918ad66d95f32f6e2ae55417a63c44fdbd6";


const headers = {
  Authorization: "Basic " + base64.encode(consumerKey + ":" + consumerSecret)
};


let allProducts = [];
let lastFetchTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

const fetchAllProducts = async () => {
  let page = 1;
  let fetchedProducts = [];
  let totalPages = 1;

  while (page <= totalPages) {
    const response = await axios.get(wooCommerceApiUrl, {
      headers: headers,
      params: { page, per_page: 100 }
    });
    fetchedProducts = fetchedProducts.concat(response.data);
    totalPages = parseInt(response.headers['x-wp-totalpages'], 10);
    page++;
  }

  allProducts = fetchedProducts;
  lastFetchTime = Date.now();
  console.log('Productos actualizados:', fetchedProducts.length);
};

// Middleware para parsear JSON
app.use(express.json());

// Ruta para manejar los webhooks de WooCommerce
app.post('/webhook', (req, res) => {
  const event = req.body.event;
  const productId = req.body.resource.id;

  if (['created', 'updated', 'deleted'].includes(event)) {
    fetchAllProducts(); // Actualiza todos los productos cuando ocurra un evento relevante
  }

  res.sendStatus(200);
});


const filterProducts = (products, filters) => {
  return products.filter(product => {
    if (filters.category && !product.categories.some(cat => cat.id == filters.category)) return false;
    if (filters.rating && product.average_rating < filters.rating) return false;
    if (filters.min_price && product.price < filters.min_price) return false;
    if (filters.max_price && product.price > filters.max_price) return false;
    if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
    return true;
  });
};

const sortProducts = (products, sortBy) => {
  if (sortBy === 'price_asc') {
    return products.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    return products.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    return products.sort((a, b) => b.average_rating - a.average_rating);
  } else {
    return products;
  }
};

app.get('/cupacakes/api/products', async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const perPage = parseInt(req.query.per_page, 10) || 10;
  const filters = {
    category: req.query.category ? parseInt(req.query.category, 10) : null,
    rating: req.query.rating ? parseFloat(req.query.rating) : null,
    min_price: req.query.min_price ? parseFloat(req.query.min_price) : null,
    max_price: req.query.max_price ? parseFloat(req.query.max_price) : null,
    search: req.query.search || null
  };
  const sortBy = req.query.sortBy;

  // Refrescar productos si el caché ha expirado
  if (Date.now() - lastFetchTime > CACHE_DURATION) {
    await fetchAllProducts();
    lastFetchTime = Date.now();
  }

  // Filtrar y ordenar productos
  let filteredProducts = filterProducts(allProducts, filters);
  let sortedProducts = sortProducts(filteredProducts, sortBy);

  // Paginación
  const start = (page - 1) * perPage;
  const end = start + perPage;
  const paginatedProducts = sortedProducts.slice(start, end);

  res.json({
    page: page,
    data: paginatedProducts,
    totalPages: Math.ceil(sortedProducts.length / perPage),
    totalProducts: sortedProducts.length
  });
});


// Inicializar la carga de productos
fetchAllProducts()

app.get("/", (req, res) => {
  res.send({ "Welome to": "Expo's Stripe example server!"+stripePublishableKey+"_"+stripeSecretKey });
  console.log(stripeSecretKey)
  console.log(stripePublishableKey)
});

const calculateOrderAmount = _order => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client.
  return 1400;
};

function getKeys(payment_method) {
  let secret_key = stripeSecretKey;
  let publishable_key = stripePublishableKey;

  switch (payment_method) {
    case "grabpay":
    case "fpx":
      publishable_key = process.env.STRIPE_PUBLISHABLE_KEY_MY;
      secret_key = process.env.STRIPE_SECRET_KEY_MY;
      break;
    case "au_becs_debit":
      publishable_key = process.env.STRIPE_PUBLISHABLE_KEY_AU;
      secret_key = process.env.STRIPE_SECRET_KEY_AU;
      break;
    case "oxxo":
      publishable_key = process.env.STRIPE_PUBLISHABLE_KEY_MX;
      secret_key = process.env.STRIPE_SECRET_KEY_MX;
      break;
    default:
      publishable_key = process.env.STRIPE_PUBLISHABLE_KEY;
      secret_key = process.env.STRIPE_SECRET_KEY;
  }

  return { secret_key, publishable_key };
}

app.get("/stripe-key", (req, res) => {

  const { publishable_key } = getKeys(req.query.paymentMethod);
console.log(`key : ${publishable_key}`)
  res.send({ publishableKey: publishable_key });
});

app.post("/create-payment-intent", async (req, res) => {
  const {
    email,
    items,
    currency,
    request_three_d_secure,
    payment_method_types = []
  } = req.body;

  const { secret_key } = getKeys(payment_method_types[0]);

  const stripe = new Stripe(secret_key, {
    apiVersion: "2020-08-27",
    typescript: true
  });

  const customer = await stripe.customers.create({ email });
  // Create a PaymentIntent with the order amount and currency.
  const params = {
    amount: calculateOrderAmount(items),
    currency,
    customer: customer.id,
    payment_method_options: {
      card: {
        request_three_d_secure: request_three_d_secure || "automatic"
      },
      sofort: {
        preferred_language: "en"
      }
    },
    payment_method_types: payment_method_types
  };

  try {
    const paymentIntent = await stripe.paymentIntents.create(params);
    // Send publishable key and PaymentIntent client_secret to client.
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  } catch (error) {
    res.send({
      error: error.raw.message
    });
  }
});

app.post("/create-payment-intent-with-payment-method", async (req, res) => {
  const { items, currency, request_three_d_secure, email } = req.body;
  const { secret_key } = getKeys();

  const stripe = new Stripe(secret_key, {
    apiVersion: "2020-08-27",
    typescript: true
  });
  const customers = await stripe.customers.list({
    email
  });

  // The list all Customers endpoint can return multiple customers that share the same email address.
  // For this example we're taking the first returned customer but in a production integration
  // you should make sure that you have the right Customer.
  if (!customers.data[0]) {
    res.send({
      error: "There is no associated customer object to the provided e-mail"
    });
  }
  // List the customer's payment methods to find one to charge
  const paymentMethods = await stripe.paymentMethods.list({
    customer: customers.data[0].id,
    type: "card"
  });

  if (!paymentMethods.data[0]) {
    res.send({
      error: `There is no associated payment method to the provided customer's e-mail`
    });
  }

  const params = {
    amount: calculateOrderAmount(items),
    currency,
    payment_method_options: {
      card: {
        request_three_d_secure: request_three_d_secure || "automatic"
      }
    },
    payment_method: paymentMethods.data[0].id,
    customer: customers.data[0].id
  };

  const paymentIntent = await stripe.paymentIntents.create(params);

  // Send publishable key and PaymentIntent client_secret to client.
  res.send({
    clientSecret: paymentIntent.client_secret,
    paymentMethodId: paymentMethods.data[0].id
  });
});

app.post("/pay-without-webhooks", async (req, res) => {
  const {
    paymentMethodId,
    paymentIntentId,
    items,
    currency,
    useStripeSdk,
    cvcToken,
    email
  } = req.body;

  const orderAmount = calculateOrderAmount(items);
  const { secret_key } = getKeys();

  const stripe = new Stripe(secret_key, {
    apiVersion: "2020-08-27",
    typescript: true
  });

  try {
    if (cvcToken && email) {
      const customers = await stripe.customers.list({
        email
      });

      // The list all Customers endpoint can return multiple customers that share the same email address.
      // For this example we're taking the first returned customer but in a production integration
      // you should make sure that you have the right Customer.
      if (!customers.data[0]) {
        res.send({
          error: "There is no associated customer object to the provided e-mail"
        });
      }

      const paymentMethods = await stripe.paymentMethods.list({
        customer: customers.data[0].id,
        type: "card"
      });

      if (!paymentMethods.data[0]) {
        res.send({
          error: `There is no associated payment method to the provided customer's e-mail`
        });
      }

      const params = {
        amount: orderAmount,
        confirm: true,
        confirmation_method: "manual",
        currency,
        payment_method: paymentMethods.data[0].id,
        payment_method_options: {
          card: {
            cvc_token: cvcToken
          }
        },
        use_stripe_sdk: useStripeSdk,
        customer: customers.data[0].id
      };
      const intent = await stripe.paymentIntents.create(params);
      res.send(generateResponse(intent));
    } else if (paymentMethodId) {
      // Create new PaymentIntent with a PaymentMethod ID from the client.
      const params = {
        amount: orderAmount,
        confirm: true,
        confirmation_method: "manual",
        currency,
        payment_method: paymentMethodId,
        // If a mobile client passes `useStripeSdk`, set `use_stripe_sdk=true`
        // to take advantage of new authentication features in mobile SDKs.
        use_stripe_sdk: useStripeSdk
      };
      const intent = await stripe.paymentIntents.create(params);
      // After create, if the PaymentIntent's status is succeeded, fulfill the order.
      res.send(generateResponse(intent));
    } else if (paymentIntentId) {
      // Confirm the PaymentIntent to finalize payment after handling a required action
      // on the client.
      const intent = await stripe.paymentIntents.confirm(paymentIntentId);
      // After confirm, if the PaymentIntent's status is succeeded, fulfill the order.
      res.send(generateResponse(intent));
    }
  } catch (e) {
    // Handle "hard declines" e.g. insufficient funds, expired card, etc
    // See https://stripe.com/docs/declines/codes for more.
    res.send({ error: e.message });
  }
});

app.post("/create-setup-intent", async (req, res) => {
  const { email, payment_method_types = [] } = req.body;
  const { secret_key } = getKeys(payment_method_types[0]);

  const stripe = new Stripe(secret_key, {
    apiVersion: "2020-08-27",
    typescript: true
  });
  const customer = await stripe.customers.create({ email });
  const setupIntent = await stripe.setupIntents.create({
    customer: customer.id,
    payment_method_types
  });

  // Send publishable key and SetupIntent details to client
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    clientSecret: setupIntent.client_secret
  });
});

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard:
// https://dashboard.stripe.com/test/webhooks
app.post(
  "/webhook",
  // Use body-parser to retrieve the raw body as a buffer.
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    const { secret_key } = getKeys();

    const stripe = new Stripe(secret_key, {
      apiVersion: "2020-08-27",
      typescript: true
    });
    // console.log('webhook!', req);
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"] || [],
        stripeWebhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      res.sendStatus(400);
      return;
    }

    // Extract the data from the event.
    const data = event.data;
    const eventType = event.type;

    if (eventType === "payment_intent.succeeded") {
      // Cast the event into a PaymentIntent to make use of the types.
      const pi = data.object;

      // Funds have been captured
      // Fulfill any orders, e-mail receipts, etc
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds).
      console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
      console.log("💰 Payment captured!");
    }
    if (eventType === "payment_intent.payment_failed") {
      // Cast the event into a PaymentIntent to make use of the types.
      const pi = data.object;
      console.log(`🔔  Webhook received: ${pi.object} ${pi.status}!`);
      console.log("❌ Payment failed.");
    }

    if (eventType === "setup_intent.setup_failed") {
      console.log(`🔔  A SetupIntent has failed the to setup a PaymentMethod.`);
    }

    if (eventType === "setup_intent.succeeded") {
      console.log(
        `🔔  A SetupIntent has successfully setup a PaymentMethod for future use.`
      );
    }

    if (eventType === "setup_intent.created") {
      const setupIntent = data.object;
      console.log(`🔔  A new SetupIntent is created. ${setupIntent.id}`);
    }

    res.sendStatus(200);
  }
);

// An endpoint to charge a saved card
// In your application you may want a cron job / other internal process
app.post("/charge-card-off-session", async (req, res) => {
  let paymentIntent, customer;

  const { secret_key } = getKeys();

  const stripe = new Stripe(secret_key, {
    apiVersion: "2020-08-27",
    typescript: true
  });

  try {
    // You need to attach the PaymentMethod to a Customer in order to reuse
    // Since we are using test cards, create a new Customer here
    // You would do this in your payment flow that saves cards
    customer = await stripe.customers.list({
      email: req.body.email
    });

    // List the customer's payment methods to find one to charge
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customer.data[0].id,
      type: "card"
    });

    // Create and confirm a PaymentIntent with the order amount, currency,
    // Customer and PaymentMethod ID
    paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(),
      currency: "usd",
      payment_method: paymentMethods.data[0].id,
      customer: customer.data[0].id,
      off_session: true,
      confirm: true
    });

    res.send({
      succeeded: true,
      clientSecret: paymentIntent.client_secret,
      publicKey: stripePublishableKey
    });
  } catch (err) {
    if (err.code === "authentication_required") {
      // Bring the customer back on-session to authenticate the purchase
      // You can do this by sending an email or app notification to let them know
      // the off-session purchase failed
      // Use the PM ID and client_secret to authenticate the purchase
      // without asking your customers to re-enter their details
      res.send({
        error: "authentication_required",
        paymentMethod: err.raw.payment_method.id,
        clientSecret: err.raw.payment_intent.client_secret,
        publicKey: stripePublishableKey,
        amount: calculateOrderAmount(),
        card: {
          brand: err.raw.payment_method.card.brand,
          last4: err.raw.payment_method.card.last4
        }
      });
    } else if (err.code) {
      // The card was declined for other reasons (e.g. insufficient funds)
      // Bring the customer back on-session to ask them for a new payment method
      res.send({
        error: err.code,
        clientSecret: err.raw.payment_intent.client_secret,
        publicKey: stripePublishableKey
      });
    } else {
      console.log("Unknown error occurred", err);
    }
  }
});

// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

app.post("/payment-sheet", async (req, res) => {
  try {
    const { secret_key } = getKeys();

    const {amount} = req.body;
    const parsedAmount = amount * 100; 
    
  console.log('secretKey :'+secret_key)
    const stripe = new Stripe(secret_key, {
      apiVersion: "2020-08-27",
      typescript: true
    });
  
    const customers = await stripe.customers.list();
  
    // Here, we're getting latest customer only for example purposes.
    const customer = customers.data[0];
  
    if (!customer) {
      res.send({
        error: "You have no customer created"
      });
    }
  
    const ephemeralKey = await stripe.ephemeralKeys.create(
      { customer: customer.id },
      { apiVersion: "2020-08-27" }
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(parsedAmount),
      currency: "usd",
      customer: customer.id
    });
    console.log(paymentIntent);
    res.json({
      paymentIntent: paymentIntent.client_secret,
      ephemeralKey: ephemeralKey.secret,
      customer: customer.id
    });
  } catch (error) {
    console.log('error on payment-sheet :'+error)
  }

});

app.listen(8080, () => console.log(`Node server listening on port ${8080}!`));

const generateResponse = intent => {
  // Generate a response based on the intent's status
  switch (intent.status) {
    case "requires_action":
      // Card requires authentication
      return {
        clientSecret: intent.client_secret,
        requiresAction: true,
        status: intent.status
      };
    case "requires_payment_method":
      // Card was not properly authenticated, suggest a new payment method
      return {
        error: "Your card was denied, please provide a new payment method"
      };
    case "succeeded":
      // Payment is complete, authentication not required
      // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds).
      console.log("💰 Payment received!");
      return { clientSecret: intent.client_secret, status: intent.status };
  }

  return {
    error: "Failed"
  };
};
// git
/*
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
  const { amount } = req.body;
let amountParsed = parseInt(amount).toFixed(2) * 100
console.log('amountParsed : '+amountParsed)
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
     
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
  });
});

app.post('/create-token', async (req, res) => {
  const stripe = new Stripe(secret_key,{
    apiVersion:'2024-06-20',
    typescript: false
  });
  const { cardNumber, expMonth, expYear, cvc } = req.body;

  try {
      const token = await stripe.tokens.create({
          card: {
              number: cardNumber,
              exp_month: expMonth,
              exp_year: expYear,
              cvc: cvc,
          },
      });
      res.json({ token });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});

app.listen(8000, () => console.log('Server running on port 8000'));
*/