const router = require("express").Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = "sk_test_51NEFePSESbIKt5anfNkNLUBmXOVDSQGVRaPjwOnwQwFOMkn3gCDqs0uZFjmW4FCtG7BDqpkLXIPrvPMFeg5Ij8V800ZTUUDa6F"
const stripe = require("stripe")(KEY);

router.post("/payment", (req, res) => {
  stripe.paymentIntents.create(
    {
      token: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;