const fs = require("fs");
const path = require("path");

const loadProducts = () => {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname, "./productsDataBase.json"), "utf-8")
    );
};

const storeProducts = (products) => {
    fs.writeFileSync(path.join(__dirname, "./productsDataBase.json"), JSON.stringify(products), "utf-8")
};