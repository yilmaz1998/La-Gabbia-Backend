const express = require("express");
const knex = require('../knex.js');
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
  const { username, password } = req.body;
  const adminUser = {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
  };

  if (username === adminUser.username && password === adminUser.password) {
    const token = jwt.sign({ username, isAdmin: true }, process.env.SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
} catch (error) {
  console.error(error);
  res.status(500).json({ error: "Login failed" });
};
})

router.get("/orders", adminAuth, async (req, res) => {
  try {
    const orders = await knex("orders").select("*").orderBy("created_at", "desc");

    const detailedOrders = await Promise.all(orders.map(async (order) => {
      const items = await knex("order_items")
        .join("menu_items", "order_items.menu_item_id", "menu_items.id")
        .where("order_items.order_id", order.id)
        .select("menu_items.name", "order_items.quantity", "order_items.price", "order_items.instruction");

      return { ...order, items };
    }));
    res.json(detailedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.patch("/orders/:id/status", adminAuth, async (req, res) => {
    const { id } = req.params;
    try {
        const order = await knex("orders").where({ id }).first();
        if (!order) {
        return res.status(404).json({ error: "Order not found" });
        }
        
        const statusSequence = ["pending", "preparing", "out for delivery"];
        const currentStatusIndex = statusSequence.indexOf(order.status);

        if (currentStatusIndex === -1 || currentStatusIndex === statusSequence.length - 1) {
        return res.status(400).json({ error: "Order is already delivered or has invalid status"});
        }

        const newStatus = statusSequence[currentStatusIndex + 1];

        await knex("orders").where({ id }).update({ status: newStatus, updated_at: knex.fn.now() });

        res.json({ message: `Order ${id} status updated to ${newStatus}`, orderId: id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update order status" });
    }
});

router.delete("/orders/:id", adminAuth, async (req, res) => {
    const { id } = req.params;
  
    try {
      await knex("orders").where({ id }).del();
      res.json({ message: `Order ${id} deleted successfully` });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to delete order" });
    }
  });
  

module.exports = router;