require('dotenv').config();
const express = require('express');

const ordersRouter = require('./routes/orders');

const app = express();

app.use(express.json());

app.use('/orders', ordersRouter);

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

module.exports = app;