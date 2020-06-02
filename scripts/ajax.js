import {profileApi, openOrderApi, viewOrderApi, appConfigApi, getQuotedOrdersApi, updateInvoiceApi} from '../data/constants.js';

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
	//convert all the string date to readable
	result.map((r)=>{
		r.OrderDate = new Date(r.OrderDate);
	})

	return result;
}

export const viewOrder = async(orderId) => {
	var url = `${viewOrderApi}?id=${orderId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;	
}

export const appConfig = async(stateId=1)=>{
	var url = `${appConfigApi}?stateId=${stateId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;		
}

export const getQuotedOrders = async(merchId) => {
	var url = `${getQuotedOrdersApi}?merchId=${merchId}`;
	const response = await fetch(url);
	const result = await response.json();
	return result;
}