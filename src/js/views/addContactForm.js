import React, { useEffect, useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";


const AddContactForm = props => {

	const { store, actions } = useContext(Context);
	const params = useParams();
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');	

	useEffect(() => {
		let contact = null;
		if (params.id == 'new') {
			actions.newContact()
		} else {			
			actions.findContact(params.id)
		}
		contact = store.contact;
		setName(contact.name);
		setEmail(contact.email);
		setPhone(contact.phone);
		setAddress(contact.address);
	}, [])

	function saveContact() {

		let contactAux = {
			"name": name,
			"email": email,
			"phone": phone,
			"address": address
		}
		actions.saveContact(contactAux);
	}

	return (
		<div className="container-fluid w-50" >
			<form>
				<div className="mb-3">
					<label className="form-label">Full Name</label>
					<input type="text" className="form-control" id="formFullName" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)}/>
				</div>
				<div className="mb-3">
					<label className="form-label">Email</label>
					<input type="email" className="form-control" id="formEmail" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
				</div>
				<div className="mb-3">
					<label className="form-label">Phone</label>
					<input type="text" className="form-control" id="formPhone" placeholder="Enter phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
				</div>
				<div className="mb-3">
					<label className="form-label">Address</label>
					<input type="text" className="form-control" id="formAddress" placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)}/>
				</div>
				<Link to="/">
					<button className="btn btn-primary w-100" onClick={e=>{saveContact()}}>Save</button>
					or get back to contacts.
				</Link>
			</form>
		</div>
	);
};

export default AddContactForm;