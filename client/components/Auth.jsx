import React from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const withAuth = (WrappedComponent) => {
	const HOC = (props) => {
		const login = useSelector(state => state.user.login);

		if (login) {
			Router.push('/');
		}

		return <WrappedComponent {...props} />;
	};

	return HOC;
};

export default withAuth;
