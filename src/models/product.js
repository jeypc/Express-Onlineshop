const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productImagesSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
})

const productCategoriesSchema = new Schema({
    _id: Schema.Types.ObjectId,
    name: String
})

const productSchema = new Schema({
    name: String,
    price: Number,
    stock: Number,
    description: String,
    shortDescription: String,
    weight: Number,
    color: [{
        type: String
    }],
    image: String,
    images: [{
        type: Schema.Types.ObjectId,
        ref: 'productImages'
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'productCategories'
    }],
    seo: {
        metaTitle: String,
        metaKeywords: String,
        metaDescription: String
    },
    publish: Boolean,
    created_on: {
        type: Date,
        default: Date.now()
    }
})

const productImages = mongoose.model('productImages', productImagesSchema)
const productCategories = mongoose.model('productCategories', productCategoriesSchema)
const product = mongoose.model('products', productSchema)

module.exports = {
    productImages,
    productCategories,
    product
}