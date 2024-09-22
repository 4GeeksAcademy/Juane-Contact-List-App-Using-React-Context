import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { CardContact } from "../component/cardContact";
import logo from "../../img/mr.png"


export const ContactList = () => {
	const { store, actions } = useContext(Context);
	const [contactAux, setContactAux] = useState({
		"name": "",
		"email": "",
		"phone": "",				
		"address": "",
		"id": null
	});

	useEffect(e => {
		if (store.deleteIndexToModal != undefined){
			setContactAux(store.contactList[store.deleteIndexToModal]);
		}			
	}, [store.deleteIndexToModal])

	return (
		<>
			<div className="container">
					{store.contactList.map((item, index) => {
						return	<CardContact key={index} index={index} contact={item} />					
					})}
					{store.contactList.length == 0 && <h3>Empty contact list</h3>}
			</div>
			<div className="modal fade" id="confirmModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title" id="exampleModalLabel">Confirm action</h5>
						<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div className="modal-body">
						Are you sure to delete {contactAux.name}'s contact?
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
						<button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={e => {actions.deleteContact(contactAux.id)}}>Delete</button>
					</div>
					</div>
				</div>
			</div>
		</>
	);
};