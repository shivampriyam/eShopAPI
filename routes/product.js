const Product = require('../models/Product');
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorisation} = require('./verifyToken');
const router = require('express').Router();

// Create a Product
router.post('/', verifyTokenAndAdmin, async (req, res)=>{
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err)
    }
})

// Update a Product
router.put('/:productId', verifyTokenAndAdmin, async (req,res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.productId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Delete a Product
router.delete('/:productId', verifyTokenAndAdmin, async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.productId);
        res.status(500).json('Product has been deleted...');
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get a Product
router.get('/find/:productId', verifyTokenAndAdmin, async (req,res)=>{
    try {
        const product = await Product.findById(req.params.productId);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
})

// Get Products
router.get('/', verifyTokenAndAdmin, (req,res)=>{
    const qNew = req.query.new;
    const qcategory = req.query.category;
    try {
        let products = await Product.find();
        if(qcategory){
            products = await Product.find({ categories: { $in: [qcategory]}})
        }
        if(qNew){
            products = await products.sort({ createdAt:-1 }).limit(1);
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;