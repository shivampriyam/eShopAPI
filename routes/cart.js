const Cart = require('../models/Cart');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorisation} = require('./verifyToken');
const router = require('express').Router();

// Create Cart
router.post('/', verifyTokenAndAuthorisation, async (req,res)=>{
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Update Cart
router.put('/:id', verifyTokenAndAuthorisation, async (req,res)=>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete Cart
router.delete('/:id', verifyTokenAndAuthorisation, async (req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('Cart has been Deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get Cart
router.get('/find/:id', verifyTokenAndAuthorisation, async (req,res)=>{
    try {
        const cart = await Cart.findOne({ userId: req.params.id});
        // const cart = await Cart.findById(req.params.id);
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get Carts
router.get('/', verifyTokenAndAuthorisation, async (req,res)=>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;