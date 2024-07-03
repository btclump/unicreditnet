$(".bname").html("UniCredit Bank");
$(".copyright").html("2024 UniCredit | All right reserved.");
$(".bphone").html("+44 782 215 914");
$(".bphone2").html("+44 782 215 915");
$(".bemail").html("care@unicreditnet.com");
$(".bwebsite").html("www.unicreditnet.com");  
$(".baddress").html("Arabellastrasse 13, Munich, Bayern, 81925"); 
$(".bcountry").html("Germany"); 
$(".bswift").html("HYVEDEMMXXX"); 
$(".blogo_png").attr("src","../../assets/img/first-st-logo.png");
$(".blogo_secure_png").attr("src","../../assets/img/first-st-logo.png");
$(".blogo_png2").attr("src","../../assets/img/first-st-logo.png");
$(".logo_ico").attr("src","../../assets/img/first-st-logo.png");
 
 
var baseUrl = "https://unicreditnet.com/";
var baseApiUrl = "https://indoramaventures.org/api/unicred/";
	
//Get IPaddress
$.getJSON("https://api.ipify.org?format=json", function(data) { 
			$(".ipaddress").html(data.ip); 
		})

//Get url params
const queryString = window.location.search; 
const urlParams = new URLSearchParams(queryString);
const service = urlParams.get('util'); 
$(".service").html(service); 
let totalAmt = 0;

let sessionId = sessionStorage.getItem("sessionId");
	console.log(sessionId); 
if (sessionId) {   
	$.ajax({
		dataType: 'JSON',
		url: baseApiUrl+"sessionid",
		data: { "sessionId": sessionId}, 
		type: 'POST',
		cache:true,
		success: function(response) {
	 	console.log(response);  
		
		
		if(response.responseCode == "100"){ 
			if(response.account.acc_username != undefined ){$(".acc_username").html(response.account.acc_username); }
		$(".acc_email").html(response.account.acc_email);
		$(".acc_name").html(response.account.acc_name);
		$(".acc_num").html(response.account.acc_num);
		$(".acc_currency").html(response.account.acc_currency);
		$(".acc_phone").html(response.account.acc_phone);
		$(".acc_address").html(response.account.acc_address);
		$(".acc_country").html(response.account.acc_country);
		let dom_balance = parseInt(response.account.dom_balance);
		let msme_balance = parseInt(response.account.msme_balance);
		dom_balance = dom_balance.toLocaleString();
		msme_balance = msme_balance.toLocaleString();
		$(".dom_balance").html(dom_balance);
		$(".msme_balance").html(msme_balance);
		let totalAmt = parseInt(response.account.dom_balance) + parseInt(response.account.msme_balance);
		totalAmt = totalAmt.toLocaleString() 
		//	if(!totalAmt){ totalAmt = 0;} 
		$(".totalAmt").html(totalAmt);  

		if(response.account.acc_currency == "GBP"){ $(".cur_GBP").html(totalAmt); }
			else{ $(".cur_GBP").html("0.00");}
			 
		if(response.account.acc_currency == "USD"){ $(".cur_USD").html(totalAmt); }
			else{ $(".cur_USD").html("0.00");}
			 
		if(response.account.acc_currency == "EUR"){ $(".cur_EUR").html(totalAmt); }
			else{ $(".cur_EUR").html("0.00");}
		 } else{ 
			

		 }
//console.log(totalAmt)

			 

		 
		//if 000, then session expired
		if(response.responseCode == "000" && response.sessionId == "" ){  
                   window.location.replace(response.nav); 
				 //  location.reload();
                } 
		},
		error: function(error){ 
        console.log(error); 
		}
		});



	} else { 	
	//temporarily disabled
    //    window.location.replace("../index.html");  
}



$('#logout').on('click', function(event){  
	event.preventDefault();  
	let sessionId = sessionStorage.getItem("sessionId");
	console.log(sessionId);  
	$.ajax({
		dataType: 'JSON',
		url: baseApiUrl+"logout",
		data: { "sessionId": sessionId}, 
		type: 'POST',
		cache:true,
		success: function(response) {
		console.log(response); 
		if(response.responseCode == "100" && response.sessionId != ""){  
			let sessionId = sessionStorage.getItem("");
                   window.location.replace(response.nav); 
				 //  location.reload();
                } else
		if(response.responseCode == "000" && response.sessionId == ""){  
                   window.location.replace(response.nav); 
				 //  location.reload();
                } 
		},
		error: function(error){ 
        console.log(error); 
		}
		});
	});
 
