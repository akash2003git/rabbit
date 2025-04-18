const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
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
    size: String,
    color: String,
    quantity: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    orderItems: [orderItemSchema],
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
    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    staus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },
  },
  { timeseries: true },
);

module.exports = mongoose.model("Order", orderSchema);

// <=========================== Order Item Schema =============================>
//
// | Field     | Type                   | Required   | Description                               |
// |-----------|------------------------|------------|-------------------------------------------|
// | productId | ObjectId (ref: Product)| Yes        | The ID of the product.                    |
// | name      | String                 | Yes        | The name of the product.                  |
// | image     | String                 | Yes        | The URL of the product image.             |
// | price     | Number                 | Yes        | The price of the product.                 |
// | size      | String                 | No         | Size of the product (e.g., apparel).      |
// | color     | String                 | No         | Color of the product.                     |
// | quantity  | Number                 | Yes        | The quantity of the product in the order. |
//
// <=========================== Order Schema ================================>
//
// | Field           | Type                    | Required   | Description                                              |
// |-----------------|-------------------------|------------|----------------------------------------------------------|
// | user            | ObjectId (ref: User)    | Yes        | The ID of the user who placed the order.                 |
// | orderItems      | Array of OrderItems     | Yes        | The list of items included in the order.                 |
// | shippingAddress | Object                  | Yes        | Shipping details including address, city, etc.           |
// | address         | String                  | Yes        | The full shipping address.                               |
// | city            | String                  | Yes        | The city for shipping.                                   |
// | postalCode      | String                  | Yes        | The postal code for shipping.                            |
// | country         | String                  | Yes        | The country for shipping.                                |
// | paymentMethod   | String                  | Yes        | Payment method used (e.g., Credit Card, PayPal).         |
// | totalPrice      | Number                  | Yes        | Total price of all items in the order.                   |
// | isPaid          | Boolean                 | No         | Indicates whether the order has been paid.               |
// | paidAt          | Date                    | No         | Timestamp when the payment was made.                     |
// | isDelivered     | Boolean                 | No         | Indicates whether the order has been delivered.          |
// | deliveredAt     | Date                    | No         | Timestamp when the order was delivered.                  |
// | paymentStatus   | String                  | No         | Payment status (pending, paid, etc.).                    |
// | status          | String                  | No         | Order status (Processing, Shipped, Delivered, Cancelled).|
// | timestamps      | Date                    | Auto       | Auto-created fields for createdAt and updatedAt.         |
