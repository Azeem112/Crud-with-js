
//							JS file of clint side validation form 

	//To get elements by CSS class
		sapnDom=document.forms["myForm"].getElementsByClassName("Error");
		
		window.ready( function ()
			{
				//to get all the input tags
				var inputDom=document.getElementsByTagName("input");
				
				for(i=0 ; i<inputDom.length-2 ; i++) // -2 is to avoid submit and reset button
				{
					inputDom[i].onfocus=change_inputStyle
					inputDom[i].onblur=reset_inputStyle
				}
				
				document.forms["myForm"]["comments"].onfocus=change_inputStyle; 
				document.forms["myForm"]["comments"].addEventListener("focusout", reset_inputStyle)
				
				//attaching Events
				document.forms["myForm"]["fName"].addEventListener("focusout", firstNameValidation)
				document.forms["myForm"]["lName"].addEventListener("focusout", lastNameValidation)
				document.forms["myForm"]["email"].addEventListener("focusout", emailValidation)
				document.forms["myForm"]["url"].addEventListener("focusout", urlValidation)
				document.forms["myForm"].onsubmit= function(){return onSubmitCheck()}
				document.forms["myForm"].onreset= onReset;
				
				$("gender").on( 'mouseover' , genderCheck);
				//alert(sapnDom[0].innerHTML)
				
				getCookie();
		});
		
		
		////////////////////////////////////////////////////////////
		
		function change_inputStyle()
		{
			this.style.backgroundColor="#F5F5DC"
		}
		
		function reset_inputStyle()
		{
			this.style.backgroundColor="#F8F8FF"
		}
		
		////////////////////////////////////////////////////////////
		
		function firstNameValidation()
		{	
			fname=document.forms["myForm"]["fName"];
			
			if(fname.value=="" || fname.value==null || fname.value==NaN)
				fNameErr="Please enter your first name";
			else if(  validateName(fname.value)  )
				fNameErr= "Ok";
			else 
				fNameErr= "Invalid first Name";
			
			output(window.sapnDom[0],fNameErr)
		}
		
		function lastNameValidation()
		{
			lname=document.forms["myForm"]["lName"];
			
			if(lname.value=="" || lname.value==null || lname.value==NaN)
				lNameErr="Please enter your last name";
			else if(  validateName(lname.value)  )
				lNameErr= "Ok";
			else
				lNameErr= "Invalid last Name";
			
			output(window.sapnDom[1],lNameErr)
		}
		
		function validateName(Url)
		{
			var nameRE = /^[A-Za-z0-9 ]{3,20}$/;
			return nameRE.test(Url);
		}
		
		////////////////////////////////////////////////////////////
		
		function emailValidation()
		{
			mail=document.forms["myForm"]["email"];
			
			if (mail.value=="" || mail.value==null || mail.value==NaN)
				emailErr= "Please enter email";
			else  if(  validateEmail(mail.value)  )
				emailErr= "Ok";
			else
				emailErr= "Invalid Email";
			
			output(window.sapnDom[2],emailErr)
		}
		
		function validateEmail(email)
		{
			var emailRE = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
			return emailRE.test(email);
		}
		
		////////////////////////////////////////////////////////////
		
		function urlValidation()
		{
			web=document.forms["myForm"]["url"];
			
			if (web.value=="" || web.value==null || web.value==NaN)
				urlErr= "";
			else if( validateUrl(web.value) )
				urlErr= "Ok";
			else
				urlErr="Enter valid Url";
			
			output(window.sapnDom[3],urlErr);
		}
		
		function validateUrl(Url)
		{
			var urlRE = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
			return urlRE.test(Url);
		}
		
		////////////////////////////////////////////////////////////
		
		function genderCheck()
		{
			var radios = document.getElementsByName("gender");
			
			if (radios[0].checked || radios[1].checked)
				genderErr="Ok";
			else 
				genderErr="Gender is required";
			
			
			output(window.sapnDom[4],genderErr);
		}
		
		////////////////////////////////////////////////////////////
		
		function onSubmitCheck()
		{

			if(window.fNameErr=="Ok" && window.lNameErr=="Ok" && window.emailErr=="Ok" && window.genderErr == "Ok" ){
				setCookie();
				ajaxCall();
				return false;
			}
			else {
				setCookie();
				alert("please fill the form correctly");
				return false;
			}
		}
		
		function onReset()
		{
			onResetCheck(sapnDom);
		}
		
		function onResetCheck(id)
		{
			for(var x=0; x<5; x++){
				if(x==3 ){
					id[x].HTML("");
					continue;
				}
				id[x].HTML("*");
				id[x].style.color="red";
			}
			
			fNameErr="Invalid first name";
			document.getElementById("Result").HTML("");
		}
		
		////////////////////////////////////////////////////////////
		
		function output(id,error)
		{
			
			id.HTML(error);
			
			if(error=="Ok" || error=="")
				id.style.color= "green";
			else
				id.style.color= "red";
		}
		
		///////////////////////////////////////// COOKIES ////////////////////////////
						/////////////////////////////////////////
		
		function setCookie() {
			
			var jsonString = {};
			
			jsonString.fName=document.forms["myForm"]["fName"].value;
			jsonString.lName=document.forms["myForm"]["lName"].value;
			jsonString.email=document.forms["myForm"]["email"].value;
			jsonString.url=document.forms["myForm"]["url"].value;
			jsonString.gender=document.forms["myForm"]["gender"].value;
			
			var cookie= JSON.stringify(jsonString);
			
			//alert(cookie);
			document.cookie = "snowLove=" + cookie ;
			//alert(document.cookie); 
			
		}	////////////////////
		
		function getCookie(){
			
			//alert(document.cookie.length);
			if(document.cookie.length > 64){
				
				var cookie= document.cookie.split("=");
				
				var jsonString=JSON.parse(cookie[1]);
				
				document.forms["myForm"]["fName"].value=jsonString.fName;
				document.forms["myForm"]["lName"].value=jsonString.lName;
				document.forms["myForm"]["email"].value=jsonString.email;
				document.forms["myForm"]["url"].value=jsonString.url;
				document.forms["myForm"]["gender"].value=jsonString.gender;
				
				reConfigure();
			}
		}
		
		function reConfigure(){
			
			firstNameValidation();
			lastNameValidation();
			emailValidation();
			urlValidation();
			genderCheck();
		}
		
		///////////////////////////////////////// AJAX ////////////////////////////
						/////////////////////////////////////////
		
		function ajaxCall(){
			
			var ajax;
			
			if (window.XMLHttpRequest)	// For modren Browsers
			  ajax=new XMLHttpRequest();
			  
			else
			  ajax=new ActiveXObject("Microsoft.XMLHTTP"); // For IE5 & IE8
			  
			ajax.onreadystatechange=function()
			  {
			  if (ajax.readyState==4 && ajax.status==200)
				document.getElementById("Result").innerHTML=ajax.responseText;
			  }
			  
			ajax.open("POST","form1.php",true);
			
			var data="fName="+document.forms["myForm"]["fName"].value+"&lName="+document.forms["myForm"]["lName"].value+
			          "&email="+document.forms["myForm"]["email"].value+"&url="+document.forms["myForm"]["url"].value+
					  "&gender="+document.forms["myForm"]["gender"].value;
			
			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			ajax.send(data);

		}
		