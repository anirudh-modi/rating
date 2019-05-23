const router = require('express').Router({ mergeParams: true });
const db = require('../../models');

router.use('/', function(req,res,next){
    db.Products
        .findOne({
            where:{
            id:parseInt(req.params.id)
        }
    })
    .then(productDetail => {
        res.locals.product=productDetail
        next();
    })
    .catch(next)
});

router.get('/',function(req, res,next){
    res.json(res.locals.product);
});

router.put('/rating',function(req,res,next) {
    console.log(req.body);
    db.Ratings.create({
        user_email:req.body.user_email,
        product_id:parseInt(req.params.id),
        title:req.body.title,
        description:req.body.description,
        star:req.body.star
    })
    .then((addedRating)=>db.Products
        .findOne({
            where: {
                id:parseInt(req.params.id)
            }
        })
    )
    .then((updatedProduct)=>res.json(updatedProduct))
    .catch(next);
});

module.exports = router;