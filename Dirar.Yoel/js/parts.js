



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
   <img src="${o.img}">
   <a href="#user-edit-photo-page" class="floater left bottom"><img src="imgs/icons/pencil.svg" class="icon"></a>
</div>
<div class="user-profile-body">
   <h2>${o.name}</h2>
   <div class="user-profile-description">
      <div><strong>Username</strong> @${o.username}</div>
      <div><strong>Email</strong> ${o.email}</div>
      <a href="#user-settings-page">Settings</a>
   </div>
</div>
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

