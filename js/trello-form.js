/* main.js - Trello API Form v1.0
* @token	- Your application token, generate this by https://trello.com/1/authorize?key=substitutewithyourapplicationkey&scope=read%2Cwrite&name=My+Application&expiration=never&response_type=token
* @idList	- The List you want to create a card in. To get this, Add a card>Open card>Share and More>Export to JSON> Look for idList
* @confUrl	- The location of the PHP file used to generate a confirmation email
* @receievd	- The location of the HTML received page.
*/
var settings = {
	token: "yourCodeGoesHere-aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
	idList: "yourIdListGoesHere-aaaaa",
	confUrl: "./php/trello-confirmation.php",	
	received: "received.html"
};

$(document).ready(function() {

	/* Instantiate bootstrap-datetimepicker */
	var minDate = new Date();
	minDate.setDate(minDate.getDate());
	$('select').focus(function() { 
		if ($(this).val() != "") $(this).css('color','#555');
	});
	$('#start, #startdate').datetimepicker({
		pickTime: false,
		autoclose: true,
		minDate: minDate
	});
	$('input, textarea').placeholder();		
	
	/* Initiate parsely validation on form submit */
	$('#myform').parsley().subscribe('parsley:form:validate', function (formInstance) {
	
		formInstance.submitEvent.preventDefault(); 
		
		if (formInstance.isValid() == true) { 

			/* Get the start date */
			var getDate = $("#startdate").data("DateTimePicker").getDate();
			var realDate = getDate.toDate();
			var dueDate = new Date(realDate.getUTCFullYear(), realDate.getUTCMonth(), realDate.getUTCDate(), realDate.getUTCHours(), realDate.getUTCMinutes(), realDate.getUTCSeconds());
		
			/* Get all options */
			var option = "";
			$(".coltype:checked").each(function() {
				option+=($(this).val() + ", ");
			});	

			/* Add hidden textarea if Option 3 checked*/
			if($("#colother").is(":checked")) {
				option+=$('#dcother').val();
			}						
			
			/* Get second options */
			var optionstwo = "";
			$(".checkbx:checked").each(function() {
				optionstwo+=($(this).val() + ", ");						
			});				
			
			/* Add hidden textarea if special option checked */
			var ifother = $('textarea#descmore').val();
			if (ifother) { optionstwo += ifother; }			
			
			/* Format form data into JS data */
			var reqdesc = "Name: " + $("#name").val()
			+ "\n\nEmail: " + $("#emailadd").val()
			+ "\n\nDepartment: " + $("#department").val()
			+ "\n\nStart date: " + $("#startdate").val()
			+ "\n\nTitle: " + $("#title").val()
			+ "\n\nObjective: " + $("#objective").val()
			+ "\n\nOptions 1: " + option
			+ "\n\nMain text: " + $("#mainbody").val()
			+ "\n\Options 2: " + optionstwo
			+ "\n\nYes or no? " + $("#quesyesno").val()
			+ "\n\nMore questions " + $("#thirdques").val();

			
			jsonObj = { name: $("#title").val(), desc: reqdesc, idList: settings.idList, token: settings.token, email: $("#emailadd").val()};
			
			/* Send to Trello.com */
			Trello.post("/list/" + settings.idList + "/cards", jsonObj, function(card) { 
				jsonObj['cardid'] = card.idShort;	
				if(jsonObj['cardid']) {
								
					var passData = encodeURIComponent(JSON.stringify(jsonObj));									
					
						/* Workaround for IE9 */
						if($("#ie9").hasClass("detected")) {						
							var xdr = new XDomainRequest();						
							xdr.open('POST', settings.confUrl);
							xdr.onload = function () { };
							xdr.onerror = function () { };
							xdr.ontimeout = function () { };
							xdr.onprogress = function () { };
							xdr.timeout = 0;		
							var sendSetTimeout = 200;
							setTimeout(function () {
								xdr.send(passData);
								window.location = settings.received;
							}, sendSetTimeout);

						}
						else {				
							$.ajax({
									url:settings.confUrl,
									type: "POST",
									crossDomain: true,
									cache: false,
									data: "trello="+passData,
									dataType: "json",
									success: function() {
										window.location = settings.received;
									}
								});//end ajax 												
						}
				}
				else {
					alert("We're sorry, there was an error in submitting your request.");
				}
			});//end .post.done								
		}//end if validation true				
	}); //end parsely callback

	/* Show hidden textarea if option checked */
	$("#colother").change(function() {
			var c = this.checked ? $("#dcother").css("display","block").css("visibility","visible").attr("tabindex","11") : $("#dcother").css("display","none").css("visibility","hidden").attr("tabindex","");		
	});

	/* Show hidden textarea if option checked */
	$('#o2other').click(function() {
		if($('#o2other').is(':checked') == true) {
			$("#descmore").css('display','block').css('visibility','visible').attr("tabindex","24");
		}
		else {
			$("#descmore").css('display','none').css('visibility','hidden').attr("tabindex","");
		}
	});
	
});//end document.ready