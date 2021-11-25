import {Link} from 'react-router-dom'

const Navigation = ({logoutCallback}) => {
    return (
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/protected'>Protected</Link>
				</li>
				<li>
					<Link to='/register'>Register</Link>
				</li>
				<li>
					<button onClick={logoutCallback}>Log out</button>
				</li>
			</ul>
		);
}

export default Navigation
