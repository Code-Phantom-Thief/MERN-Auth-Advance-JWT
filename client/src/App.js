import { useState, useEffect, createContext } from 'react';
import {
	Route,
	Routes,
	useNavigate,
} from 'react-router-dom';
import Navigation from './components/Navigation';
import Content from './components/Content';
import Login from './components/Login';
import Protected from './components/Protected';
import Register from './components/Register';
import { baseURL } from './api';

export const UserContext = createContext([]);

function App() {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [loading, setLoading] = useState(true);

	console.log(user);

	const logoutCallback = async () => {
		await fetch(`${baseURL}/auth/logout`, {
			method: 'POST',
			credentials: 'include',
		});

		setUser({});
		navigate('/');
	};

	useEffect(() => {
		const checkRefreshToken = async () => {
			try {
				const result = await (
					await fetch(`${baseURL}/auth/refresh_token`, {
						method: 'POST',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
						},
					})
				).json();

				setUser({
					accesstoken: result.accesstoken,
				});
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		checkRefreshToken();
	}, []);

	if (loading) return <div>Loading...</div>;

	return (
		<UserContext.Provider value={[user, setUser]}>
			<div className='app'>
				<Navigation logoutCallback={logoutCallback} />
				<Routes>
					<Route path='/login' element={<Login />} />
					<Route path='/register' element={<Register />} />
					<Route
						path='/protected'
						element={<Protected />}
					/>
					<Route path='/' element={<Content />} />
				</Routes>
			</div>
		</UserContext.Provider>
	);
}

export default App;
