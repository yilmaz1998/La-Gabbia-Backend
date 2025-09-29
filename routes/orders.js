const express = require("express");
const knex = require("../knex.js");
require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
      instruction: item.instruction || null,
    }));

    await knex("order_items").insert(orderItems);

    const mail = {
      from: process.env.EMAIL_USER,
      to: customer_email,
      subject: `Order Confirmation - #${newOrder.id}`,
      html: `
        <h3>Hello ${customer_name},</h3>
        <p>Thank you! Your order has been successfully received.</p>
        <p><strong>Order Number:</strong> ${newOrder.id}</p>
        <p><strong>Total:</strong> $${total_price.toFixed(2)}</p>
        <p><strong>Delivery Address:</strong> ${customer_address}</p>
        <h4>Order Details:</h4>
        <ul>
          ${items.map(i => `
            <li>
              ${i.quantity} x ${i.name} — $${i.price}
              ${i.instruction ? `<br><em>Instruction: ${i.instruction}</em>` : '<br><em>No special instructions</em>'}
            </li>
          `).join("")}
        </ul>
        <p>Status: ${newOrder.status}</p>
        <p>We hope you enjoy your meal!</p>  `
    };

    await transporter.sendMail(mail);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
})

module.exports = router;
