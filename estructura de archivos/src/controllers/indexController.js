const { loadProducts } = require("../data/dbModule")

module.exports = {
    
    index: (req, res) => {
        const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        let products = loadProducts();
        let productsInSale = products.filter(product => product.category === "in-sale");
        let productsRecomended = products.filter(product => product.category === "recomended");
        let productsOfUsers = products.filter(product => product.category === "of-users");
        return res.render('index',{
            productsInSale,
            productsRecomended,
            productsOfUsers,
            toThousand
        })
    }
}