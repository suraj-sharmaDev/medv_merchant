<?php include('_includes/header.html'); ?>
</head>
<body>
	<div class="d-flex flex-column">
	  <div class="p-2">
			<input type="text" id="merchant_id" placeholder="Enter Merchant Id" onkeyup="validator(event);" />	  	
	  </div>
	  <div class="p-2">
			<button onclick="validator('submit');">Submit</button>	  	
	  </div>
	</div>	
</body>
<script type="text/javascript">
	//check if the merchant is already loggedIn
	function initializer(){
		if(_localStorage.merchId!=null){
			window.location.href = "profile.php";
		}
	}
	function validator(prop){
		if(typeof prop == 'object'){
			if(prop.keyCode == 13){
				submit();
			}else{
				var value = document.getElementById('merchant_id').value;
				_localStorage.addMerchant(value);	
			}
		}else{
			submit();
		}
	}

	function submit(){
		if(_localStorage.merchId){
			console.log('submitting')
			//set page redirect link
			window.location.href = "profile.php";
		}else{
			alert('Set your merchant Id')
		}
	}

	//Startup script
	initializer();
</script>
</html>