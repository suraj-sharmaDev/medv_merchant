import {getQuotedOrders} from './ajax.js';

var infoDiv = document.getElementById('info-div');

if(_localStorage.merchId == null){
	window.location.href = "index.php";
}else{
	getQuotedOrders(_localStorage.merchId)
	.then((res)=>{
		if(res.Message){
			throw 'Wrong Id';
		}else{
			console.log(res);
		}
	})
	.catch((err)=>{
		alert('Your merchant Id is wrong! \n Please fix it.');
		_localStorage.removeMerchant();
		window.location.href = "index.php";		
	})
}