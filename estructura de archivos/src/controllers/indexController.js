//DATA BASE

const db = require("../database/models");
const { Op } = db.Sequelize;

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	//HOME
	index: (req, res) => {
		const categories = db.Category.findAll()
		const brands = db.Brand.findAll({ attributes: ['id', 'name'] });
		const sections = db.Section.findAll({ attributes: ['id', 'name'] });
		let productsInSale = db.Product.findAll({
			where: {
				sectionId: {
					[Op.eq]: 1,
				},
			},
			order: [["discount", "DESC"]],
			limit: 7,
			attributes: {
				exclude: ["updatedAt", "categoryId"],
			},
			include: [
				{
					association: "category",
					attributes: ["id", "name"],
				},
				{
					association: "image",
				},
			],
		});
		//Recommended
		let productsRecommended = db.Product.findAll({
			where: {
				sectionId: {
					[Op.eq]: 2,
				},
			},
			order: [["name", "ASC"]],
			limit: 7,
			attributes: {
				exclude: ["updatedAt", "categoryId"],
			},
			include: [
				{
					association: "category",
					attributes: ["id", "name"],
				},
				{
					association: "image",
				},
			],
		});
		//OfUsers
		let productsOfUsers = db.Product.findAll({
			where: {
				sectionId: {
					[Op.gte]: 3,
				},
			},
			order: [["createdAt", "DESC"]],
			limit: 4,
			attributes: {
				exclude: ["updatedAt", "categoryId"],
			},
			include: [
				{
					association: "category",
					attributes: ["id", "name"],
				},
				{
					association: "image",
				},
			],
		});

		Promise.all([productsInSale, productsRecommended, productsOfUsers, categories, brands, sections])
			.then(([productsInSale, productsRecommended, productsOfUsers, categories, brands, sections]) => {
				return res.render("index", {
					productsInSale,
					productsRecommended,
					productsOfUsers,
					categories,
					brands,
					sections,
					toThousand,
				});
			})
			.catch((error) => console.log(error));
	},
	//SEARCH
	search: (req, res) => {

		let { keywords } = req.query;
		const categories = db.Category.findAll()
		const brands = db.Brand.findAll({ attributes: ['id', 'name'] });
		const sections = db.Section.findAll({ attributes: ['id', 'name'] });
		let searchResult = db.Product.findAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.substring]: keywords,
						},
					},
					{
						description: {
							[Op.substring]: keywords,
						},
					},
				],
			},
			include: ["image"],
		})
		Promise.all([categories, brands, sections, searchResult])
			.then(([categories, brands, sections, searchResult]) => {
				return res.render("results", {
					searchResult,
					categories,
					brands,
					sections,
					toThousand,
					keywords,
				});
			})
			.catch((error) => console.log(error));
	},
	categoriesFilter: async (req, res) => {
		let parametro = req.params.x
		try {
			const categories = await db.Category.findAll({ attributes: ['id', 'name'] })
			const brands = await db.Brand.findAll({ attributes: ['id', 'name'] });
			const sections = await db.Section.findAll({ attributes: ['id', 'name'] });
			let searchResult = await db.Product.findAll({
				where: {
					[Op.or]: [
						{
							categoryId: { [Op.substring]: parametro }
						}
					]
				}, include: ['image'],
			})
			console.log(brands);
			return res.render("results", {
				searchResult,
				categories,
				sections,
				brands,
				toThousand,
				parametro
			})
		} catch (error) {
			console.log(error);

		}
	},
	sectionsFilter: async (req, res) => {
		let parametro = req.params.x
		try {
			const categories = await db.Category.findAll({ attributes: ['id', 'name'] })
			const brands = await db.Brand.findAll({ attributes: ['id', 'name'] });
			const sections = await db.Section.findAll({ attributes: ['id', 'name'] });
			let searchResult = await db.Product.findAll({
				where: {
					[Op.or]: [
						{
							sectionId: { [Op.substring]: parametro }
						}
					]
				}, include: ['image'],
				order: [['discount', 'ASC']]
			})
			console.log(brands);
			return res.render("results", {
				searchResult,
				categories,
				sections,
				brands,
				toThousand,
				parametro
			})
		} catch (error) {
			console.log(error);
		}
	},

	allSectionsProducts: async (req, res) => {
		let parametro = req.params
		try {
			const categories = await db.Category.findAll({ attributes: ['id', 'name'] })
			const brands = await db.Brand.findAll({ attributes: ['id', 'name'] });
			const sections = await db.Section.findAll({ attributes: ['id', 'name'] });
			let searchResult = await db.Product.findAll({
				order: [['name', 'ASC']],
				include: [{
					association: 'image'
				}]
			});
			return res.render("results", {
				searchResult,
				categories,
				sections,
				brands,
				toThousand,
				parametro
			})
		} catch (error) {
			console.log(error);
		}
	},

	brandsFilter: async (req, res) => {
		let parametro = req.params.x
		try {
			const categories = await db.Category.findAll({ attributes: ['id', 'name'] })
			const brands = await db.Brand.findAll({ attributes: ['id', 'name'] });
			const sections = await db.Section.findAll({ attributes: ['id', 'name'] });
			let searchResult = await db.Product.findAll({
				where: {
					[Op.or]: [
						{
							brandId: { [Op.substring]: parametro }
						}
					]
				}, include: ['image'],
			})
			console.log(brands);
			return res.render("results", {
				searchResult,
				categories,
				sections,
				brands,
				toThousand,
				parametro
			})
		} catch (error) {
			console.log(error);

		}
	}
};

module.exports = controller;
