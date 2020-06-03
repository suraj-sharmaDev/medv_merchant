import {updateInvoiceApi} from '../data/constants.js';

window.updateOrder = () => {
	var invoiceMstId = $('#invoiceMstId').val();
	formData.InvoiceMst_Id = parseInt(invoiceMstId);
	delete formData.billNo;
	formData.BillNo = 'lorem/ipsum/'+Math.floor((Math.random() * 3000) + 1);
	var medicines = formData.liOrdDtls;
	delete formData.liOrdDtls;
	formData.liInvDtls = medicines;

	var count = $('input[type="number"]').length;	
	$('input[type="number"]').each(function(){
	   if($(this).val() !=""){
	      count --;
	    }
	 });
	 if(count == 0){
		(async () => {
		  const rawResponse = await fetch(updateInvoiceApi, {
		    method: 'POST',
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(formData)
		  });
		  const content = await rawResponse.text();
		  console.log(content);
		  if(content == 1){
		  	alert('Your quote is submitted');
			window.location.href = "submittedOrders.php";	
		  }else{
		  	alert('Some error occurred');
			window.location.href = "submittedOrders.php";
		  }
		})();	 	
	 }else{
	 	console.log(count);
	 	alert('Fill all the fields');
	 }
}