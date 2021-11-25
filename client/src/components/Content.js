import { useContext } from 'react';
import { Navigate} from 'react-router-dom';
import { UserContext } from '../App';

const Content = () => {
	const [user] = useContext(UserContext);

	return !user.accesstoken ? (
		<Navigate replace to='/login' />
	) : (
		<div>This is the content.</div>
	);
};

export default Content;
