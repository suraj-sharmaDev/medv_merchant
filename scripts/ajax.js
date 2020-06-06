import {loginApi, profileApi, openOrderApi, viewOrderApi, appConfigApi, getQuotedOrdersApi, updateInvoiceApi, getPrescriptionApi,
getConfirmedOrdersApi, getDispatchedOrdersApi} from '../data/constants.js?ver=4';

export const login = async(data) => {
	var url = loginApi;
	const response = await fetch(url,{
		method : 'POST',
		headers : {
			'Content-Type': 'application/json'
		},
		body : JSON.stringify(data)
	});
	const result = response.json();
	return result;
}

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
	var orderUrl = `${viewOrderApi}?id=${orderId}`;
	var presUrl = `${getPrescriptionApi}?OrderId=${orderId}`;

	const orderResponse = await fetch(orderUrl);
	const orderResult = await orderResponse.json();
	//along with viewing order try getting the images too
	const presResponse = await fetch(presUrl);
	const presResult = await presResponse.json();
	return {orderResult, presResult};	
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
	//convert all the string date to readable
	result.map((r)=>{
		r.OrderDate = new Date(r.OrderDate);
	})
	return result;
}

export const getConfirmedOrders = async(merchId) => {
	var url = `${getConfirmedOrdersApi}?merchId=${merchId}`;
	const response = await fetch(url);
	const result = await response.json();
	//convert all the string date to readable
	result.map((r)=>{
		r.OrderDate = new Date(r.OrderDate);
	})	
	return result;
}

export const getDispatchedOrders = async(merchId) => {
	var url = `${getDispatchedOrdersApi}?merchId=${merchId}`;
	const response = await fetch(url);
	const result = await response.json();
	//convert all the string date to readable
	result.map((r)=>{
		r.OrderDate = new Date(r.OrderDate);
		r.DispatchedOn = new Date(r.DispatchedOn);
	})		
	return result;
}