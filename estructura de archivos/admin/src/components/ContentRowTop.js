import React from 'react'
import { GenresInDb } from './GenresInDb'
import { LastMovieInDb } from './LastMovieInDb'
import { Metrics } from './Metrics'

export const ContentRowTop = () => {
	const metrics= [
		{
			title:"Movies in Data Base",
			color:"primary",
			icon:"fa-film",
			data:21
		},{
			title:"Total awards",
			color:"success",
			icon:"fa-award",
			data:79
		},{
			title:"Actors quantity",
			color:"warning",
			icon:"fa-user",
			data:49
		}
	]
  return (
    <div className="container-fluid">
					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
					</div>
				
					<div className="row">

						{
							metrics.map((metric, index)=>(
								<Metrics {...metric} key={metric.title + index}/>
							))
						}
						
					</div>
	
					<div className="row">
		
						<LastMovieInDb/>
		
						<GenresInDb/>
					</div>
				</div>
  )
}
