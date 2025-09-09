const express = require("express");
const knex = require("../knex.js");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const menuItems = await knex("menu_items").select("*").orderBy("id");
        res.json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch menu items" });
    }
});

module.exports = router;