import Stripe from "stripe";
import handler from "../util/handler";
import { calculateCost } from "../util/cost";

export const main = handler(async (event) => {
  // storage - the number of notes the user would like to store in his account.
  // source - the Stripe token for the card that we are going to charge.
  const { storage, source } = JSON.parse(event.body);
  // how much to charge a user based on the number of notes that are going to be stored
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the  environment variables & create a new Stripe object
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  // charge the user and respond to the request if everything went through successfully.
  await stripe.charges.create({
    source,
    amount,
    description,
    currency: "usd",
  });

  return { status: true };
});
