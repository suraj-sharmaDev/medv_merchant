import {login} from './ajax.js?ver=2';

var formData = null;
var userName;
var password;
//check if the merchant is already loggedIn
function initializer() {
	// _localStorage.removeMerchant();
    if (_localStorage.merchId != null) {
        window.location.href = "profile.php";
    }
}

window.validator = function () {
    var form = document.forms.merchantForm;
    formData = new FormData(form);
    userName = formData.get('username');
    password = formData.get('password');
    if (userName.length > 0 && password.length > 0) {
        submit()
    } else {
        alert('Please input all fields');
    }
}

function submit() {
	const data = {
		userName : userName,
		pwd : password
	}
	//make login api call
	login(data)
	.then((res)=>{
		console.log(res)
		if(!res.userId || res.userId==0){
			alert('Wrong username or password')
		}else{
			var merchId = res.merchID;
			var coordinates = {
				lat : res.GEOLat,
				lng : res.GEOLong
			}
			_localStorage.addMerchant(merchId, coordinates);
			window.location.href = "profile.php";
		}
	})
	.catch((err)=>{
		console.log(err)
	})
}

//Startup script
initializer();