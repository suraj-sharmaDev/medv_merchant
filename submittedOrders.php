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
	<div class="container-fluid pt-3" id="info-div">
		<!-- contains the merchant info -->
		<!-- autofilled by js -->
	</div>
	<!-- Modal to display info about order -->
	<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="ModalLongTitle">Update Order</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <form action="updateOrder.php" method="POST">
		      <div class="modal-body" id="modal-body">
		      	<!-- info about the order populated here -->
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		        <button type="submit" class="btn btn-primary">Update Order</button>
		      </div>
	      </form>
	    </div>
	  </div>
	</div>		
</body>
<script type="module" src="./scripts/submittedOrders.js?v=<?php echo(rand(10,100)); ?>"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
</html>