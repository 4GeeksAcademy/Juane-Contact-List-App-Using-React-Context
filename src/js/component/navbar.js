import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<span className="navbar-brand mb-0 h1"></span>
			</Link>
			<div className="ml-auto me-3">			
				<Link to="/contact/new">
					<button className="btn btn-primary" onClick={() => actions.newContact()}>Add New Contact</button>
				</Link>
			</div>
		</nav>
	);
};