const fs = require("fs");
const path = require("path");

//READ PRODUCTS
const loadProducts = () => {
    return JSON.parse(
        fs.readFileSync(path.join(__dirname, "./productsDB.json"), "utf-8")
    );
};

//WRITE PRODUCTS
const storeProducts = (products) => {
    fs.writeFileSync(path.join(__dirname, "./productsDB.json"), JSON.stringify(products), "utf-8");
};

//READ USERS
const loadUsers = () => {
    return JSON.parse(fs.readFileSync(path.join(__dirname, "./userDB.json"), "utf-8"));
};

//WRITE USERS
const storeUsers = (users) => {
    fs.writeFileSync(path.join(__dirname, "./userDB.json"), JSON.stringify(users, null, 3), "utf-8");
};


module.exports = {
    loadProducts,
    storeProducts,
    loadUsers,
    storeUsers
};