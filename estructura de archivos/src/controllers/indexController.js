//DATA BASE
const { loadProducts } = require("../data/dbModule");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller  = {
    //HOME
    index: (req, res) => {
        let products = loadProducts();
        let productsInSale = products.filter(product => product.section === "in-sale");
        let productsRecommended = products.filter(product => product.section === "recommended");
        let productsOfUsers = products.filter(product => product.section === "of-users");
        return res.render('index',{
            products,
            productsInSale,
            productsRecommended,
            productsOfUsers,
            toThousand
        });
    },
    //SEARCH
    search: (req, res) => {
        let { keywords } = req.query;
        let products = loadProducts();
        let result = products.filter(product => product.name.toLowerCase().includes(keywords.toLowerCase()));
        return res.render("results", {
            result,
            toThousand,
            keywords
        });
    }
};

module.exports = controller;