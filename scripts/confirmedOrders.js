import {getConfirmedOrders} from './ajax.js?ver=4';
import {dispatchOrderApi} from '../data/constants';

var infoDiv = document.getElementById('info-div');
var data = null;
var formData = null;
// main function call
if(_localStorage.merchId == null){
	window.location.href = "index.php";
}else{
	getConfirmedOrders(_localStorage.merchId)
	.then((res)=>{
		//check the size of array res
		data = res;
	})
	.then(updatePage)
	.catch((err)=>{
		console.log(err)
	})
}

function updatePage(){
	var count = Object.keys(data).length;
	if (count > 0) {
	    var mainDiv = '<table class="table table-dark" border = "1">';
	    mainDiv += '<thead>';
	    mainDiv += '<tr><td>Order Id</td><td>Landmark</td><td>Order Date</td><td>Total</td></tr>';
	    mainDiv += '</thead><tbody>';
	    for (let i = 0; i < count; i++) {
	        let obj = data[i];
	        mainDiv += '<tr class="orders-row" onclick="modalToggle(this);">';
	        let appendBlock = '';
	        appendBlock += `<td class="orderId">${obj.Order_Id}</td>`;
	        appendBlock += `<td>${obj.LandMark}</td>`;
	        appendBlock += `<td>${obj.OrderDate.toDateString()}</td>`;
	        appendBlock += `<td>${obj.Total}</td>`;	        
	        mainDiv += appendBlock + '</tr>';
	    }
	    infoDiv.innerHTML = mainDiv;
	} else {
	    infoDiv.innerHTML = '<div class="mainDiv">No Open Orders</div>';
	}
	console.log(data);
}

window.modalToggle = function(el){
	//since the el is the parent class
	//find its child with orderId class
	var orderId = parseInt($(el).find(".orderId").html());
	formData = {
		orderId : orderId
	}
	$('#orderId').html(orderId);
	$('#modal').modal('toggle');
}

window.dispatch = function(){
	var billNo = $('#billNo').val();
	if(billNo){
		formData.billNo = parseInt(billNo);
		//make an ajax request to dispatch this order
		var url = `${dispatchOrderApi}?invId=${formData.orderId}&billNo=${formData.billNo}`;
		(async () => {
		  const rawResponse = await fetch(url, {
		    method: 'POST'
		  });
		  const content = await rawResponse.text();
		  console.log(content);
		  if(content == 1){
		  	alert('The order has been dispatched, status is '+content);
		  	$('#modal').modal('toggle');
		  	location.reload();
		  }else{
		  	alert('Some error occurred, sorry for inconvenience!, status is '+content);
		  }
		})();
	}else{
		alert('Please specify bill No');
	}
}