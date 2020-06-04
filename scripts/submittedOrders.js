import {getQuotedOrders} from './ajax.js';

var infoDiv = document.getElementById('info-div');
var data = null;

if(_localStorage.merchId == null){
	window.location.href = "index.php";
}else{
	getQuotedOrders(_localStorage.merchId)
	.then((res)=>{
		if(res.Message){
			throw 'Wrong Id';
		}else{
			data = res;
		}
	})
	.then(updatePage)
	.catch((err)=>{
		alert('Your merchant Id is wrong! \n Please fix it.');
		_localStorage.removeMerchant();
		window.location.href = "index.php";		
	})
}

window.getOrderDetails = function (orderId, invoiceMstId){
	console.log(orderId, invoiceMstId);
	var orderInfo = document.getElementById('modal-body');
	var appendBlock = "<div class='appendBlock'>";
	appendBlock += `<input type="hidden" name="orderId" value="${orderId}">`;
	appendBlock += `<input type="hidden" name="invoiceMstId" value="${invoiceMstId}">`;
	appendBlock += '<p>Do you want to update this order?</p>';
	appendBlock += "</div>";

	orderInfo.innerHTML = appendBlock;

	$('#modal').modal('toggle');

	console.log(orderId, invoiceMstId);
}
function updatePage(){
	var count = Object.keys(data).length;
	if (count > 0) {
	    var mainDiv = '<table class="table table-dark" border = "1">';
	    mainDiv += '<thead>';
	    mainDiv += '<tr><td>Order Id</td><td>Distance</td><td>Order Date</td><td>Total</td></tr>';
	    mainDiv += '</thead><tbody>';
	    for (let i = 0; i < count; i++) {
	        let obj = data[i];
	        mainDiv += '<tr class="orders-row" onclick="getOrderDetails(' + obj.Order_Id + ','+ obj.InvoiceMst_Id + ')">';
	        let appendBlock = '';
	        appendBlock += `<td>${obj.Order_Id}</td>`;
	        appendBlock += `<td>${obj.Dist}</td>`;
	        appendBlock += `<td>${obj.OrderDate.toDateString()}</td>`;
	        appendBlock += `<td>${obj.Total}</td>`;
	        mainDiv += appendBlock + '</tr>';
	    }
	    infoDiv.innerHTML = mainDiv;
	} else {
	    infoDiv.innerHTML = '<div class="mainDiv">No Submitted Orders</div>';
	}
}