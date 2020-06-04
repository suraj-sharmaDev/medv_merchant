<?php include('_includes/header.html'); ?>
	<style type="text/css">
	.orders-row {
	    cursor: pointer;
	}

	.orders-row:hover {
	    cursor: pointer;
	    background-color : blue;
	}
	</style>
</head>
<body>
	<?php include('_includes/navbar.php'); ?>
	<div class="text-center">
		List of Confirmed Orders
	</div>			
	<div class="container-fluid pt-3" id="info-div">
		<!-- contains the merchant info -->
		<!-- autofilled by js -->
	</div>
	<!-- Modal to dispatch order -->
	<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="ModalLongTitle">Dispatch this order</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
		  <div class="modal-body">
		    <!-- info about the order populated here -->
		    Order Id <span id="orderId"></span></br>
		    <input type="text" placeholder="Enter Bill No." id="billNo"/>
		  </div>
		  <div class="modal-footer">
		    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		    <button type="submit" class="btn btn-primary" onclick="dispatch();">Dispatch Order</button>
		  </div>
	    </div>
	  </div>
	</div>		
</body>
<script type="module" src="./scripts/confirmedOrders.js?v=<?php echo(rand(10,100)); ?>"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
</html>