// ====================================
// ResumeCraft AI
// Main Script
// ====================================

// ---------- Live Preview ----------

function bind(inputId, previewId, placeholder){

const input=document.getElementById(inputId);
const preview=document.getElementById(previewId);

if(!input || !preview) return;

input.addEventListener("input",function(){

preview.textContent=this.value.trim() || placeholder;

});

}

bind("name","preview-name","Your Name");
bind("email","preview-email","Email Address");
bind("phone","preview-phone","Phone Number");
bind("location","preview-location","Your Location");
bind("about","preview-about","Write something about yourself...");

// ---------- Profile Photo ----------

const photo=document.getElementById("photo");

if(photo){

photo.addEventListener("change",function(){

const file=this.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(e){

document.getElementById("preview-photo").src=e.target.result;

}

reader.readAsDataURL(file);

});

}// ====================================
// Education Section
// ====================================

const educationInput = document.getElementById("educationInput");
const addEducation = document.getElementById("addEducation");
const previewEducation = document.getElementById("preview-education");

if(addEducation){

addEducation.addEventListener("click",function(){

const value = educationInput.value.trim();

if(value==="") return;

const li=document.createElement("li");

li.innerHTML=`
${value}
<button class="delete-btn">❌</button>
`;

li.querySelector(".delete-btn").addEventListener("click",function(){

li.remove();

});

previewEducation.appendChild(li);

educationInput.value="";

});

}

// ====================================
// Skills Section
// ====================================

const skillInput=document.getElementById("skillInput");
const addSkill=document.getElementById("addSkill");
const previewSkills=document.getElementById("preview-skills");

if(addSkill){

addSkill.addEventListener("click",function(){

const value=skillInput.value.trim();

if(value==="") return;

const li=document.createElement("li");

li.innerHTML=`
${value}
<button class="delete-btn">❌</button>
`;

li.querySelector(".delete-btn").addEventListener("click",function(){

li.remove();

});

previewSkills.appendChild(li);

skillInput.value="";

});

}

// ====================================
// Experience Section
// ====================================

const experienceInput=document.getElementById("experienceInput");
const addExperience=document.getElementById("addExperience");
const previewExperience=document.getElementById("preview-experience");

if(addExperience){

addExperience.addEventListener("click",function(){

const value=experienceInput.value.trim();

if(value==="") return;

const li=document.createElement("li");

li.innerHTML=`
${value}
<button class="delete-btn">❌</button>
`;

li.querySelector(".delete-btn").addEventListener("click",function(){

li.remove();

});

previewExperience.appendChild(li);

experienceInput.value="";

});

}// ====================================
// Projects Section
// ====================================

const projectTitle = document.getElementById("projectTitle");
const projectDesc = document.getElementById("projectDesc");
const addProject = document.getElementById("addProject");
const previewProjects = document.getElementById("preview-projects");

if(addProject){

addProject.addEventListener("click",function(){

const title = projectTitle.value.trim();
const desc = projectDesc.value.trim();

if(title==="" || desc==="") return;

const project=document.createElement("div");

project.className="project-item";

project.innerHTML=`

<h4>${title}</h4>

<p>${desc}</p>

<button class="delete-btn">❌</button>

`;

project.querySelector(".delete-btn").addEventListener("click",function(){

project.remove();

});

previewProjects.appendChild(project);

projectTitle.value="";
projectDesc.value="";

});

}

// ====================================
// Resume Template Change
// ====================================

const templateItems=document.querySelectorAll(".template-item");
const resume=document.getElementById("resume");

templateItems.forEach(item=>{

item.addEventListener("click",()=>{

resume.className="preview";

resume.classList.add(item.dataset.template);

});

});

// ====================================
// Reset Resume
// ====================================

const resetBtn=document.getElementById("resetBtn");

if(resetBtn){

resetBtn.addEventListener("click",()=>{

document.querySelectorAll(".form input").forEach(input=>{

if(input.type!=="file"){

input.value="";

}

});

document.querySelectorAll(".form textarea").forEach(text=>{

text.value="";

});

document.getElementById("preview-name").textContent="Your Name";
document.getElementById("preview-email").textContent="Email Address";
document.getElementById("preview-phone").textContent="Phone Number";
document.getElementById("preview-location").textContent="Your Location";
document.getElementById("preview-about").textContent="Write something about yourself...";

document.getElementById("preview-education").innerHTML="";
document.getElementById("preview-skills").innerHTML="";
document.getElementById("preview-experience").innerHTML="";
document.getElementById("preview-projects").innerHTML="";

document.getElementById("preview-photo").src="";

});

}