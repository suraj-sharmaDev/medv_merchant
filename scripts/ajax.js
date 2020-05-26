import {profileApi, openOrderApi, viewOrderApi, removeOrderApi} from '../data/constants.js';

export const viewProfile = async(merchId) => {
	var url = `${profileApi}?merchId=${merchId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const openOrders = async(merchId) => {
	var url = `${openOrderApi}?merchId=${merchId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}

export const viewOrder = async(orderId) => {
	var url = `${viewOrderApi}?id=${orderId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}