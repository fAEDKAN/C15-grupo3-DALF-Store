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
    },
    search: (req, res) => {
        let { keywords } = req.query;
        let products = loadProducts();
        let result = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()));
        return res.render("results", {
            result,
            toThousand,
            keywords
        })
    },
};

module.exports = controller;