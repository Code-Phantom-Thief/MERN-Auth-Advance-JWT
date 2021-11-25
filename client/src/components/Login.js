import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { baseURL } from '../api';

const Login = () => {
	let navigate = useNavigate();
	const [user, setUser] = useContext(UserContext);
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = userData;
		try {
			const result = await (await fetch(`${baseURL}/auth/login`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			})).json();

			if (result.accesstoken) {
				setUser({
					accesstoken: result.accesstoken
				})
				navigate('/');
			} else {
				console.log(result.error);
			}
			
		} catch (error) {
			console.log(error.response);
		}
	};

	useEffect(() => {
	}, [user]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	return (
		<div className='login-wrapper'>
			<form onSubmit={handleSubmit}>
				<h2>Login</h2>
				<div className='login-input'>
					<input
						type='email'
						name='email'
						value={userData.email}
						placeholder='Email'
						onChange={handleChange}
						autoComplete='email'
					/>
					<input
						type='password'
						name='password'
						value={userData.password}
						placeholder='Password'
						onChange={handleChange}
						autoComplete='current-password'
					/>
					<button type='submit'>Login</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
