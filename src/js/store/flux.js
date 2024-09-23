import logo from "../../img/mr.png"

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contact : {
				"name": "",
				"email": "",
				"phone": "",				
				"address": "",
				"id": null
			},
			deleteIndexToModal: null,
			contactList: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			dataToModal: (index) => {
				setStore({deleteIndexToModal: index})
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// },

			
			getContactList : () => {
				const store = getStore();
				fetch("https://playground.4geeks.com/contact/agendas/mrjhon/contacts")
				.then((res) => {return res.json();})
				.then(data => { if (data.detail == "Agenda \""+store.slug+"\" doesn't exist.") {
						fetch("https://playground.4geeks.com/contact/agendas/mrjhon/contacts/"+store, {
							method: "POST",
							headers: {
							  "Content-Type": "application/json"}})
						.then((res) => {return res.json();})
						.then(data => {setStore({ slug : data.slug});});
				  } else {
					setStore({ contactList : data.contacts});
				  }
				})
			},
			newContact : () => {
				const store = getStore();

				let contactAux = {
					"name": "",
					"email": "",
					"phone": "",
					"address": "",
					"id": null
				}
				setStore({ contact : contactAux});
			}, 
			findContact : (id) => {
				const store = getStore();
				let contactAux = {
					"name": store.contactList[id].name,
					"email": store.contactList[id].email,
					"phone": store.contactList[id].phone,
					"address": store.contactList[id].address,
					"id": store.contactList[id].id}
				setStore({ contact : contactAux});},

			saveContact : (contacAux) => {
				const store = getStore();
				if (store.contact.id == null) {
					fetch("https://playground.4geeks.com/contact/agendas/mrjhon/contacts/", {
						method: "POST",
						headers: {
						"Content-Type": "application/json"},
						body : JSON.stringify({
							"name": contacAux.name,
							"phone": contacAux.phone,
							"email": contacAux.email,
							"address": contacAux.address})})
						.then((res) => {return res.json();})
						.then(data => {getActions().getContactList();});
				} else {
					fetch("https://playground.4geeks.com/contact/agendas/mrjhon/contacts/"+store.contact.id, {
						method: "PUT",
						headers: {
						"Content-Type": "application/json"},
						body : JSON.stringify({
							"name": contacAux.name,
							"phone": contacAux.phone,
							"email": contacAux.email,
							"address": contacAux.address})})
					.then((res) => {return res.json();})
					.then(data => {	getActions().getContactList();});
				}
			},
			deleteContact : (id) => {
				const store = getStore();
				fetch("https://playground.4geeks.com/contact/agendas/mrjhon/contacts/"+id, {
					method: "DELETE",
					headers: {"Content-Type": "application/json"}})
					.then(data => { getActions().getContactList(); setStore({deleteIndexToModal: null})});				
			}
		}
	};
};

export default getState;