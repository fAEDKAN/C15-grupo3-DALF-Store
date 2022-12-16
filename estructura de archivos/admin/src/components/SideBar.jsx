import React from 'react'
import logo from '../DALF-LOGO.png'
export const SideBar = () => {
	return (
		<ul className="navbar-nav bg-gradient-secondary sidebar sidebar-dark accordion" id="accordionSidebar">

			<a className="sidebar-brand d-flex align-items-center justify-content-center" href="/">
				<div className="sidebar-brand-icon">
					<img className="w-100" src={logo} alt="Digital House" />
				</div>
			</a>

			<hr className="sidebar-divider my-0" />

			<li className="nav-item active">
				<a className="nav-link" href="/">
					<i className="fas fa-fw fa-tachometer-alt"></i>
					<span>Panel de Control</span></a>
			</li>

			<hr className="sidebar-divider" />

			<div className="sidebar-heading">Navegación</div>

			<li className="nav-item">
				<a className="nav-link collapsed" href="/">
					<i className="fas fa-fw fa-boxes"></i>
					<span>Productos</span>
				</a>
			</li>

			<li className="nav-item">
				<a className="nav-link" href="/">
					<i className="fas fa-fw fa-users"></i>
					<span>Usuarios</span></a>
			</li>

			<li className="nav-item">
				<a className="nav-link" href="/">
					<i className="fas fa-fw fa-table"></i>
					<span>Otros</span></a>
			</li>

			<hr className="sidebar-divider d-none d-md-block" />
		</ul>
	)
}
