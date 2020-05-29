import {openOrders, viewOrder, appConfig} from './ajax.js';

var infoDiv = document.getElementById('info-div');

window.getOrderDetails = function (orderId){
	var orderInfo = document.getElementById('modal-body');
	viewOrder(orderId)
	.then((res)=>{
		console.log(res.liOrdDtls);
		var appendBlock = "<div class='appendBlock'>";
		appendBlock += `<input type="hidden" name="orderId" value="${orderId}">`;
		appendBlock += `<p>Customer Name ${res.Customer_fName} ${res.Customer_lName}</p>`;
		appendBlock += "<p class='text-center'>Requested Medicines</p>";
		res.liOrdDtls.map((order)=>{
			appendBlock += `<p>${order.Order_Qty} X ${order.MedicineName}</p>`;
		})
		appendBlock += "</div>";

		orderInfo.innerHTML = appendBlock;
		$('#modal').modal('toggle');
	})
	.catch(err=>{
		console.log(err)
	})
}

// main function call
if(_localStorage.merchId == null){
	window.location.href = "index.php";
}else{
	openOrders(5)
	.then((res)=>{
		console.log(res[0])
		//check the size of array res
		var count = Object.keys(res).length; 
		if(count > 0){
			var mainDiv = '<table class="table table-dark" border = "1">';
			mainDiv += '<thead>';
			mainDiv += '<tr><td>Order Id</td><td>Customer Name</td><td>Order Comments</td></tr>';
			mainDiv += '</thead><tbody>';						
			for(let i = 0; i < count; i++){
				let obj = res[i];
				mainDiv += '<tr class="orders-row" onclick="getOrderDetails('+ obj.Order_Id+')">';
				let appendBlock = '';
				appendBlock += `<td>${obj.Order_Id}</td>`;			
				appendBlock += `<td>${obj.Customer_fName} ${obj.Customer_lName}</td>`;
				appendBlock += `<td>${obj.OrderComment}</td>`;					
				mainDiv += appendBlock + '</tr>';
			}
			infoDiv.innerHTML = mainDiv;	
		}else{
			infoDiv.innerHTML = '<div class="mainDiv">No Open Orders</div>';
		}
	})
	.catch((err)=>{
		console.log(err)
	})
}


