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

function updatePage(){
	var count = Object.keys(data).length;
	if (count > 0) {
	    var mainDiv = '<table class="table table-dark" border = "1">';
	    mainDiv += '<thead>';
	    mainDiv += '<tr><td>Order Id</td><td>Distance</td><td>Order Date</td><td>Total</td></tr>';
	    mainDiv += '</thead><tbody>';
	    for (let i = 0; i < count; i++) {
	        let obj = data[i];
	        mainDiv += '<tr class="orders-row" onclick="getOrderDetails(' + obj.Order_Id + ')">';
	        let appendBlock = '';
	        appendBlock += `<td>${obj.Order_Id}</td>`;
	        appendBlock += `<td>${obj.Dist}</td>`;
	        appendBlock += `<td>${obj.OrderDate.toDateString()}</td>`;
	        appendBlock += `<td>${obj.Total}</td>`;
	        mainDiv += appendBlock + '</tr>';
	    }
	    infoDiv.innerHTML = mainDiv;
	} else {
	    infoDiv.innerHTML = '<div class="mainDiv">No Open Orders</div>';
	}
}