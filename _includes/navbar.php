<!-- code should be written to find out active navlink -->
<?php $currentPage = basename($_SERVER["REQUEST_URI"], ".php"); ?>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="profile.php">Merchant</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item <?php echo $currentPage=='profile' ? 'active' : ''  ?>">
        <a class="nav-link" href="profile.php">Profile<span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item <?php echo $currentPage=='openOrders' ? 'active' : ''  ?>">
        <a class="nav-link" href="openOrders.php">Orders</a>
      </li>
    </ul>
    <span>
      <button class="btn btn-primary" onclick="logout();">Logout</button>
    </span>
  </div>
</nav>
<script type="text/javascript">
  function logout(){
    _localStorage.removeMerchant();
    window.location.href = "index.php"; 
  }
</script>