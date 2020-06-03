import {openOrders, viewOrder, appConfig} from './ajax.js?ver=1';

var infoDiv = document.getElementById('info-div');
var data = null;
var type = null;

window.getOrderDetails = function (orderId){
	var imgUrl = `http://medv.in/medv/api/Image/getprescriptionImage?OrderId=${orderId}&imageName=`;
	var orderInfo = document.getElementById('modal-body');
	viewOrder(orderId)
	.then((res)=>{
		var orders = res.orderResult;
		var prescriptions = res.presResult;
		var appendBlock = "<div class='appendBlock'>";
		appendBlock += `<input type="hidden" name="orderId" value="${orderId}">`;
		//also if prescription exists form a gallery of presciption images
		if(prescriptions.length > 0){
			appendBlock += '<p>Prescription Images</p>';			
			prescriptions.map(p=>{
				var img = imgUrl+p;
				appendBlock += `<a data-fancybox="gallery" href=${img} class="imageList"><img class="thumbnail" src=${img}></a>`;
			})			
		}
		// appendBlock += `<a data-fancybox="gallery" href=${img} class="imageList"><img class="thumbnail" src=${img}></a>`;
		// appendBlock += `<a data-fancybox="gallery" href=${img} class="imageList"><img class="thumbnail" src=${img}></a>`;		
		appendBlock += "<p class='text-center'>Requested Medicines</p>";
		orders.liOrdDtls.map((order)=>{
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

window.enlarge = (el) => {
	$(el).width(1000);
}
// main function call
if(_localStorage.merchId == null){
	window.location.href = "index.php";
}else{
	openOrders(_localStorage.merchId)
	.then((res)=>{
		console.log(res[0]);
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
	    mainDiv += '<tr><td>Order Id</td><td>Distance</td><td>Landmark</td><td>Order Date</td></tr>';
	    mainDiv += '</thead><tbody>';
	    for (let i = 0; i < count; i++) {
	        let obj = data[i];
	        mainDiv += '<tr class="orders-row" onclick="getOrderDetails(' + obj.Order_Id + ')">';
	        let appendBlock = '';
	        appendBlock += `<td>${obj.Order_Id}</td>`;
	        appendBlock += `<td>${obj.Dist}</td>`;
	        appendBlock += `<td>${obj.LandMark}</td>`;
	        appendBlock += `<td>${obj.OrderDate.toDateString()}</td>`;
	        mainDiv += appendBlock + '</tr>';
	    }
	    infoDiv.innerHTML = mainDiv;
	} else {
	    infoDiv.innerHTML = '<div class="mainDiv">No Open Orders</div>';
	}
}

window.filterStruct = function (element){
	type = element.value;
	data = mergeSort(data);
	updatePage();
}

const mergeSort = array => {
	//check if array can be split
	if(array.length < 2) return array;
	//get middle index
	const middle = Math.floor(array.length/2);
	//split array in two sides
	const leftSide = array.slice(0, middle);
	const rightSide = array.slice(middle);
	//use recursion and continue splitting
	return merge(mergeSort(leftSide), mergeSort(rightSide));
}

const merge = (left, right) => {
	//cretae new array
	const result = [];
	//check if either left array and right array is empty
	while(left.length && right.length){
		//find lower value
		if(left[0][type] >= right[0][type]){
			//add left value
			result.push(left.shift()); //shift pops out first value
		}else{
			//add right value
			result.push(right.shift())
		}
	}
	//merge left array
	while(left.length) result.push(left.shift());
	//merge right array			
	while(right.length) result.push(right.shift());	
	//return result array
	return result;
}