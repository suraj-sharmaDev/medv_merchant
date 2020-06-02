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
	<div class="container">
		<div class="row">
			<div class="col">
				<label for="filter">Sort Table By : </label>
				<select name="filter" id="filter" onchange="filterStruct(this);">
				  <option value="Order_Id">Order Id</option>
				  <option value="Dist">Distance</option>
<!-- 				  <option value="date">Date</option> -->
				</select>
			</div>
		</div>
		<div class="row">
			<div class="col" id="info-div">
				<!-- contains the merchant info -->
				<!-- autofilled by js -->
			</div>
		</div>
	</div>
	<!-- Modal to display info about order -->
	<div class="modal fade" id="modal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h5 class="modal-title" id="ModalLongTitle">Order Details</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <form action="quoteOrder.php" method="POST">	      
		      <div class="modal-body" id="modal-body">
		      	<!-- info about the order populated here -->
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		        <button type="submit" class="btn btn-primary">Quote Order</button>
		      </div>
	      </form>
	    </div>
	  </div>
	</div>	
</body>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="bootstrap/js/bootstrap.min.js"></script>
<script type="module" src="./scripts/openOrders.js?v=<?php echo(rand(10,100)); ?>"></script>
</html>