const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const { authLoginRedirecter, authHomeRedirecter } = require('../middlewares/authenticate')

const siteName = 'aranoz'

router.get('/', (req, res) => {
    res.render('home', { js: 'home', title: `${siteName} - home` }); 
});

router.get('/contact', (req, res) => {
    res.render('contact', { js: 'contact', title: `${siteName} - contact`  }); 
});

router.get('/about', (req, res) => {
    res.render('about', { js: 'about', title: `${siteName} - about`  }); 
});

router.get('/login', authHomeRedirecter, (req, res) => {
    res.render('login', { js: 'login', title: `${siteName} - login`  });
});

router.get('/registration', authHomeRedirecter, (req, res) => {
    res.render('registration', { js: 'registration', title: `${siteName} - registration`  }); 
});

// router.get('/products/pageIndex=:activePage', (req, res) => {
//     const address = path.resolve('database/products.json');
//     const activePage = req.params.activePage - 1

//     fs.readFile(address, 'utf8', (err, data) => {
//         if (err) {
//             res.status(500).send({ 'msg': 'internal server error' });
//         } else {
//             const products = JSON.parse(data);

//             let productsPerPage = 9;
//             let slicedProducts = products.slice(activePage * productsPerPage, (activePage + 1) * productsPerPage)
//             console.log(sl)

//             let productsPageLength = Math.ceil(products.length / slicedProducts.length)

//             res.render('products',  { 
//                 js: 'products', 
//                 title: `${siteName} - products`,
//                 products: slicedProducts,
//                 productsPageLength: productsPageLength
//             }); 
//         }
//     });
// });

router.get('/products/pageIndex=:activePage', (req, res) => {
    const address = path.resolve('database/products.json');
    const activePage = req.params.activePage - 1

    fs.readFile(address, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ 'msg': 'internal server error' });
        } else {
            const products = JSON.parse(data);

            const productsPerPage = 9;
            let slicedProducts = products.slice(activePage * productsPerPage, (activePage + 1) * productsPerPage)

            let productsPageLength = Math.ceil(products.length / productsPerPage)

            res.render('products',  { 
                js: 'products', 
                title: `${siteName} - products`,
                products: slicedProducts,
                productsPageLength: productsPageLength,
                activePage: activePage + 1,
                totalProductsLength: products.length
            }); 
        }
    });
});

router.get('/products/:id', (req, res) => {
    const address = path.resolve('database/products.json');
    const productId = req.params.id
    fs.readFile(address, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ 'msg': 'internal server error' });
        } else {
            const products = JSON.parse(data);
            const product = products.find(product => product.id == productId)

            res.render('product',  { 
                js: 'product', 
                title: `${siteName} - ${product.title}`,
                product: product
            }); 
        }
    });
});

module.exports = router;