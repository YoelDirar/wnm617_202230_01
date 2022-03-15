$(() => {
	checkUserId();
	//EVENT DELEGATION//
	$(document)

	//Form submissions 
	.on ("submit", "#signin-form", function(e){
		e.preventDefault();
		console.log(e)
		checkLoginForm();
	})

	// CLICKS
	.on("click", ".js-logout", function(){
		sessionStorage.removeItem("userId");
		checkUserId();
	})

   // ACTIVATE TOOLS
   .on("click", "[data-activate]", function() {
      let target = $(this).data("activate");
      $(target).addClass("active")
   })
   .on("click", "[data-deactivate]", function() {
      let target = $(this).data("deactivate");
      $(target).removeClass("active")
   })
   .on("click", "[data-toggle]", function() {
      let target = $(this).data("toggle");
      $(target).toggleClass("active")
   })
   .on("click", "[data-activateone]", function() {
      let target = $(this).data("activate");
      $(target).addClass("active")
         .siblings().removeClass("active")
   })
});