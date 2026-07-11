// =====================================
// ResumeCraft AI v4
// PART-1
// =====================================

// ---------- Elements ----------

const resumePaper = document.getElementById("resumePaper");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const locationInput = document.getElementById("location");
const aboutInput = document.getElementById("about");

const previewName = document.getElementById("preview-name");
const previewEmail = document.getElementById("preview-email");
const previewPhone = document.getElementById("preview-phone");
const previewLocation = document.getElementById("preview-location");
const previewAbout = document.getElementById("preview-about");

// ---------- Live Preview ----------

function livePreview(input, preview, placeholder){

if(!input || !preview) return;

input.addEventListener("input",()=>{

preview.textContent =
input.value.trim() || placeholder;

});

}

livePreview(nameInput,previewName,"Your Name");

livePreview(emailInput,previewEmail,"example@email.com");

livePreview(phoneInput,previewPhone,"+91 9876543210");

livePreview(locationInput,previewLocation,"Your Location");

livePreview(aboutInput,previewAbout,"Write something about yourself...");

// ---------- Profile Photo ----------

const photo=document.getElementById("photo");

const previewPhoto=document.getElementById("preview-photo");

photo.addEventListener("change",function(){

const file=this.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(e){

previewPhoto.src=e.target.result;

};

reader.readAsDataURL(file);

});

// =====================================
// Education
// =====================================

const educationInput=document.getElementById("educationInput");

const addEducation=document.getElementById("addEducation");

const educationList=document.getElementById("educationList");

const previewEducation=document.getElementById("preview-education");

addEducation.addEventListener("click",()=>{

const value=educationInput.value.trim();

if(value==="") return;

const li=document.createElement("li");

li.textContent=value;

educationList.appendChild(li);

const previewLi=document.createElement("li");

previewLi.textContent=value;

previewEducation.appendChild(previewLi);

educationInput.value="";

});

// =====================================
// Skills
// =====================================

const skillInput=document.getElementById("skillInput");

const addSkill=document.getElementById("addSkill");

const skillList=document.getElementById("skillList");

const previewSkills=document.getElementById("preview-skills");

addSkill.addEventListener("click",()=>{

const value=skillInput.value.trim();

if(value==="") return;

const li=document.createElement("li");

li.textContent=value;

skillList.appendChild(li);

const previewLi=document.createElement("li");

previewLi.textContent=value;

previewSkills.appendChild(previewLi);

skillInput.value="";

});

// =====================================
// Experience
// =====================================

const experienceInput=document.getElementById("experienceInput");

const addExperience=document.getElementById("addExperience");

const experienceList=document.getElementById("experienceList");

const previewExperience=document.getElementById("preview-experience");

addExperience.addEventListener("click",()=>{

const value=experienceInput.value.trim();

if(value==="") return;

const li=document.createElement("li");

li.textContent=value;

experienceList.appendChild(li);

const previewLi=document.createElement("li");

previewLi.textContent=value;

previewExperience.appendChild(previewLi);

experienceInput.value="";

});

// =====================================
// Projects
// =====================================

const projectTitle=document.getElementById("projectTitle");

const projectDesc=document.getElementById("projectDesc");

const addProject=document.getElementById("addProject");

const projectList=document.getElementById("projectList");

const previewProjects=document.getElementById("preview-projects");

addProject.addEventListener("click",()=>{

const title=projectTitle.value.trim();

const desc=projectDesc.value.trim();

if(title==="" || desc==="") return;

const li=document.createElement("li");

li.innerHTML=`<strong>${title}</strong><br>${desc}`;

projectList.appendChild(li);

const box=document.createElement("div");

box.innerHTML=`
<h4>${title}</h4>
<p>${desc}</p>
`;

previewProjects.appendChild(box);

projectTitle.value="";
projectDesc.value="";

});// =====================================
// ResumeCraft AI v4
// PART-2
// Dark Mode • Template • Auto Save
// Export • Import • Reset
// =====================================

// ---------- Toast ----------

function showToast(message){

const toast=document.getElementById("toast");

toast.textContent=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

// =====================================
// Dark Mode
// =====================================

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        localStorage.setItem(
            "theme",
            document.body.classList.contains("dark")
        );

    });

}


if(localStorage.getItem("theme")==="true"){

document.body.classList.add("dark");

}

// =====================================
// Resume Templates
// =====================================

const templateItems=document.querySelectorAll(".template-item");

templateItems.forEach(item=>{

item.addEventListener("click",()=>{

templateItems.forEach(i=>i.classList.remove("active"));

item.classList.add("active");

resumePaper.className="resume-paper";

resumePaper.classList.add(item.dataset.template);

showToast(item.dataset.template+" Template Selected");

});

});

// =====================================
// Save Resume
// =====================================

const saveBtn=document.getElementById("saveResume");

saveBtn.addEventListener("click",()=>{

const data={

name:nameInput.value,

email:emailInput.value,

phone:phoneInput.value,

location:locationInput.value,

about:aboutInput.value,

photo:previewPhoto.src,

education:previewEducation.innerHTML,

skills:previewSkills.innerHTML,

experience:previewExperience.innerHTML,

projects:previewProjects.innerHTML

};

localStorage.setItem(

"ResumeCraftData",

JSON.stringify(data)

);

showToast("Resume Saved");

});

// =====================================
// Auto Load
// =====================================

window.addEventListener("load",()=>{

const saved=

JSON.parse(localStorage.getItem("ResumeCraftData"));

if(!saved) return;

nameInput.value=saved.name;

emailInput.value=saved.email;

phoneInput.value=saved.phone;

locationInput.value=saved.location;

aboutInput.value=saved.about;

previewName.textContent=saved.name;

previewEmail.textContent=saved.email;

previewPhone.textContent=saved.phone;

previewLocation.textContent=saved.location;

previewAbout.textContent=saved.about;

previewPhoto.src=saved.photo;

previewEducation.innerHTML=saved.education;

previewSkills.innerHTML=saved.skills;

previewExperience.innerHTML=saved.experience;

previewProjects.innerHTML=saved.projects;

});

// =====================================
// Export Resume
// =====================================

const exportBtn=document.getElementById("exportResume");

exportBtn.addEventListener("click",()=>{

const data=localStorage.getItem("ResumeCraftData");

const blob=new Blob([data],{

type:"application/json"

});

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="ResumeCraft.json";

link.click();

showToast("Resume Exported");

});

// =====================================
// Import Resume
// =====================================

const importBtn=document.getElementById("importResume");

const importFile=document.getElementById("importResumeFile");

importBtn.addEventListener("click",()=>{

importFile.click();

});

importFile.addEventListener("change",e=>{

const file=e.target.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(){

localStorage.setItem(

"ResumeCraftData",

reader.result

);

location.reload();

};

reader.readAsText(file);

});

// =====================================
// Reset Resume
// =====================================

const resetBtn=document.getElementById("resetResume");

resetBtn.addEventListener("click",()=>{

if(!confirm("Reset Resume?")) return;

localStorage.removeItem("ResumeCraftData");

location.reload();

});// =========================
// PDF Download
// =========================

const downloadBtn = document.getElementById("downloadResumePDF");

if(downloadBtn){

downloadBtn.addEventListener("click",()=>{

const element=document.getElementById("resumePaper");

if(!element){

alert("Resume preview not found.");

return;

}

html2pdf().set({

margin:5,

filename:"Resume.pdf",

image:{
type:"jpeg",
quality:1
},

html2canvas:{
scale:2,
useCORS:true
},

jsPDF:{
unit:"mm",
format:"a4",
orientation:"portrait"
}

}).from(element).save();

});

}console.log("Script Loaded");

const pdfBtn = document.getElementById("downloadResumePDF");

console.log(pdfBtn);

if (pdfBtn) {

    pdfBtn.addEventListener("click", function () {

        alert("Button Working");

    });

}