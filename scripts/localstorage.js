class localstorage {
	constructor(){
		this.merchId = this.initialization();
		this.coordinates = this.initialization('coordinates');
		//intial values
		console.log('MerchantId :',this.merchId,' coordinates :', this.coordinates)
	}
	initialization(type='merchId'){
		var data = null;
		if(type=='merchId'){
			if(!localStorage.getItem('merchId')){
				localStorage.setItem('merchId', null);
			}else{
				data = localStorage.getItem('merchId') == "null" ? null : localStorage.getItem('merchId');
			}
		}else{
			if(!localStorage.getItem('coordinates')){
				localStorage.setItem('coordinates', null);
			}else{
				data = localStorage.getItem('coordinates') == "null" ? null : JSON.parse(localStorage.getItem('coordinates'));
			}
		}
		return data;
	}
	addMerchant(merchId, coordinates){
		this.merchId = merchId;
		this.coordinates = coordinates;
		localStorage.setItem('merchId', merchId);
		localStorage.setItem('coordinates', JSON.stringify(coordinates));
	}

	removeMerchant(){
		this.merchId = null;
		localStorage.setItem('merchId', null);
		localStorage.setItem('coordinates', null);
	}
}