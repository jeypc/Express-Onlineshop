const Product = require('./../../models/product')
const fs = require('fs')
const path = require('path')
const paginate = require('express-paginate');

const index = async (req, res, next) => {
    try{
        const [ products, itemCount ] = await Promise.all([
            Product.product.find({}).populate('categories').limit(req.query.limit).skip(req.skip).lean().exec(),
            Product.product.count({})
        ]);
        const pageCount = Math.ceil(itemCount / req.query.limit);
        res.render('control-panel/product/list', {
            layout: 'control-panel',
            products: products,
            pagination: {
                pageCount,
                itemCount,
                currentPage: req.query.page,
                pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
            },
            script: () => {
                return `<script src="/static/admin/js/product/list.js"></script>`
            }
        })
    } catch(err) {
        next(err)
    }

}

const create = async (req, res, next) => {
    let categories = await Product.productCategories.find({})
    res.render('control-panel/product/create', {
        layout: 'control-panel',
        data: {
            categories: categories
        },
        helpers: {
            css: () => {
                return `
                    <link rel="stylesheet" href="/static/admin/plugins/select2/select2.min.css">
                    <link rel="stylesheet" href="/static/admin/plugins/select2/select2-bootstrap.min.css">`
            },
            script: () => {
                return `
                    <script src="/static/admin/bower_components/ckeditor/ckeditor.js"></script>
                    <script src="/static/admin/plugins/select2/select2.min.js"></script>
                    <script src="/static/admin/js/product/create.js"></script>`
            }
        }
    })
}

const save = async (req, res, next) => {
    let featureImage;
    let productImages = [];
    req.files.forEach((file) => {
        if (file.fieldname === 'featureImage') {
            featureImage = file.filename;
        } else {
            productImages.push({name: file.filename});
        }
    });
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('price', 'Price is required').notEmpty();
    req.checkBody('stock', 'Stock is required').notEmpty();
    req.checkBody('shortDescription', 'Short Description is required').notEmpty();
    req.checkBody('description', 'Full Description is required').notEmpty();

    let errors = req.validationErrors();
    if (errors){
        if ( productImages.length > 0 ) {
            productImages.forEach(img => {
                fs.unlinkSync(productImgPath + img)
            })
        }
        fs.unlinkSync(productImgPath + featureImage)
        res.statusCode = 400
        res.json(errors)
    } else {
        let productImagesInserted = await Product.productImages.insertMany(productImages);
        Product.product.create({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.stock,
            description: req.body.description,
            shortDescription: req.body.shortDescription,
            weight: req.body.weight,
            color: req.body['color[]'],
            image: featureImage,
            images: productImagesInserted,
            categories: req.body['categories[]'],
            seo: {
                metaTitle: req.body.metaTitle,
                metaKeywords: req.body.metaKeywords,
                metaDescription: req.body.metaDescription
            },
            publish: Boolean(Number(req.body.publish))
        }).then(doc => {
            res.send({
                status: true,
                message: "Product berhasil disimpan",
                product: doc
            })
        })
    }
}

const removeProduct = async (req, res, next) => {
    let product = await Product.product.find({_id: req.body.id}).remove();

    if (product) {
        res.send({
            status: true
        })
    }
    res.send({
        status: false
    })
}

module.exports = {
    index, create, save, removeProduct
}