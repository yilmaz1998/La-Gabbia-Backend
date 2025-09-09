require('dotenv').config();
const express = require('express');

const ordersRouter = require('./routes/orders');
const adminRoutes = require('./routes/admin');
const menuRouter = require('./routes/menu');

const app = express();

app.use(express.json());

app.use('/orders', ordersRouter);
app.use('/admin', adminRoutes);
app.use('/menu', menuRouter)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

module.exports = app;