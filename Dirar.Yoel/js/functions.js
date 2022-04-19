



// Promise
const query = (options) => {
   return fetch('data/api.php',{
      method:'POST',
      body:JSON.stringify(options)
   }).then(d=>d.json());
}


// Curried Function
const templater = f => a =>
   (Array.isArray(a)?a:[a])
   .reduce((r,o,i,a)=>r+f(o,i,a),'');