import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const token = sessionStorage.getItem("token");
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	
	
	const handleClick = () => {
		const opts = 
		{
			method: 'POST',
			headers: myHeaders,
		

			body: JSON.stringify({
				email: email,
				password: password
			}),
		
		}
		fetch('https://super-waddle-jj5w6g7vxx9rf5rv5-3001.app.github.dev/api/login', opts)
			.then(resp => {
				if(resp.status === 200) 
					return resp.json();
				 else alert("There has been an error");
			})
			.then(data => {
				console.log("this came from the backend", data);
				sessionStorage.setItem("token", data.access_token);
				}).catch(error => {
					console.error("there was an error with the fetch", error);
				});
	};

		return (
			<div className="text-center mt-5">
				<h1>Login</h1>
				{token && token != "" && token !="undefined" ? (
					"You are logged in with this token" + token
					) : (
					<div>
						<input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
						<input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
						<button onClick={handleClick}>Login</button>
					</div>
				)}	
			</div>
		);
};
