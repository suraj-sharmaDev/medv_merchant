class localstorage {
	constructor(){
		this.merchId = this.initialization();
	}
	initialization(){
		var data = null;
		if(!localStorage.getItem('merchId')){
			localStorage.setItem('merchId', null);
		}else{
			data = localStorage.getItem('merchId') == "null" ? null : localStorage.getItem('merchId');
		}
		console.log('Merchant Id : ',data);
		return data;
	}
	addMerchant(merchId){
		this.merchId = merchId;
		localStorage.setItem('merchId', merchId);
	}

	removeMerchant(){
		this.merchId = null;
		localStorage.setItem('merchId', null);
	}
}