//function call for quoteOrder
var orderId = $('#orderId').val();
var appConfig = JSON.parse($('#appConfig').val());

var formData = {
	Order_Id : parseInt(orderId),
	MerchId : parseInt(_localStorage.merchId),
	SubTotal : 0,
	Discount : 0,
	OtherOff : 0,
	DiscountPercentage : 10,
	GST : 0,
	GSTpercentage : parseInt(appConfig.GST),
	Shipping : parseInt(appConfig.stdShipping),
	Total : 0,
	liOrdDtls : []
};

const updateBill = () => {
	//best way is to save old value in changeSp()
	//and do the subtotal calculation thereitself
	var subTotal = 0;
	formData.liOrdDtls.map((e)=>{
		subTotal += parseInt(e.Amt)
	});
	formData.SubTotal = subTotal;
	formData.GST = parseInt((formData.GSTpercentage * 0.01 * subTotal).toFixed(1));
	formData.Discount = parseInt((formData.DiscountPercentage * 0.01 * subTotal).toFixed(1));
	formData.Total = formData.SubTotal + formData.GST + formData.Shipping - formData.Discount - formData.OtherOff;
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
	var parent = $(el).closest('.medicines');
	var OrderDtls_Id = $(parent).find('.OrderDtls_Id').val();
	var index = formData.liOrdDtls.findIndex((v)=>v.OrderDtls_Id==OrderDtls_Id);
	var updated = formData.liOrdDtls[index];
	updated.MRP = parseInt(el.value); 
	formData.liOrdDtls[index] = updated;
}

window.changeSp = function (el){
	var parent = $(el).closest('.medicines');
	var OrderDtls_Id = $(parent).find('.OrderDtls_Id').val();
	var index = formData.liOrdDtls.findIndex((v)=>v.OrderDtls_Id==OrderDtls_Id);
	var updated = formData.liOrdDtls[index];
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
	var count = 5;
	$('input[type="number"]').each(function(){
	   if($(this).val() !=""){
	      count --;
	    }
	 });
	 if(count == 0){
	 	console.log('submitting');
	 }else{
	 	alert('Fill all the fields');
	 }
}