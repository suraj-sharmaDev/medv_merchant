<?php
	class Curl_helper{
		//defining properties
		public $url;
		public $headers;
		public $method;
		//defining functions

		function __construct($url, $headers=null, $method='get'){
			$this->url = $url;
			$this->headers = $headers;
			$this->method = $method;
		}

		public function exec($postRequest=null){
			$apiResponse = null;
			if($this->method=='get'){
				$cURLConnection = curl_init();				
				curl_setopt($cURLConnection, CURLOPT_URL, $this->url);
				curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);
				try {
					$apiResponse = curl_exec($cURLConnection);					
				} catch (Exception $e) {
					//something wrong happened				
				}
			}else{
				$cURLConnection = curl_init($this->url);
				curl_setopt($cURLConnection, CURLOPT_POSTFIELDS, $postRequest);
				curl_setopt($cURLConnection, CURLOPT_RETURNTRANSFER, true);
				//check if header to be set
				if($headers){
					curl_setopt($cURLConnection, CURLOPT_HTTPHEADER, $headers);
				}
				try {
					$apiResponse = curl_exec($cURLConnection);					
				} catch (Exception $e) {
					//something wrong happened				
				}
			}
			curl_close($cURLConnection);
			
			return $apiResponse;
		}
	}
?>