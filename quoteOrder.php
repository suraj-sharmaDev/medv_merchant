<?php
	if(!$_POST['orderId']){
		header('Location: openOrders.php');
	}else{
		require_once('_includes/curl_helper.php');
		$orderId = $_POST['orderId'];
		//first the curl response to get order details
		$orderUrl = 'http://medv.in/medv/api/order/ordById?id='.$orderId;
		$curlOrder = new Curl_helper($orderUrl);
		$apiOrder = $curlOrder->exec();
		//second curl to get app config
		$configUrl = 'http://medv.in/medv/api/app/Config?stateId=1';
		$curlConfig = new Curl_helper($configUrl);
		$apiConfig = $curlConfig->exec();
		//third tp get list of prescription images
		$presUrl = 'http://medv.in/medv/api/getprescriptionList?OrderId='.$orderId;
		$curlPres = new Curl_helper($presUrl);
		$apiPres = $curlPres->exec();

		if(!$apiOrder && !$apiConfig && !$apiPres){
			echo 'There was an issue in server side!. Please contact administrator';
		}else{
			$config = json_decode($apiConfig, true); 
			$prescription = json_decode($apiPres, true);
			$orderDetails = json_decode($apiOrder, true);
			$geoCords = array(
				"lat" => $orderDetails['GEOlat'],
				"lng" => $orderDetails['GEOlng']
			);
			$medicines = $orderDetails['liOrdDtls'];

?>
<?php include('_includes/header.php'); ?>
<link rel="stylesheet" href="assets/css/jquery.fancybox.min.css" type="text/css" media="screen" />
	<style type="text/css">
	.imageList {
		margin : 10px;
	}
	.thumbnail {
		height : 10%;
		width : 10%;
	}
	.map {
		height: 300px;
		width: 100%;
	}
	</style>
</head>
<body>
	<?php include('_includes/navbar.php'); ?>
	<div class="container-fluid pt-3" id="info-div">
		<!-- contains the order info -->
		<div class="text-center">
            <h4>Order Id <?php echo $orderId; ?></h4>
        </div>
        <!-- display map here -->
        <div id="map" style="margin-bottom: 10px">
        	<button class="btn btn-primary" onclick="initMap();">See the location in maps</button>
        </div> 
       	<!-- prescription images   -->
		<form action="">
			<?php 
				if(sizeof($prescription)>0){
					echo "<h5>Prescriptions</h5><br>";					
					$imgUrl = "http://medv.in/medv/api/Image/getprescriptionImage?OrderId=".$orderId."&imageName=";
					foreach ($prescription as $key => $value) {
						$img = $imgUrl.$value;
			?>
			<a data-fancybox="gallery" href="<?php echo $img; ?>" class="imageList"><img class="thumbnail" src="<?php echo $img; ?>"></a>
			<?php
					} //end of foreach
					echo "<br><br>";
				} //end of if
			?>
			<!-- requested medicines -->
			<h5>Requested Medicines</h5><br>
			<input type="hidden" id="appConfig" value='<?php echo $apiConfig;?>' />
			<input type="hidden" name="orderId" id="orderId" value="<?php echo $orderId; ?>" />			
			<?php
				//iterate over the medicines got from api above
			 if(sizeof($medicines) > 0){
				foreach ($medicines as $key => $value) {
			?>
			<div class="form-group medicines">
				<input type="hidden" class="OrderDtls_Id" value="<?php echo $value['OrderDtls_Id']; ?>" />
				<input type="hidden" class="Order_Qty" value="<?php echo $value['Order_Qty']; ?>" />
				<p><?php echo $value['MedicineName']; ?></p>
				<div class="row">
					<div class="col-2">
						<?php echo $value['Order_Qty'].' '.'No'; ?>			
					</div>					
					<div class="col-5">
						<label for="mrp">MRP Price</label>
						<input type="number" placeholder="0" class="form-control mrp" value="0" onchange="changeMrp(this);" />
					</div>
					<div class="col-5">
						<label for="sp">Selling Price</label>
						<input type="number" placeholder="0" class="form-control sp" value="0" onchange="changeSp(this);" />
					</div>					
				</div>
			</div>
			<?php
				}//end of foreach
			 } //end of if
			?>
			<!-- final bill for the order -->
			<div class="w-50 mx-auto form-group d-flex justify-content-between">
				<span>Sub Total : </span>
				<span id="sub-total"></span>
			</div>
			<div class="w-50 mx-auto form-group d-flex justify-content-between">
				<span><?php echo $config['stdAppOffer']; ?>% discount : </span>
				<span id="discount"></span>
			</div>
			<div class="w-50 mx-auto form-group d-flex justify-content-between">
				<span>Merchant Off : </span>
				<input type="number" placeholder="0" onchange="merchantDisc(this);" value="0" />
			</div>
			<div class="w-50 mx-auto form-group"><hr/></div>
			<div class="w-50 mx-auto form-group d-flex justify-content-between">
				<span><?php echo $config['GST']; ?>% GST : </span>
				<span id="gst"></span>
			</div>			
			<div class="w-50 mx-auto form-group d-flex justify-content-between">
				<span>Service Charge : </span>
				<span id="service-charge"><?php echo $config['stdShipping']; ?></span>
			</div>
			<div class="w-50 mx-auto form-group"><hr/></div>
			<div class="w-50 mx-auto form-group d-flex justify-content-between">
				<span>Total : </span>
				<span id="total"></span>
			</div>
			<div class="w-50 mx-auto form-group">
				<button type="button" class="btn btn-primary" onclick="quoteOrder();">Submit</button>				
			</div>		
		</form>
	</div>
</body>
<script>
	customerCoords = <?php echo(json_encode($geoCords));?>;
</script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLrslNf2R4vS-nbA2SVqPunOnlG6jsvvo"></script>
<script src="./scripts/mapInit.js?v=1"></script>
<script type="module" src="./scripts/quoteOrder.js?v=<?php echo(rand(10,100)); ?>"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
<script type="text/javascript" src="assets/js/jquery.fancybox.min.js"></script>
</html>

<?php
		}//end of inner else
	}//end of else
?>
