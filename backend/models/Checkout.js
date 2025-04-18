const mongoose = require("mongoose");

const checkoutItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const checkoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkoutItems: [checkoutItemSchema],
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    paymentDetails: {
      type: mongoose.Schema.Types.Mixed,
      // Store payment-related details(transaction ID, paypal response)
    },
    isFinalized: {
      type: Boolean,
      default: false,
    },
    finalizedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Checkout", checkoutSchema);

// <============================== Checkout Item Schema ==================================>
//
// | Field     | Type                   | Required   | Description                              |
// |-----------|------------------------|------------|------------------------------------------|
// | productId | ObjectId (ref: Product)| Yes        | The ID of the product.                   |
// | name      | String                 | Yes        | The name of the product.                 |
// | image     | String                 | Yes        | The URL of the product image.            |
// | price     | Number                 | Yes        | The price of the product.                |
// | size      | String                 | No         | The size of the product (e.g., apparel). |
// | color     | String                 | No         | The color of the product.                |
// | quantity  | Number                 | Yes        | The quantity of the product in the cart. |

// <============================== Checkout Schema ==================================>
//
// | Field           | Type                      | Required   | Description                                                    |
// |-----------------|---------------------------|------------|----------------------------------------------------------------|
// | user            | ObjectId (ref: User)      | Yes        | The ID of the user associated with the checkout.               |
// | checkoutItems   | Array of CheckoutItems    | Yes        | The list of items included in the checkout.                    |
// | shippingAddress | Object                    | Yes        | Contains shipping details (address, city, etc.).              |
// | address         | String                    | Yes        | Shipping address of the user.                                  |
// | city            | String                    | Yes        | City for shipping.                                             |
// | postalCode      | String                    | Yes        | Postal code for shipping.                                      |
// | country         | String                    | Yes        | Country for shipping.                                          |
// | paymentMethod   | String                    | Yes        | Payment method used (e.g., PayPal).                           |
// | totalPrice      | Number                    | Yes        | Total price of all items in the checkout.                      |
// | isPaid          | Boolean                   | No         | Indicates whether the checkout is paid.                        |
// | paidAt          | Date                      | No         | Timestamp when the payment was made.                           |
// | paymentStatus   | String                    | No         | Status of the payment (pending, paid, etc.).                  |
// | paymentDetails  | Mixed                     | No         | Stores details about the payment (e.g., transaction ID).       |
// | isFinalized     | Boolean                   | No         | Indicates if the checkout has been converted to an order.      |
// | finalizedAt     | Date                      | No         | Timestamp when the checkout was finalized.                     |
// | timestamps      | Date                      | Auto       | Mongoose will auto-create createdAt and updatedAt.             |
