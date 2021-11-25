import { useState, useEffect, useContext } from 'react';
import { baseURL } from '../api';
import { UserContext } from '../App';

const Protected = () => {
	const [user] = useContext(UserContext);
	const [content, setContent] = useState(
		'You need to login'
	);

	useEffect(() => {
		const fetchProtected = async () => {
			try {
				const result = await (
					await fetch(`${baseURL}/protected`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							authorization: `Bearer ${user.accesstoken}`,
						},
					})
                ).json();
                console.log(result.data);

				if (result.data) {
					setContent(result.data);
				}
			} catch (error) {
				console.log(error);
			}
        };
        fetchProtected();
	}, [user]);

	return <div>{content}</div>;
};

export default Protected;
