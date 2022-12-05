import React from 'react'
import { ContentRowTop } from './ContentRowTop'
import { Footer } from './Footer'
import { TopBar } from './TopBar'

export const ContentWrapper = () => {
  return (
    <div id="content-wrapper" className="d-flex flex-column">

			<div id="content">
				<TopBar/>
				<ContentRowTop/>
			</div>
			<Footer/>

		</div>
  )
}
