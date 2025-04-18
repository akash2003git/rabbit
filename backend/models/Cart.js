const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: String,
    image: String,
    price: String,
    size: String,
    color: String,
    quantity: {
      type: Number,
      default: 1,
      required: true,
    },
  },
  { _id: false },
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    products: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Cart", cartSchema);

// <=========================== Cart Item Schema ==================================>
// | Field     | Type       | Reference   | Required   | Default   | Description                                    |
// |-----------|------------|-------------|------------|-----------|------------------------------------------------|
// | productId | ObjectId   | Product     | Yes        | -         | Reference to the product added to the cart.    |
// | name      | String     | -           | No         | -         | Name of the product.                           |
// | image     | String     | -           | No         | -         | URL of the product image.                      |
// | price     | String     | -           | No         | -         | Price of the product.                          |
// | size      | String     | -           | No         | -         | Size of the product (e.g., S, M, L).           |
// | color     | String     | -           | No         | -         | Color of the product (e.g., Red, Blue).        |
// | quantity  | Number     | -           | No         | 1         | Quantity of the product in the cart.           |

// <========================================== Cart Schema ==================================================>
//
// | Field       | Type                    | Reference   | Required    | Default              | Description                                     |
// |-------------|-------------------------|-------------|-------------|----------------------|-------------------------------------------------|
// | user        | ObjectId                | User        | No          | -                    | Reference to the logged-in user owning the cart.|
// | guestId     | String                  | -           | No          | -                    | Unique identifier for a guest user's cart.      |
// | products    | Array of CartItemSchema | -           | Yes         | -                    | List of products in the cart.                   |
// | totalPrice  | Number                  | -           | Yes         | 0                    | Total price of all items in the cart.           |
// | timestamps  | Object                  | -           | Auto-Managed| createdAt, updatedAt | Automatically managed by Mongoose.              |
