const express = require("express");
const knex = require("../knex.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const { customer_name, customer_address, customer_email, items, status } = req.body;

  if (!customer_name || !customer_address || !customer_email || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  try {
    const total_price = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const [newOrder] = await knex("orders").insert({
      customer_name,
      customer_address,
      customer_email,
      total_price,
      status: status || "pending",
    })
    .returning("*");

    const orderItems = items.map(item => ({
      order_id: newOrder.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      price: item.price,
      introduction: item.introduction || null,
    }));

    await knex("order_items").insert(orderItems);

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
})

module.exports = router;
