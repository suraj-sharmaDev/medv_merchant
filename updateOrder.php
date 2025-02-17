<?php
	if(!$_POST['orderId'] && !$_POST['invoiceMstId']){
		header('Location: submittedOrders.php');
	}else{
		require_once('_includes/curl_helper.php');
		$orderId = $_POST['orderId'];
		$invoiceMstId = $_POST['invoiceMstId'];
		//first the curl response to get order details
		$orderUrl = 'http://medv.in/medv/api/getInvById?id='.$invoiceMstId;
		$curlOrder = new Curl_helper($orderUrl);
		$apiOrder = $curlOrder->exec();

		$configUrl = 'http://medv.in/medv/api/app/Config?stateId=1';
		$curlConfig = new Curl_helper($configUrl);
		$apiConfig = $curlConfig->exec();

		if(!$apiOrder && !$apiConfig){
			echo 'There was an issue in server side!. Please contact administrator';
		}else{
			$config = json_decode($apiConfig, true); 
			$order = json_decode($apiOrder, true);
			$geoCords = array(
				"lat" => $order['DeliveryGEOLat'],
				"lng" => $order['DeliveryGEOLng']
			);			
			$medicines = $order['liInvDtls'];

?>
<?php include('_includes/header.php'); ?>
<style>
	.map {
		height: 300px;
		width: 100%;
	}	
</style>
<script>
	console.log(<?php echo $apiOrder?>);
	customerCoords = <?php echo(json_encode($geoCords));?>;
</script>
</head>
<body>
	<?php include('_includes/navbar.php'); ?>
	<div class="container-fluid pt-3" id="info-div">
		<!-- contains the order info -->
		<div class="text-center">
            <h4>Updating Order with Id <?php echo $orderId; ?></h4>
        </div>		
        <div id="map" style="margin-bottom: 10px">
        	<button class="btn btn-primary" onclick="initMap();">See the location in maps</button>
        </div>         
		<form action="">
			<input type="hidden" id="appConfig" value='<?php echo $apiConfig;?>' />
			<input type="hidden" name="orderId" id="orderId" value="<?php echo $orderId; ?>" />			
			<input type="hidden" name="invoiceMstId" id="invoiceMstId" value="<?php echo $invoiceMstId; ?>" />						
			<?php
				//iterate over the medicines got from api above
				foreach ($medicines as $key => $value) {
			?>
			<div class="form-group medicines">
				<input type="hidden" class="InvoiceDtls_Id" value="<?php echo $value['InvoiceDtls_Id']; ?>" />
				<input type="hidden" class="Qty" value="<?php echo $value['Qty']; ?>" />
				<p><?php echo $value['MedicineName']; ?></p>
				<div class="row">
					<div class="col-2">
						<?php echo $value['Qty'].' '.'No'; ?>			
					</div>					
					<div class="col-5">
						<label for="mrp">MRP Price</label>
						<input type="number" placeholder="0" class="form-control mrp" onchange="changeMrp(this);" value="<?php echo $value['Price']?>"/>
					</div>
					<div class="col-5">
						<label for="sp">Selling Price</label>
						<input type="number" placeholder="0" class="form-control sp" onchange="changeSp(this);" value="<?php echo $value['Price']?>" />
					</div>					
				</div>
			</div>
			<?php
				}//end of foreach
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
				<input type="number" placeholder="0" onchange="merchantDisc(this);" value="<?php echo $order['OtherOff']?>"/>
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
				<button type="button" class="btn btn-primary" onclick="updateOrder();">Submit</button>				
			</div>		
		</form>
	</div>
</body>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLrslNf2R4vS-nbA2SVqPunOnlG6jsvvo"></script>
<script src="./scripts/mapInit.js"></script>
<script type="module" src="./scripts/updateOrder.js?v=<?php echo(rand(10,100)); ?>"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
</html>

<?php
		}//end of inner else
	}//end of else
?>
