/*==========================================
ResumeCraft AI v5
==========================================*/

/* ========= ELEMENTS ========= */

const resume = document.getElementById("resumePaper");

const photo = document.getElementById("photo");

const previewPhoto = document.getElementById("previewPhoto");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");

const linkedinInput = document.getElementById("linkedin");
const githubInput = document.getElementById("github");
const portfolioInput = document.getElementById("portfolio");

const summaryInput = document.getElementById("summary");

const previewName = document.getElementById("previewName");
const previewEmail = document.getElementById("previewEmail");
const previewPhone = document.getElementById("previewPhone");
const previewAddress = document.getElementById("previewAddress");

const previewLinkedin = document.getElementById("previewLinkedin");
const previewGithub = document.getElementById("previewGithub");
const previewPortfolio = document.getElementById("previewPortfolio");

const previewSummary = document.getElementById("previewSummary");

const toast = document.getElementById("toast");

const loader = document.getElementById("loader");

/* ========= LOADER ========= */

window.addEventListener("load", () => {

setTimeout(() => {

loader.style.display = "none";

},800);

});

/* ========= TOAST ========= */

function showToast(message){

toast.innerText = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

/* ========= LIVE PREVIEW ========= */

nameInput.addEventListener("input",()=>{

previewName.textContent =
nameInput.value || "Your Name";

saveData();

});

emailInput.addEventListener("input",()=>{

previewEmail.textContent =
emailInput.value || "example@email.com";

saveData();

});

phoneInput.addEventListener("input",()=>{

previewPhone.textContent =
phoneInput.value || "+91 9876543210";

saveData();

});

addressInput.addEventListener("input",()=>{

previewAddress.textContent =
addressInput.value || "Your Address";

saveData();

});

linkedinInput.addEventListener("input",()=>{

previewLinkedin.textContent =
linkedinInput.value || "linkedin.com/in/username";

saveData();

});

githubInput.addEventListener("input",()=>{

previewGithub.textContent =
githubInput.value || "github.com/username";

saveData();

});

portfolioInput.addEventListener("input",()=>{

previewPortfolio.textContent =
portfolioInput.value || "portfolio.com";

saveData();

});

summaryInput.addEventListener("input",()=>{

previewSummary.textContent =
summaryInput.value || "Write your objective here...";

saveData();

});

/* ========= PHOTO ========= */

photo.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(){

previewPhoto.src=reader.result;

saveData();

};

reader.readAsDataURL(file);

});
/*==========================================
DYNAMIC LISTS
==========================================*/

const educationContainer=document.getElementById("educationContainer");
const skillsContainer=document.getElementById("skillsContainer");
const experienceContainer=document.getElementById("experienceContainer");
const projectContainer=document.getElementById("projectContainer");

const previewEducation=document.getElementById("previewEducation");
const previewSkills=document.getElementById("previewSkills");
const previewExperience=document.getElementById("previewExperience");
const previewProjects=document.getElementById("previewProjects");

/*==========================================
CREATE INPUT
==========================================*/

function createInput(container,preview,type){

const row=document.createElement("div");

row.className="dynamic-row";

const input=document.createElement("input");

input.type="text";

input.placeholder="Enter "+type;

const remove=document.createElement("button");

remove.type="button";

remove.className="remove-btn";

remove.innerHTML="❌";

row.appendChild(input);

row.appendChild(remove);

container.appendChild(row);

function update(){

preview.innerHTML="";

const inputs=container.querySelectorAll("input");

inputs.forEach(item=>{

if(item.value.trim()!=""){

if(preview.tagName==="UL"){

const li=document.createElement("li");

li.textContent=item.value;

preview.appendChild(li);

}else{

const div=document.createElement("div");

div.className="project-card";

div.innerHTML=`<p>${item.value}</p>`;

preview.appendChild(div);

}

}

});

calculateATS();

saveData();

}

input.addEventListener("input",update);

remove.addEventListener("click",()=>{

row.remove();

update();

});

}

/*==========================================
ADD BUTTONS
==========================================*/

document
.getElementById("addEducation")
.addEventListener("click",()=>{

createInput(
educationContainer,
previewEducation,
"Education"
);

});

document
.getElementById("addSkill")
.addEventListener("click",()=>{

createInput(
skillsContainer,
previewSkills,
"Skill"
);

});

document
.getElementById("addExperience")
.addEventListener("click",()=>{

createInput(
experienceContainer,
previewExperience,
"Experience"
);

});

document
.getElementById("addProject")
.addEventListener("click",()=>{

createInput(
projectContainer,
previewProjects,
"Project"
);

});

/*==========================================
DEFAULT INPUTS
==========================================*/

createInput(
educationContainer,
previewEducation,
"Education"
);

createInput(
skillsContainer,
previewSkills,
"Skill"
);

createInput(
experienceContainer,
previewExperience,
"Experience"
);

createInput(
projectContainer,
previewProjects,
"Project"
);
/*==========================================
CERTIFICATIONS
LANGUAGES
INTERESTS
==========================================*/

const certificationContainer =
document.getElementById("certificationContainer");

const languageContainer =
document.getElementById("languageContainer");

const interestContainer =
document.getElementById("interestContainer");

const previewCertifications =
document.getElementById("previewCertifications");

const previewLanguages =
document.getElementById("previewLanguages");

const previewInterests =
document.getElementById("previewInterests");

/*========== CERTIFICATION ==========*/

document
.getElementById("addCertification")
.addEventListener("click",()=>{

createInput(

certificationContainer,

previewCertifications,

"Certification"

);

});

/*========== LANGUAGE ==========*/

document
.getElementById("addLanguage")
.addEventListener("click",()=>{

createInput(

languageContainer,

previewLanguages,

"Language"

);

});

/*========== INTEREST ==========*/

document
.getElementById("addInterest")
.addEventListener("click",()=>{

createInput(

interestContainer,

previewInterests,

"Interest"

);

});

/*========== DEFAULT ==========*/

createInput(

certificationContainer,

previewCertifications,

"Certification"

);

createInput(

languageContainer,

previewLanguages,

"Language"

);

createInput(

interestContainer,

previewInterests,

"Interest"

);

/*==========================================
ATS SCORE
==========================================*/

const atsScore =
document.getElementById("atsScore");

const progressBar =
document.getElementById("progressBar");

function calculateATS(){

let score=20;

if(nameInput.value.trim()) score+=10;

if(emailInput.value.trim()) score+=10;

if(phoneInput.value.trim()) score+=10;

if(summaryInput.value.trim()) score+=10;

if(educationContainer.querySelectorAll("input").length>0)
score+=10;

if(skillsContainer.querySelectorAll("input").length>0)
score+=10;

if(experienceContainer.querySelectorAll("input").length>0)
score+=10;

if(projectContainer.querySelectorAll("input").length>0)
score+=10;

if(score>100){

score=100;

}

atsScore.innerHTML=score+"%";

progressBar.style.width=score+"%";

}

/*==========================================
TEMPLATE SWITCH
==========================================*/

const templates=

document.querySelectorAll(".template-item");

templates.forEach(card=>{

card.addEventListener("click",()=>{

templates.forEach(t=>{

t.classList.remove("active");

});

card.classList.add("active");

resume.className="resume-paper";

resume.classList.add(

card.dataset.template

);

showToast(

card.dataset.template+

" Template Selected"

);

});

});

calculateATS();
/*==========================================
AUTO SAVE
==========================================*/

function saveData(){

const data={

name:nameInput.value,

email:emailInput.value,

phone:phoneInput.value,

address:addressInput.value,

linkedin:linkedinInput.value,

github:githubInput.value,

portfolio:portfolioInput.value,

summary:summaryInput.value,

photo:previewPhoto.src,

theme:document.body.classList.contains("dark")

};

localStorage.setItem(

"resumeCraftData",

JSON.stringify(data)

);

}

/*==========================================
LOAD DATA
==========================================*/

window.addEventListener("DOMContentLoaded",()=>{

const data=JSON.parse(

localStorage.getItem("resumeCraftData")

);

if(!data) return;

nameInput.value=data.name||"";
emailInput.value=data.email||"";
phoneInput.value=data.phone||"";
addressInput.value=data.address||"";

linkedinInput.value=data.linkedin||"";
githubInput.value=data.github||"";
portfolioInput.value=data.portfolio||"";

summaryInput.value=data.summary||"";

previewName.innerHTML=data.name||"Your Name";
previewEmail.innerHTML=data.email||"example@email.com";
previewPhone.innerHTML=data.phone||"+91 9876543210";
previewAddress.innerHTML=data.address||"Your Address";

previewLinkedin.innerHTML=data.linkedin||"";
previewGithub.innerHTML=data.github||"";
previewPortfolio.innerHTML=data.portfolio||"";

previewSummary.innerHTML=data.summary||"";

if(data.photo){

previewPhoto.src=data.photo;

}

if(data.theme){

document.body.classList.add("dark");

}

calculateATS();

});

/*==========================================
DARK MODE
==========================================*/

const themeToggle=

document.getElementById("themeToggle");

if(themeToggle){

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("dark");

saveData();

});

}

/*==========================================
RESET
==========================================*/

document

.getElementById("resetResume")

.addEventListener("click",()=>{

if(confirm("Reset Resume?")){

localStorage.clear();

location.reload();

}

});

/*==========================================
PRINT
==========================================*/

document

.getElementById("printResume")

.addEventListener("click",()=>{

window.print();

});

/*==========================================
PDF DOWNLOAD
==========================================*/

document

.getElementById("downloadResumePDF")

.addEventListener("click",()=>{

const element=document.getElementById("resumePaper");

const opt={

margin:0,

filename:"Resume.pdf",

image:{

type:"jpeg",

quality:1

},

html2canvas:{

scale:3,

useCORS:true,

scrollY:0

},

jsPDF:{

unit:"mm",

format:"a4",

orientation:"portrait"

}

};

html2pdf()

.set(opt)

.from(element)

.save();

showToast("Resume Downloaded");

});
/*==========================================
RESUME COMPLETION
==========================================*/

function updateCompletion(){

let total=10;

let completed=0;

if(nameInput.value.trim()) completed++;

if(emailInput.value.trim()) completed++;

if(phoneInput.value.trim()) completed++;

if(addressInput.value.trim()) completed++;

if(summaryInput.value.trim()) completed++;

if(previewEducation.children.length) completed++;

if(previewSkills.children.length) completed++;

if(previewExperience.children.length) completed++;

if(previewProjects.children.length) completed++;

if(previewPhoto.src && !previewPhoto.src.endsWith("/")) completed++;

let percent=Math.round((completed/total)*100);

atsScore.innerHTML=percent+"%";

progressBar.style.width=percent+"%";

}

setInterval(updateCompletion,500);

/*==========================================
KEYBOARD SHORTCUTS
==========================================*/

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="p"){

e.preventDefault();

window.print();

}

if(e.ctrlKey && e.key==="s"){

e.preventDefault();

document

.getElementById("downloadResumePDF")

.click();

}

});

/*==========================================
SMOOTH SCROLL
==========================================*/

document

.querySelectorAll('a[href^="#"]')

.forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

const target=document.querySelector(

this.getAttribute("href")

);

if(target){

target.scrollIntoView({

behavior:"smooth"

});

}

});

});

/*==========================================
START BUTTON
==========================================*/

const startBtn=document.querySelector(".primary-btn");

if(startBtn){

startBtn.addEventListener("click",()=>{

document

.getElementById("builder")

.scrollIntoView({

behavior:"smooth"

});

});

}

/*==========================================
VIEW TEMPLATE BUTTON
==========================================*/

const viewBtn=document.querySelector(".secondary-btn");

if(viewBtn){

viewBtn.addEventListener("click",()=>{

document

.getElementById("templates")

.scrollIntoView({

behavior:"smooth"

});

});

}

/*==========================================
AUTO ATS UPDATE
==========================================*/

setInterval(calculateATS,1000);

/*==========================================
END
==========================================*/

console.log("ResumeCraft AI v5 Loaded Successfully");