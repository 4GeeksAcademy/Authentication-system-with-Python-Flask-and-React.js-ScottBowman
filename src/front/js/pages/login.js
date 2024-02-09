import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const {email, setEmail} = useState("");
	const {password, setPassword} = useState("");

	const handleClick = () => {

		const opts = 
		{
			method: 'POST',
			body: JSON.stringify({
				email: email,
				password: password
			}),
		
		}
		fetch('https://super-waddle-jj5w6g7vxx9rf5rv5-3001.app.github.dev/api/token')
			.then(resp => {
				if(resp.status === 200) {
					return resp.json()
				} else alert('Error')
			})
			.then()
			.catch(error => {
				console.error("there was an error with the fetch", error);
			});
	};

	return (
		<div className="text-center mt-5">
			<h1>Login</h1>
			<div>
                <input type="text" placeholder="Email" value={email} onChange={() => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={() => setPassword(e.target.value)} />
                <button> onClick(handleClick) Login</button>
            </div>
		</div>
	);
};
