



const makeAnimalList = templater(o=>`
<li class="animal-list-item">
   <a href="#animal-profile-page" class="js-animal-jump" data-id="${o.id}">
      <div class="animal-list-image"><img src="${o.img}" alt=""></div>
      <div class="animal-list-body">
         <div class="animal-list-name">${o.name}</div>
     
         <div class="animal-list-breed">Breed: ${o.bread}</div>
      </div>
   </a>
</li>
`);


const makeUserProfilePage = o => `
<img src="${o.img}">
<h2>${o.name}</h2>
<div>
   <div><strong>Username</strong> @${o.username}</div>
   <div><strong>Email</strong> ${o.email}</div>
   <a href="#user-settings-page">Edit</a>
</div>
`;


const makeAnimalProfileDescription = o => `
<h2>${o.name}</h2>
<div>${o.bread}</div>
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



const FormControlInput = ({namespace,name,displayname,type,placeholder,value=""}) => {
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
   bread:"text",
   placeholder:"Type a Name",
   value:animal.name,
})}

${FormControlInput({
   namespace,
   name:"breed",
   displayname:"Breed",
   type:"text",
   placeholder:"Type a Breed",
   value:animal.bread,
})}
${FormControlTextarea({
   namespace,
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
   type:"text",
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

