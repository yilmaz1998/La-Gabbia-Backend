const express = require("express");
const knex = require('../knex.js');
const router = express.Router();
const adminAuth = require("../middleware/adminAuth");

router.get("/orders", adminAuth, async (req, res) => {
  try {
    const orders = await knex("orders").select("*").orderBy("created_at", "desc");

    const detailedOrders = await Promise.all(orders.map(async (order) => {
      const items = await knex("order_items")
        .join("menu_items", "order_items.menu_item_id", "menu_items.id")
        .where("order_items.order_id", order.id)
        .select("menu_items.name", "order_items.quantity", "order_items.price");

      return { ...order, items };
    }));
    res.json(detailedOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;