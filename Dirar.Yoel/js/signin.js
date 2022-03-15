
const checkLoginForm = () => {
 let user = $("#signin-username").val();
 let pass = $("#signin-password").val();

 console.log(user,pass)

 if (user === 'user'&& pass === 'pass'){
 	//logged in 
 	console.log('success')
 	sessionStorage.userId = 3;
 	$("#signin-form")[0].reset();
 }else{
 	//not logged in 
 	console.log('you fucked up')
 	sessionStorage.removeItem('userId');
 }
 checkUserId();
}

const checkUserId = () => {
	let p = ["#signin-page", "#signup-page", ""]; 

		if (sessionStorage.userId === undefined){
		    // NOT LOGGED IN 
			if (!p.some(o => o === window.location.hash ))
			$.mobile.navigate("#signin-page");
      }else {
			// LOGGED IN 
			if (p.some(o => o  === window.location.hash ))
			$.mobile.navigate("#recent-page");
	   }
}
