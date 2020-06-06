const baseUrl = 'http://medv.in/';

// ---------------merchant---------------
export const loginApi = baseUrl+'medv/api/merch/w/merchLogin';
export const profileApi = baseUrl+'medv/api/merch/profile';
export const openOrderApi = baseUrl+'medv/api/order/getOpenOrder';
export const viewOrderApi = baseUrl+'medv/api/order/ordById';
export const removeOrderApi = baseUrl+'medv/api/removeFromMylist';
export const createInvoiceApi = baseUrl+'medv/api/order/createInv';
export const getQuotedOrdersApi = baseUrl+'medv/api/getMySubmitedQuote';
export const getInvoieApi = baseUrl+'medv/api/getInvById';
export const updateInvoiceApi = baseUrl+'medv/api/editInvoice';
export const appConfigApi = baseUrl+'medv/api/app/Config'; 

export const getPrescriptionApi = baseUrl+'medv/api/getprescriptionList';
export const getImageApi = baseUrl+'medv/api/Image/getprescriptionImage';

export const getConfirmedOrdersApi = baseUrl+'medv/api/getMyConfirmedOrders';
export const dispatchOrderApi = baseUrl+'medv/api/updateOrderDispatch';
export const getDispatchedOrdersApi = baseUrl+'medv/api/getDispatchedOrders';