//function call for quoteOrder
var orderId = $('#orderId').val();
// var orderId = 2623;
var appConfig = JSON.parse($('#appConfig').val());

var formData = {
	Order_Id : parseInt(orderId),
	MerchId : parseInt(_localStorage.merchId),
	SubTotal : 0,
	Discount : 0,
	OtherOff : 0,
	DiscountPercentage : parseInt(appConfig.stdAppOffer),
	GST : 0,
	GSTpercentage : parseInt(appConfig.GST),
	Shipping : parseInt(appConfig.stdShipping),
	billNo : 'lorem/ipsum/'+Math.floor((Math.random() * 3000) + 1),
	Total : 0,
	liOrdDtls : []
};

const updateBill = () => {
	//best way is to save old value in changeSp()
	//and do the subtotal calculation thereitself
	var subTotal = 0;
	formData.liOrdDtls.map((e)=>{
		subTotal += parseInt(e.Amt) * parseInt(e.Order_Qty)
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
    var pushData = {
    	OrderDtls_Id : $(this).find('.OrderDtls_Id').val(),
    	Order_Qty : $(this).find('.Order_Qty').val(),
    	Amt : $(this).find('.sp').val() ? parseInt($(this).find('.sp').val()) : 0,
    	MRP : $(this).find('.mrp').val() ? parseInt($(this).find('.mrp').val()) : 0
    }
    formData.liOrdDtls.push(pushData);
});
//initial bill configuration
updateBill();
console.log(formData);

window.changeMrp = function (el){
	//mrp should be greater than or equal to selling price
	// if mrp is less than sp replace sp with mrp
	var parent = $(el).closest('.medicines');
	var OrderDtls_Id = $(parent).find('.OrderDtls_Id').val();
	var sp = $(parent).find('.sp');
	if((parseInt(el.value) < parseInt(sp.val())) || !sp.val()){
		sp.val(el.value)
	}
	//updating formdata
	var index = formData.liOrdDtls.findIndex((v)=>v.OrderDtls_Id==OrderDtls_Id);
	var updated = formData.liOrdDtls[index];
	updated.MRP = parseInt(el.value); 
	updated.Amt = parseInt(sp.val());
	formData.liOrdDtls[index] = updated;
	//after updating formdata we have to make necessary updates in
	//bill too
	updateBill();
}

window.changeSp = function (el){
	//selling price should be less than or equal to mrp
	//if sp is greater than mrp => replace mrp with sp
	var parent = $(el).closest('.medicines');
	var OrderDtls_Id = $(parent).find('.OrderDtls_Id').val();
	var mrp = $(parent).find('.mrp');
	if(parseInt(el.value) > parseInt(mrp.val()) || !mrp.val()){
		mrp.val(el.value)
	}	
	//updating formdata
	var index = formData.liOrdDtls.findIndex((v)=>v.OrderDtls_Id==OrderDtls_Id);
	var updated = formData.liOrdDtls[index];
	updated.MRP = parseInt(mrp.val());
	updated.Amt = parseInt(el.value); 
	formData.liOrdDtls[index] = updated;
	//after updating formdata we have to make necessary updates in
	//bill too
	updateBill();
}

window.merchantDisc =  function (el){
	formData.OtherOff = el.value ? parseInt(el.value) : 0;
	updateBill();
}

window.quoteOrder = function(){
	var count = $('input[type="number"]').length;	
	var url = 'http://182.18.157.79/medv/api/order/createInv';
	$('input[type="number"]').each(function(){
	   if($(this).val() !=""){
	      count --;
	    }
	 });
	 if(count == 0){
		(async () => {
		  const rawResponse = await fetch(url, {
		    method: 'POST',
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(formData)
		  });
		  const content = await rawResponse.text();
		  if(content == -9){
		  	alert('The Quotation has already been modified');
		  }else{
		  	alert('Your Quotation has been submitted');
		  }
		  window.location.href = "openOrders.php";	
		})();	 	
	 }else{
	 	console.log(count);
	 	alert('Fill all the fields');
	 }
}