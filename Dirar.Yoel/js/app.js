$(() => {
   checkUserId();

   // EVENT DELEGATION
   $(document)

   .on("pagecontainerbeforeshow", function(event, ui){
      console.log(ui.toPage[0].id)

      // PAGE ROUTING
      switch(ui.toPage[0].id) {
         case "recent-page": RecentPage(); break;
         case "list-page": ListPage(); break;
         
         case "user-profile-page": UserProfilePage(); break;
         case "user-edit-page": UserEditPage(); break;
         case "user-edit-photo-page": UserEditPhotoPage(); break;
         
         case "animal-profile-page": AnimalProfilePage(); break;
         case "animal-edit-page": AnimalEditPage(); break;
         case "animal-add-page": AnimalAddPage(); break;
         case "animal-edit-photo-page": AnimalEditPhotoPage(); break;

         case "choose-animal-page": ChooseAnimalPage(); break;
         case "choose-location-page": ChooseLocationPage(); break;
      }
   })





   // FORM SUBMISSIONS
   .on("submit", "#signin-form", function(e) {
      e.preventDefault();
      checkLoginForm();
   })
   .on("submit", "#signup-form", function(e) {
      e.preventDefault();
      submitUserSignup();
   })

   .on("submit", "#list-search-form", function(e) {
      e.preventDefault();
      let s = $(this).find("input").val();
      checkSearchForm(s);
   })





   // FORM SUBMISSION CLICKS
   .on("click", ".js-submit-animal-add", function() {
      submitAnimalAdd();
   })
   .on("click", ".js-submit-animal-edit", function() {
      submitAnimalEdit();
   })
   .on("click", ".js-submit-user-edit", function() {
      submitUserEdit();
   })
   .on("click", ".js-submit-location-add", function() {
      submitLocationAdd();
   })





   .on("change", "#choose-animal-input select", function(e) {
      $("#location-animal").val(this.value);
   })


   .on("change",".imagepicker input", function(e){
      checkUpload(this.files[0])
      .then(d=>{
         console.log(d)
         let filename = `uploads/${d.result}`;
         $(this).parent().prev().val(filename)
         $(this).parent().css({
            "background-image":`url(${filename})`
         }).addClass("picked");
      })
   })
   .on("click", ".js-submit-user-upload", function(e) {
      let image = $("#user-edit-photo-image").val();
      query({
         type: "update_user_image",
         params: [image, sessionStorage.userId]
      }).then(d=>{
         if(d.error) throw(d.error);
         history.go(-1);
      })
   })
   .on("click", ".js-submit-animal-upload", function(e) {
      let image = $("#animal-edit-photo-image").val();
      query({
         type: "update_animal_image",
         params: [image, sessionStorage.animalId]
      }).then(d=>{
         if(d.error) throw(d.error);
         history.go(-1);
      })
   })


   .on("click", "[data-filter]", function(e) {
      let {filter,value} = $(this).data();
      if(value=="") ListPage();
      else checkFilter(filter,value);
   })



   // CLICKS
   .on("click", ".js-logout", function() {
      sessionStorage.removeItem("userId");
      checkUserId();
   })


   .on("click", ".js-animal-jump", function(e) {
      try {
         e.preventDefault();
         sessionStorage.animalId = $(this).data('id');
         $.mobile.navigate("#animal-profile-page");
      } catch(e) {
         throw("No id detected");
      }
   })
   .on("click",".js-animal-delete", function(e) {
      submitDeleteAnimal();
   })
   .on("click",".js-location-choose-animal", function(e) {
      $("#location-animal").val(sessionStorage.animalId)
      $("#location-start").val(-2);
   })





   .on("click", ".animal-profile-nav>div", function(e) {
      let id = $(this).index();
      $(this).parent()
         .next().children().eq(id)
         .addClass("active")
         .siblings().removeClass("active")
      $(this).addClass("active")
         .siblings().removeClass("active")
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
      let target = $(this).data("activateone");
      $(target).addClass("active")
         .siblings().removeClass("active")
   })

   ;

   $("[data-template]").each(function(){
      let target = $(this).data("template");
      $(this).html($(target).html())
   });

   [,"#recent-page","#list-page","#user-profile-page"].forEach((p,i)=>{
      if(window.location.hash === p) {
         $(`.nav-icon-set li:nth-child(${i})`).addClass("active");
      }
   });

});