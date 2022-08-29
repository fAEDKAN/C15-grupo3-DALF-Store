const { loadProducts } = require("../data/dbModule")

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller  = {
    
    index: (req, res) => {
        let products = loadProducts();
        let productsInSale = products.filter(product => product.section === "in-sale");
        let productsRecomended = products.filter(product => product.section === "recomended");
        let productsOfUsers = products.filter(product => product.section === "of-users");
        return res.render('index',{
            products,
            productsInSale,
            productsRecomended,
            productsOfUsers,
            toThousand
        })
    }
}

module.exports = controller;