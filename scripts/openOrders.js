import {openOrders, viewOrder} from './ajax.js';

var infoDiv = document.getElementById('info-div');

window.getOrderDetails = function (orderId){
	var orderInfo = document.getElementById('modal-body');
	viewOrder(orderId)
	.then((res)=>{
		console.log(res.liOrdDtls);
		var appendBlock = "<div class='appendBlock'>";
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
	window.location.href = "index.html";
}else{
	openOrders(5)
	.then((res)=>{
		console.log(res[0])
		//check the size of array res
		var count = Object.keys(res).length; 
		if(count > 0){
			var mainDiv = '';
			for(let i = 0; i < count; i++){
				let obj = res[i];
				mainDiv += '<div class="mainDiv" onclick="getOrderDetails('+ obj.Order_Id+')">';
				let appendBlock = '';
				appendBlock += "<div class='appendBlock'>";
				appendBlock += `<p>Order Id : ${obj.Order_Id}</p>`;			
				appendBlock += `<p>First Name : ${obj.Customer_fName}</p>`;
				appendBlock += `<p>Last Name : ${obj.Customer_lName}</p>`;
				appendBlock += `<p>Order Comments : ${obj.OrderComment}</p>`;					
				appendBlock += "</div>";
				mainDiv += appendBlock + '</div>';
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
