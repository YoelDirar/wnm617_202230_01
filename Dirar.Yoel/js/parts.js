



const makeAnimalList = templater(o=>`
<li class="animal-list-item">
   <a href="#animal-profile-page" class="js-animal-jump" data-id="${o.id}">
      <div class="animal-list-image"><img src="${o.img}" alt=""></div>
      <div class="animal-list-body">
         <div class="animal-list-name">${o.name}</div>
     
         <div class="animal-list-bread">Breed: ${o.bread}</div>
      </div>
   </a>
</li>
`);



const makeUserProfilePage = o => `
   

<div class="user-profile-head">
  <div class="profile-name" style="margin-top: 15px;">${o.name}</div>
      <img src="${o.img}">
      <a href="#user-edit-photo-page" class="floater left bottom"><img src="imgs/icons/pencil.svg" class="edit-icon"></a>
      <p  class="edit-text"> Edit Photo</p>
</div>
<hr>

   <form class="user-page">
            <p class="title-user">NAME</p>
            <p class="user-info">${o.name}</p>

            
            <p class="title-user">USERNAME</p>
            <p class="user-info">&commat;${o.username}</p>
            
            
            <p class="title-user">EMAIL</p>
            <p class="user-info">${o.email}</p>
            <br>
   </form>
         
`;






const makeAnimalProfileDescription = o => `
<h2>${o.name}</h2>
<div>${o.breed}</div>
`;



const makeAnimalPopupBody = o => `
<div class="display-flex js-animal-jump noclick-children" data-id="${o.id}">
   <div class="animal-list-image"><img src="${o.img}" alt=""></div>
   <div>
      <h2>${o.name}</h2>
     
      <div>${o.bread}</div>
   </div>
</div>
`;



const FormControlInput = ({namespace,name,displayname,bread,placeholder,value=""}) => {
   return `<div class="form-control">
      <label class="form-label" for="#${namespace}-${name}">${displayname}</label>
      <input data-role="none" class="form-input" type="${bread}" placeholder="${placeholder}" id="${namespace}-${name}" value="${value}">
   </div>`;
}
const FormControlTextarea = ({namespace,name,displayname,placeholder,value=""}) => {
   return `<div class="form-control">
      <label class="form-label" for="#${namespace}-${name}">${displayname}</label>
      <textarea data-role="none" class="form-input" placeholder="${placeholder}" id="${namespace}-${name}">${value}</textarea>
   </div>`;
}


const makeAnimalForm = (animal,namespace = "animal-add") => {
return `
${FormControlInput({
   namespace,
   name:"name",
   displayname:"Name",
   placeholder:"Type a Name",
   value:animal.name,
})}

${FormControlInput({
   namespace,
   name:"breed",
   displayname:"Breed",
   placeholder:"Type a Breed",
   value:animal.bread,
})}
${FormControlTextarea({
   namespace,
   bread:"text",
   name:"description",
   displayname:"Description",
   placeholder:"Type a Description",
   value:animal.description,
})}
`;
}


const makeUserForm = (user,namespace = "user-edit") => {
return `
${FormControlInput({
   namespace,
   name:"name",
   displayname:"Name",
   bread:"text",
   placeholder:"Type a Name",
   value:user.name,
})}
${FormControlInput({
   namespace,
   name:"username",
   displayname:"Username",
   type:"text",
   placeholder:"Type a Username",
   value:user.username,
})}
${FormControlInput({
   namespace,
   name:"email",
   displayname:"Email",
   type:"text",
   placeholder:"Type an Email",
   value:user.email,
})}
`;
}
const makeAnimalListSet = (animals, target="#list-page .animal-list") => {
   $(".filter-bar").html(makeFilterList(animals));
   $(target).html(makeAnimalList(animals));
}

const capitalize = s => (s[0]||"").toUpperCase()+s.slice(1);

const filterList = (animals,type) => {
   let a = [...(new Set(animals.map(o=>o[type])))];
   return templater(o=>o?`<span data-filter="${type}" data-value="${o}">${capitalize(o)}</span>`:'')(a);
}

const makeFilterList = (animals) => {
   return `
   <span data-filter="type" data-value="">All</span>
   |
   ${filterList(animals,'type')}
   |
   ${filterList(animals,'breed')}
   `;
}
