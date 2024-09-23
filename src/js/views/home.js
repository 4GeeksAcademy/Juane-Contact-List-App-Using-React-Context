import React, {useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import { ContactList } from "./contactList";


export const Home = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getContactList()}, [])

	return (
		<div className="text-center mt-5 container-fluid">
			<ContactList />
		</div>)
};