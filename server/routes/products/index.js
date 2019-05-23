const router = require('express').Router({ mergeParams: true });
const db = require('../../models');
const idRouter=require('./id');
router.use('/', function(req,res,next){
    db.Products
        .findAll()
    .then(products => {
        res.locals.products=products
        next();
    })
    .catch(next)
});

router.get('/',function(req, res,next){
    res.json(res.locals.products);
});

router.use('/:id',idRouter);

module.exports = router;