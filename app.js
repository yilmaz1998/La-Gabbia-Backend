require('dotenv').config();
const express = require('express');

const ordersRouter = require('./routes/orders');
const adminRoutes = require('./routes/admin');

const app = express();

app.use(express.json());

app.use('/orders', ordersRouter);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

module.exports = app;