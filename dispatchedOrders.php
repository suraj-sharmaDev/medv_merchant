<?php include('_includes/header.html'); ?>
</head>
<body>
	<?php include('_includes/navbar.php'); ?>
	<div class="text-center">
		List of Dispatched Orders
	</div>			
	<div class="container-fluid pt-3" id="info-div">
		<!-- contains the merchant info -->
		<!-- autofilled by js -->
	</div>
</body>
<script type="module" src="./scripts/dispatchedOrders.js?v=<?php echo(rand(10,100));?>"></script>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" crossorigin="anonymous"></script>
<script type="text/javascript" src="assets/js/bootstrap.min.js"></script>
</html>