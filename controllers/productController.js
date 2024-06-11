const path = require('path');
const fs = require('fs');

const filter = (req, res) => {
    const address = path.resolve('database/products.json');
    const {colors, price} = req.body

    fs.readFile(address, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send({ 'msg': 'internal server error' });
        } else {
            const products = JSON.parse(data);

            let filteredProducts = products.filter(item => {
                let isValid = true

                if(colors.length > 0) { 
                    isValid = colors.includes(item.color)
                    if(!isValid) return
                }

                if(price.min.length > 0) {
                    isValid = item.price >= Number(price.min)
                    if(!isValid) return
                }

                if(price.max.length > 0) {
                    isValid = item.price <= Number(price.max)
                    if(!isValid) return
                }

                return isValid
            })

            res.status(200).send({products: filteredProducts})
        }
    });
};

module.exports = {
    filter,
};
