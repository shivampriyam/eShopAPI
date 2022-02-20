const Order = require('../models/Order');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorisation} = require('./verifyToken');
const router = require('express').Router();

// Create order
router.post('/', verifyToken, async (req,res)=>{
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update order
router.put('/:id', verifyTokenAndAuthorisation, async(req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete order
router.delete('/:id', verifyTokenAndAuthorisation, async (req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted");
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get order
router.get('/find/:id', verifyTokenAndAuthorisation, async (req,res)=>{
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get orders
router.get('/', verifyTokenAndAuthorisation, async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
});

// Get monthly income


module.exports = router;