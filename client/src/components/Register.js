import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../api';

const Register = () => {
	let navigate = useNavigate();
    const [userData, setUserData] = useState({
        username: '',
		email: '',
		password: '',
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { username,email, password } = userData;
		try {
			const result = await (
				await fetch(`${baseURL}/auth/register`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
                    body: JSON.stringify({
                        username,
						email,
						password,
					}),
				})
            ).json();

            if (!result.error) {
                console.log(result.message);
                navigate('/');
            } else {
                console.log(result.error);
            }
            
		} catch (error) {
			console.log(error.response);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUserData({ ...userData, [name]: value });
	};

	return (
		<div className='login-wrapper'>
			<form onSubmit={handleSubmit}>
				<h2>Register</h2>
				<div className='login-input'>
					<input
						type='text'
						name='username'
						value={userData.username}
						placeholder='username'
						onChange={handleChange}
						autoComplete='username'
					/>
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
					<button type='submit'>Register</button>
				</div>
			</form>
		</div>
	);
};

export default Register;
