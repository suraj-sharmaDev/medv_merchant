import {viewProfile} from './ajax.js';

var infoDiv = document.getElementById('info-div');

if(_localStorage.merchId == null){
	window.location.href = "index.html";
}else{
	viewProfile(_localStorage.merchId)
	.then((res)=>{
		console.log(res)
		if(res.Message){
			throw 'Wrong Id';
		}else{
			var appendBlock = "";
			appendBlock += `<p>Name : ${res.Name}</p>`;
			appendBlock += `<p>Address : ${res.Address}</p>`;	
			appendBlock += `<p>Primary Contact Person : ${res.PrimaryContPerson}</p>`;	
			appendBlock += `<p>Primary Contact No : ${res.PrimaryContNo}</p>`;
			infoDiv.innerHTML = appendBlock;	
		}
	})
	.catch((err)=>{
		alert('Your merchant Id is wrong! \n Please fix it.');
		window.location.href = "index.html";		
	})
}