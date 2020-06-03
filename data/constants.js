const baseUrl = 'http://medv.in/';

// ---------------merchant---------------
export const profileApi = baseUrl+'medv/api/merch/profile';
export const openOrderApi = baseUrl+'medv/api/order/getOpenOrder';
export const viewOrderApi = baseUrl+'medv/api/order/ordById';
export const removeOrderApi = baseUrl+'medv/api/removeFromMylist';
export const createInvoiceApi = baseUrl+'medv/api/order/createInv';
export const getQuotedOrdersApi = baseUrl+'medv/api/getMySubmitedQuote';
export const updateInvoiceApi = baseUrl+'medv/api/editInvoice';
export const appConfigApi = baseUrl+'medv/api/app/Config'; 

export const getPrescriptionApi = baseUrl+'medv/api/getprescriptionList';
export const getImageApi = baseUrl+'medv/api/Image/getprescriptionImage';