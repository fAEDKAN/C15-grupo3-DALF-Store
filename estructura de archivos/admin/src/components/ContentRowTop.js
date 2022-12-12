import React, { useEffect, useState } from 'react'
import { fetchWithoutToken } from '../hooks/UseFetch'
import { Metrics } from './Metrics'

export const ContentRowTop = () => {
	const [state, setState] = useState({
		loading: true,
		products: {
			title: "Productos",
			color: "primary",
			icon: "fa-film",
			data: 0
		},
		users: {
			title: "Usuarios",
			color: "success",
			icon: "fa-user",
			data: 0
		},
		categories: {
			title: "Categorias",
			color: "warning",
			icon: "fa-award",
			data: 0
		},
	});

	const getData = async (endpoint) => {
		try {
		let response = await fetchWithoutToken(endpoint);
		return response;
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getData("/totals")
		.then((data) => {
			setState({
				loading: false,
				products: {
					...state.products,
					data: data.products
				},
				users: {
					...state.users,
					data: data.users
				},
				categories: {
					...state.categories,
					data: data.categories
				}
			})
		})
		.catch(() => console.error); 
	}, []);

	const { products, users, categories } = state;

	return (
		<div className="container-fluid">
			<div className="d-sm-flex align-items-center justify-content-between mb-4">
				<h1 className="h3 mb-0 text-gray-800">Dashboard DALF-Store</h1>
			</div>

			<div className="row">
				<Metrics {...products} />
				<Metrics {...users} />
				<Metrics {...categories} />
			</div>

			<div className="row">

				<div className="col-lg-6 mb-4">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h5 className="m-0 font-weight-bold text-gray-800">
								Ultimos productos en el sistema
							</h5>
						</div>
						<div className="card-body">
							<div className="text-center">
								<img className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ width: "40rem" }} src="assets/images/mandalorian.jpg" alt=" Star Wars - Mandalorian " />
							</div>
							<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, consequatur explicabo officia inventore libero veritatis iure voluptate reiciendis a magnam, vitae, aperiam voluptatum non corporis quae dolorem culpa citationem ratione aperiam voluptatum non corporis ratione aperiam voluptatum quae dolorem culpa ratione aperiam voluptatum?</p>
							<a className="btn btn-danger" target="_blank" rel="nofollow" href="/">View movie detail</a>
						</div>
					</div>
				</div>

				<div className="col-lg-6 mb-4">
					<div className="card shadow mb-4">
						<div className="card-header py-3">
							<h5 className="m-0 font-weight-bold text-gray-800">
								Categorias
							</h5>
						</div>
						<div className="card-body">
							<div className="row">
								<div className="col-lg-6 mb-4">
									<div className="card bg-dark text-white shadow">
										<div className="card-body">
											Acción
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-dark text-white shadow">
										<div className="card-body">
											Animación
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-dark text-white shadow">
										<div className="card-body">
											Aventura
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-dark text-white shadow">
										<div className="card-body">
											Ciencia Ficción
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-dark text-white shadow">
										<div className="card-body">
											Comedia
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-dark text-white shadow">
										<div className="card-body">
											Documental
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-dark text-white shadow">
										<div className="card-body">
											Drama
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-dark text-white shadow">
										<div className="card-body">
											Fantasia
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-dark text-white shadow">
										<div className="card-body">
											Infantiles
										</div>
									</div>
								</div>
								<div className="col-lg-6 mb-4">
									<div className="card bg-dark text-white shadow">
										<div className="card-body">
											Musical
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
