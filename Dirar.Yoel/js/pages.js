

const RecentPage = async() => {


   let {result} = await query({
      type:'recent_animal_locations',
      params:[sessionStorage.userId]
   });
   console.log(result);

   let valid_animals = result.reduce((r,o)=>{
      o.icon = o.img;
      if(o.lat && o.lng) r.push(o);
      return r;
   },[]);

   let map_el = await makeMap("#recent-page .map");
   makeMarkers(map_el,valid_animals)
}



const ListPage = async() => {
   // destructuring
   let {result:animals} = await query({
      type:'animals_by_user_id',
      params:[sessionStorage.userId]
   })
   
   console.log(animals)

   $("#list-page .animal-list").html(makeAnimalList(animals));
}
const UserProfilePage = async() => {
   let {result:users} = await query({
      type:'user_by_id',
      params:[sessionStorage.userId]
   })
   let [user] = users;

   console.log(user)

   $("#user-profile-page [data-role='main']").html(makeUserProfilePage(user));
}


const AnimalProfilePage = async() => {
   let {result:animals} = await query({
      type:'animal_by_id',
      params:[sessionStorage.animalId]
   })
   let [animal] = animals;
   $(".animal-profile-top").css({"background-image":`url(${animal.img})`})
   $("#animal-profile-page h1").html(animal.name)
   $(".animal-profile-description").html(makeAnimalProfileDescription(animal));

   let {result:locations} = await query({
      type:'locations_by_animal_id',
      params:[sessionStorage.animalId]
   })
   console.log(locations)
}