<?php include('_includes/header.php'); ?>
</head>
<body>
	<div class="container-fluid">
	  <form class="w-50 mt-3" id="merchantForm">
	   <div class="form-group">
	    <label for="inputUserName">User Name</label>
	    <input type="text" class="form-control" name="username" id="inputUserName" placeholder="Enter Username">
	   </div>
	   <div class="form-group">
	    <label for="inputPassword">Password</label>
	    <input type="password" class="form-control" name="password" id="inputPassword" placeholder="Password">
	   </div>
	   <button type="button" class="btn btn-primary" onclick="validator(event)">Submit</button>
	  </form>
	</div>	
</body>
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" crossorigin="anonymous"></script>
<script type="module" src="./scripts/index.js?v=<?php echo(rand(10,100)); ?>"></script>
</html>