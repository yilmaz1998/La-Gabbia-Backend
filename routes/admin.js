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