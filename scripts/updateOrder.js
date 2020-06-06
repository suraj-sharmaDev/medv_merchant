import {updateInvoiceApi} from '../data/constants.js';

window.orderId = $('#orderId').val();
// var orderId = 2623;
window.appConfig = JSON.parse($('#appConfig').val());

window.formData = {
	Order_Id : parseInt(orderId),
	MerchId : parseInt(_localStorage.merchId),
	SubTotal : 0,
	Discount : 0,
	OtherOff : 0,
	DiscountPercentage : parseInt(appConfig.stdAppOffer),
	GST : 0,
	GSTpercentage : parseInt(appConfig.GST),
	Shipping : parseInt(appConfig.stdShipping),
	billNo : 'quote',
	Total : 0,
	liInvDtls : []
};

const updateBill = () => {
	//best way is to save old value in changeSp()
	//and do the subtotal calculation thereitself
	var subTotal = 0;
	formData.liInvDtls.map((e)=>{
		subTotal += parseInt(e.Price) * parseInt(e.Qty)
	});
	formData.SubTotal = subTotal;
	formData.Discount = formData.DiscountPercentage > 0 ? parseFloat((formData.DiscountPercentage * 0.01 * subTotal).toFixed(2)) : 0;
	var semiTotal = formData.SubTotal - formData.Discount - formData.OtherOff;
	formData.GST = parseFloat((formData.GSTpercentage * 0.01 * semiTotal).toFixed(2));
	formData.Total = parseFloat((semiTotal + formData.GST + formData.Shipping).toFixed(2));
	$('#sub-total').html(subTotal);
	$('#discount').html(formData.Discount);
	$('#gst').html(formData.GST);
	$('#total').html(formData.Total);
}

//intial loop through all medicines
$(".medicines").each(function() {
    // values.push($(this).val());
    // console.log($(this).children());
    //Amt is MRP
    //Price is SP
    var pushData = {
    	InvoiceDtls_Id : $(this).find('.InvoiceDtls_Id').val(),
    	Qty : $(this).find('.Qty').val(),
    	UoM : "No",
    	Amt : $(this).find('.mrp').val() ? parseInt($(this).find('.mrp').val()) : 0,
    	Price : $(this).find('.sp').val() ? parseInt($(this).find('.sp').val()) : 0
    }
    formData.liInvDtls.push(pushData);
});
//initial bill configuration
updateBill();

window.changeMrp = function (el){
	//mrp should be greater than or equal to selling price
	// if mrp is less than sp replace sp with mrp
	var parent = $(el).closest('.medicines');
	var InvoiceDtls_Id = $(parent).find('.InvoiceDtls_Id').val();
	var sp = $(parent).find('.sp');

	$(el).val(parseInt($(el).val()))
	if((parseInt(el.value) < parseInt(sp.val())) || sp.val()==0){
		sp.val(parseInt(el.value))
	}
	//updating formdata
	var index = formData.liInvDtls.findIndex((v)=>v.InvoiceDtls_Id==InvoiceDtls_Id);
	var updated = formData.liInvDtls[index];
	updated.Amt = parseInt(el.value); 
	updated.Price = parseInt(sp.val());
	formData.liInvDtls[index] = updated;
	//after updating formdata we have to make necessary updates in
	//bill too
	updateBill();
}

window.changeSp = function (el){
	//selling price should be less than or equal to mrp
	//if sp is greater than mrp => replace mrp with sp
	var parent = $(el).closest('.medicines');
	var InvoiceDtls_Id = $(parent).find('.InvoiceDtls_Id').val();
	var mrp = $(parent).find('.mrp');
	$(el).val(parseInt($(el).val()))
	if(parseInt(el.value) > parseInt(mrp.val()) || !mrp.val()){
		mrp.val(parseInt(el.value))
	}	
	//updating formdata
	var index = formData.liInvDtls.findIndex((v)=>v.InvoiceDtls_Id==InvoiceDtls_Id);
	var updated = formData.liInvDtls[index];
	updated.Amt = parseInt(mrp.val());
	updated.Price = parseInt(el.value); 
	formData.liInvDtls[index] = updated;
	//after updating formdata we have to make necessary updates in
	//bill too
	updateBill();
}

window.merchantDisc =  function (el){
	formData.OtherOff = el.value ? parseInt(el.value) : 0;
	updateBill();
}

window.updateOrder = () => {
	var invoiceMstId = $('#invoiceMstId').val();
	formData.InvoiceMst_Id = parseInt(invoiceMstId);
	delete formData.billNo;
	formData.BillNo = 'quote';
	var medicines = formData.liInvDtls;
	delete formData.liInvDtls;
	formData.liInvDtls = medicines;

	var count = $('input[type="number"]').length;	
	$('input[type="number"]').each(function(){
	   if($(this).val() !=""){
	      count --;
	    }
	 });
	 if(count == 0){
	 	console.log(formData);
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