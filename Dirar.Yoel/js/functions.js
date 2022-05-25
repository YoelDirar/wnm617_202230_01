
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


const checkData = (exterior_check) => new Promise((resolve,reject)=>{
   let timeout = 0;
   const interior_check = () => {
      timeout++; if(timeout>100) return reject();
      return exterior_check() ? resolve() : setTimeout(interior_check, 10);
   }
   interior_check();
});


const checkUpload = file => {
   let fd = new FormData();
   fd.append("image",file);

   return fetch('data/api.php',{
      method:'POST',
      body:fd
   }).then(d=>d.json());
}