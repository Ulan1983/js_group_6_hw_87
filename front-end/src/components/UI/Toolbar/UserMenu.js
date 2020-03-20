import React, {Fragment} from 'react';
import {Link} from "react-router-dom";

const UserMenu = ({user, logout}) => {
	return (
		<Fragment>
			<p style={{paddingTop: '15px', marginRight: '20px'}}>Hello, <strong>{user.username}!</strong></p>
			<Link to='/post/new'
				  style={{paddingTop: '15px', marginRight: '10px', textDecoration: 'none', color: 'black'}}
			>
				Add new post
			</Link>
			<button type='submit' color='secondary'
					onClick={logout} style={{background: 'transparent', border: 'none', outline: 'none'}}
			>
				Logout
			</button>
		</Fragment>
	);
};

export default UserMenu;