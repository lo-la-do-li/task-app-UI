import React from 'react';
import ReactLoading from 'react-loading';

const Ellipses = ({ type, color }) => (
	<ReactLoading type={type} color={color} width={'20%'} height={'20%'} />
);

export default Ellipses;
