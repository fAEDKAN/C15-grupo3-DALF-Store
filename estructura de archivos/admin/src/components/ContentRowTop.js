import React, { useEffect, useState ,setstate} from 'react'
import { GetFetch } from '../hooks/UseFetch'
import { GenresInDb } from './GenresInDb'
import { LastMovieInDb } from './LastMovieInDb'
import { Metrics } from './Metrics'

export const ContentRowTop = () => {

	const [state, setstate] = useState({
		loading: true,
		products:{
			title:"Productos",
			color:"primary",
			icon:"fa-film",
			data:0
		},
		users:{
			title:"Usuarios",
			color:"success",
			icon:"fa-award",
			data:0
		},
		categories:{
			title:"Categorias",
			color:"warning",
			icon:"fa-user",
			data:0
		}
		}
	);
		const getData = async (endpoint)=>{
			return await GetFetch(endpoint)
		}

		useEffect(() => {
			getData('/totals')
			.then(({data}) => {
				setstate({
				  loading: false,
				  products: {
					...state.products,
					data: data.productsTotal,
				  },
				  users: {
					...users,
					data: data.usersTotal,
				  },
				  categories: {
					...categories,
					data: data.categoriesTotal,
				  },
				});
			  })
			  .catch(() => console.error);
		}, []);

	const {products, users, categories}=state
  return (
    <div className="container-fluid">
					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
					</div>
				
					<div className="row">

								<Metrics {...products} />
								<Metrics {...users} />
								<Metrics {...categories} />
						
					</div>
	
					<div className="row">
		
						<LastMovieInDb/>
		
						<GenresInDb/>
					</div>
				</div>
  )
}
