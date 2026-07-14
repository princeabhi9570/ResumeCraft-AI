/*=========================================================
ResumeCraft AI
SCRIPT.JS
PART-1
=========================================================*/

"use strict";

/*=========================
DOM
=========================*/

const form = document.getElementById("resumeForm");

const resumePaper = document.getElementById("resumePaper");

const previewPhoto = document.getElementById("previewPhoto");

const summaryCount = document.getElementById("summaryCount");

const atsScore = document.getElementById("atsScore");

const progressBar = document.getElementById("progressBar");

/*=========================
TEXT FIELDS
=========================*/

const fieldMap = [

["fullName","previewName","Your Name"],

["jobTitle","previewJobTitle","Professional Title"],

["email","previewEmail",""],

["phone","previewPhone",""],

["address","previewAddress",""],

["linkedin","previewLinkedIn",""],

["github","previewGithub",""],

["portfolio","previewPortfolio",""],

["website","previewWebsite",""],

["summary","previewSummary",""]

];

/*=========================
LIVE UPDATE
=========================*/

fieldMap.forEach(item=>{

const input=document.getElementById(item[0]);

const output=document.getElementById(item[1]);

if(!input || !output) return;

input.addEventListener("input",()=>{

output.textContent=input.value.trim() || item[2];

saveResume();

updateATS();

});

});

/*=========================
PHOTO
=========================*/

const photo=document.getElementById("photo");

if(photo){

photo.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file){

previewPhoto.style.display="none";

return;

}

const reader=new FileReader();

reader.onload=function(ev){

previewPhoto.src=ev.target.result;

previewPhoto.style.display="block";

saveResume();

};

reader.readAsDataURL(file);

});

}

/*=========================
SUMMARY COUNTER
=========================*/

const summary=document.getElementById("summary");

if(summary){

summary.addEventListener("input",()=>{

summaryCount.textContent=summary.value.length;

});

}

/*=========================
THEME
=========================*/

const themeBtn=document.getElementById("themeToggle");

if(themeBtn){

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

localStorage.setItem(

"theme",

document.body.classList.contains("dark")

);

};

}

/*=========================
LOAD THEME
=========================*/

if(localStorage.getItem("theme")==="true"){

document.body.classList.add("dark");

}

/*=========================
TOAST
=========================*/

function toast(message){

const t=document.getElementById("toast");

if(!t) return;

t.innerText=message;

t.classList.add("show");

setTimeout(()=>{

t.classList.remove("show");

},2500);

}

/*=========================
LOADER
=========================*/

window.addEventListener("load",()=>{

const loader=document.getElementById("loader");

if(loader){

loader.style.display="none";

}

});/*=========================================================
PART-2
DYNAMIC SECTION ENGINE
=========================================================*/

function createElement(tag, className = "") {
    const el = document.createElement(tag);
    if (className) el.className = className;
    return el;
}

function removeItem(btn) {
    btn.closest(".dynamic-item")?.remove();
    updatePreview();
    saveResume();
    updateATS();
}/*=========================================================
SKILLS
=========================================================*/

const skillContainer = document.getElementById("skillsContainer");
const previewSkills = document.getElementById("previewSkills");

function addSkill(value = "") {

    const item = createElement("div", "skill-item dynamic-item");

    item.innerHTML = `

<input type="text"
class="skill-name"
placeholder="Skill"
value="${value}">

<button
type="button"
class="delete-btn">

Delete

</button>

`;

    skillContainer.appendChild(item);

    item.querySelector("input").addEventListener("input", updatePreview);

    item.querySelector(".delete-btn").onclick = function () {
        removeItem(this);
    };

    updatePreview();
}

document.getElementById("addSkill")?.addEventListener("click", () => addSkill());
/*=========================================================
EDUCATION
=========================================================*/

const educationContainer =
document.getElementById("educationContainer");

function addEducation(){

const item=createElement("div","education-item dynamic-item");

item.innerHTML=`

<input
type="text"
class="edu-degree"
placeholder="Degree">

<input
type="text"
class="edu-college"
placeholder="College">

<input
type="text"
class="edu-year"
placeholder="Year">

<button
type="button"
class="delete-btn">

Delete

</button>

`;

educationContainer.appendChild(item);

item.querySelectorAll("input").forEach(input=>{

input.addEventListener("input",updatePreview);

});

item.querySelector(".delete-btn").onclick=function(){

removeItem(this);

};

updatePreview();

}

document
.getElementById("addEducation")
?.addEventListener("click",addEducation);
/*=========================================================
EXPERIENCE
=========================================================*/

const experienceContainer =
document.getElementById("experienceContainer");

function addExperience(){

const item=createElement("div","experience-item dynamic-item");

item.innerHTML=`

<input
type="text"
class="exp-company"
placeholder="Company">

<input
type="text"
class="exp-position"
placeholder="Position">

<textarea
class="exp-description"
placeholder="Description"></textarea>

<button
type="button"
class="delete-btn">

Delete

</button>

`;

experienceContainer.appendChild(item);

item
.querySelectorAll("input,textarea")
.forEach(input=>{

input.addEventListener("input",updatePreview);

});

item.querySelector(".delete-btn").onclick=function(){

removeItem(this);

};

updatePreview();

}

document
.getElementById("addExperience")
?.addEventListener("click",addExperience);
/*=========================================================
UPDATE PREVIEW
=========================================================*/

function updatePreview(){

/*========== Skills ==========*/

previewSkills.innerHTML="";

document
.querySelectorAll(".skill-name")
.forEach(skill=>{

if(skill.value.trim()){

const li=document.createElement("li");

li.textContent=skill.value;

previewSkills.appendChild(li);

}

});

/*========== Education ==========*/

const previewEducation=document.getElementById("previewEducation");

previewEducation.innerHTML="";

document
.querySelectorAll(".education-item")
.forEach(item=>{

const degree=item.querySelector(".edu-degree").value;

const college=item.querySelector(".edu-college").value;

const year=item.querySelector(".edu-year").value;

if(degree||college){

previewEducation.innerHTML+=`

<div class="edu-card">

<h3>${degree}</h3>

<p>${college}</p>

<span>${year}</span>

</div>

`;

}

});

/*========== Experience ==========*/

const previewExperience=
document.getElementById("previewExperience");

previewExperience.innerHTML="";

document
.querySelectorAll(".experience-item")
.forEach(item=>{

const company=item.querySelector(".exp-company").value;

const position=item.querySelector(".exp-position").value;

const desc=item.querySelector(".exp-description").value;

if(company||position){

previewExperience.innerHTML+=`

<div class="exp-card">

<h3>${position}</h3>

<h4>${company}</h4>

<p>${desc}</p>

</div>

`;

}

});

autoHideSections();

saveResume();

updateATS();

}
/*=========================================================
AUTO HIDE
=========================================================*/

function autoHideSections(){

const sections=[

["skillsSection",previewSkills],

["educationSection",
document.getElementById("previewEducation")],

["experienceSection",
document.getElementById("previewExperience")]

];

sections.forEach(sec=>{

const section=document.getElementById(sec[0]);

if(!section) return;

section.style.display=

sec[1].innerHTML.trim()===""

?

"none"

:

"block";

});

}
updatePreview();
/*=========================================================
PROJECTS
=========================================================*/

const projectContainer =
document.getElementById("projectContainer");

function addProject(data={}){

const card=document.createElement("div");

card.className="project-item dynamic-item";

card.innerHTML=`

<input
class="project-name"
type="text"
placeholder="Project Name"
value="${data.name||""}">

<textarea
class="project-description"
placeholder="Project Description">${data.description||""}</textarea>

<input
class="project-tech"
type="text"
placeholder="Technologies Used"
value="${data.tech||""}">

<input
class="project-link"
type="text"
placeholder="GitHub / Live URL"
value="${data.link||""}">

<button
type="button"
class="delete-btn">

Delete

</button>

`;

projectContainer.appendChild(card);

card.querySelectorAll("input,textarea")
.forEach(i=>{

i.addEventListener("input",updatePreview);

});

card.querySelector(".delete-btn").onclick=function(){

removeItem(this);

};

updatePreview();

}

document
.getElementById("addProject")
.onclick=()=>addProject();
/*=========================================================
CERTIFICATIONS
=========================================================*/

const certificationContainer=
document.getElementById("certificationContainer");

function addCertification(value=""){

const div=document.createElement("div");

div.className="dynamic-item";

div.innerHTML=`

<input

class="cert-name"

placeholder="Certification"

value="${value}">

<button
type="button"

class="delete-btn">

Delete

</button>

`;

certificationContainer.appendChild(div);

div.querySelector("input")
.addEventListener("input",updatePreview);

div.querySelector(".delete-btn")
.onclick=function(){

removeItem(this);

};

updatePreview();

}

document
.getElementById("addCertification")
.onclick=()=>addCertification();
/*=========================================================
LANGUAGES
=========================================================*/

const languageContainer=
document.getElementById("languageContainer");

function addLanguage(value=""){

const div=document.createElement("div");

div.className="dynamic-item";

div.innerHTML=`

<input

class="language-name"

placeholder="Language"

value="${value}">

<button
type="button"

class="delete-btn">

Delete

</button>

`;

languageContainer.appendChild(div);

div.querySelector("input")
.addEventListener("input",updatePreview);

div.querySelector(".delete-btn")
.onclick=function(){

removeItem(this);

};

updatePreview();

}

document
.getElementById("addLanguage")
.onclick=()=>addLanguage();
/*=========================================================
ACHIEVEMENTS
=========================================================*/

const achievementContainer=
document.getElementById("achievementContainer");

function addAchievement(value=""){

const div=document.createElement("div");

div.className="dynamic-item";

div.innerHTML=`

<input

class="achievement-name"

placeholder="Achievement"

value="${value}">

<button
type="button"

class="delete-btn">

Delete

</button>

`;

achievementContainer.appendChild(div);

div.querySelector("input")
.addEventListener("input",updatePreview);

div.querySelector(".delete-btn")
.onclick=function(){

removeItem(this);

};

updatePreview();

}

document
.getElementById("addAchievement")
.onclick=()=>addAchievement();
/*=========================================================
INTERESTS
=========================================================*/

const interestContainer=
document.getElementById("interestContainer");

function addInterest(value=""){

const div=document.createElement("div");

div.className="dynamic-item";

div.innerHTML=`

<input

class="interest-name"

placeholder="Interest"

value="${value}">

<button
type="button"

class="delete-btn">

Delete

</button>

`;

interestContainer.appendChild(div);

div.querySelector("input")
.addEventListener("input",updatePreview);

div.querySelector(".delete-btn")
.onclick=function(){

removeItem(this);

};

updatePreview();

}

document
.getElementById("addInterest")
.onclick=()=>addInterest();
/*=========================================================
REFERENCES
=========================================================*/

const referenceContainer=
document.getElementById("referenceContainer");

function addReference(){

const div=document.createElement("div");

div.className="dynamic-item";

div.innerHTML=`

<input

class="reference-name"

placeholder="Reference Name">

<input

class="reference-company"

placeholder="Company">

<input

class="reference-phone"

placeholder="Phone">

<button
type="button"

class="delete-btn">

Delete

</button>

`;

referenceContainer.appendChild(div);

div.querySelectorAll("input")
.forEach(i=>{

i.addEventListener("input",updatePreview);

});

div.querySelector(".delete-btn")
.onclick=function(){

removeItem(this);

};

updatePreview();

}

document
.getElementById("addReference")
.onclick=addReference;
/*=========================================================
REFERENCES
=========================================================*/

const referenceContainer=
document.getElementById("referenceContainer");

function addReference(){

const div=document.createElement("div");

div.className="dynamic-item";

div.innerHTML=`

<input

class="reference-name"

placeholder="Reference Name">

<input

class="reference-company"

placeholder="Company">

<input

class="reference-phone"

placeholder="Phone">

<button
type="button"

class="delete-btn">

Delete

</button>

`;

referenceContainer.appendChild(div);

div.querySelectorAll("input")
.forEach(i=>{

i.addEventListener("input",updatePreview);

});

div.querySelector(".delete-btn")
.onclick=function(){

removeItem(this);

};

updatePreview();

}

document
.getElementById("addReference")
.onclick=addReference;
/*=========================================================
LOAD RESUME
=========================================================*/

function loadResume(){

const data=

JSON.parse(

localStorage.getItem("ResumeCraftAI")

);

if(!data) return;

document
.querySelectorAll("input,textarea,select")
.forEach(input=>{

if(input.type==="file") return;

const key=input.id || input.className;

if(data[key]!==undefined){

input.value=data[key];

}

});

if(data.photo){

previewPhoto.src=data.photo;

previewPhoto.style.display="block";

}

updatePreview();

}

window.addEventListener(

"DOMContentLoaded",

loadResume

);
/*=========================================================
RESET
=========================================================*/

document
.getElementById("resetResume")
.onclick=function(){

if(!confirm(

"Reset Resume?"

))

return;

localStorage.removeItem(

"ResumeCraftAI"

);

location.reload();

};
/*=========================================================
PRINT
=========================================================*/

document
.getElementById("printResume")
.onclick=function(){

window.print();

};
/*=========================================================
PDF EXPORT
=========================================================*/

document
.getElementById("downloadResumePDF")
.onclick=function(){

const element=

document.getElementById(

"resumePaper"

);

html2pdf()

.set({

margin:0,

filename:"Resume.pdf",

image:{

type:"jpeg",

quality:.98

},

html2canvas:{

scale:2

},

jsPDF:{

unit:"mm",

format:"a4",

orientation:"portrait"

}

})

.from(element)

.save();

};
/*=========================================================
ATS SCORE
=========================================================*/

function updateATS(){

let score=0;

const tips=[];

const fields=[

"fullName",

"email",

"phone",

"summary",

"jobTitle"

];

fields.forEach(id=>{

const input=document.getElementById(id);

if(input && input.value.trim()){

score+=15;

}else{

tips.push(

id+" is missing"

);

}

});

const skillCount=

document.querySelectorAll(".skill-name").length;

if(skillCount>=5){

score+=15;

}else{

tips.push(

"Add at least 5 Skills"

);

}

const expCount=

document.querySelectorAll(".experience-item").length;

if(expCount>0){

score+=10;

}else{

tips.push(

"Experience Missing"

);

}

if(score>100){

score=100;

}

atsScore.innerText=

score+"%";

progressBar.style.width=

score+"%";

const list=

document.getElementById(

"atsTips"

);

if(list){

list.innerHTML="";

tips.forEach(t=>{

list.innerHTML+=

"<li>"+t+"</li>";

});

}

}
/*=========================================================
AUTO SAVE
=========================================================*/

document

.querySelectorAll(

"input,textarea,select"

)

.forEach(input=>{

input.addEventListener(

"input",

()=>{

saveResume();

updateATS();

}

);

});
/*=========================================================
SECTION HIDE
=========================================================*/

document

.querySelectorAll(

".sectionToggle"

)

.forEach(box=>{

box.addEventListener(

"change",

()=>{

const id=

box.dataset.section;

const section=

document.getElementById(id);

if(section){

section.style.display=

box.checked

?

"block"

:

"none";

}

}

);

});
updateATS();
/*=========================================================
THEME ENGINE
=========================================================*/

const swatches = document.querySelectorAll(".swatch");

swatches.forEach(btn => {

    btn.addEventListener("click", () => {

        swatches.forEach(s => s.classList.remove("active"));

        btn.classList.add("active");

        const color = btn.dataset.color;

        document.documentElement.style.setProperty("--primary", color);

        localStorage.setItem("themeColor", color);

    });

});

const savedColor = localStorage.getItem("themeColor");

if(savedColor){

    document.documentElement.style.setProperty("--primary", savedColor);

}
/*=========================================================
TEMPLATE
=========================================================*/

const templates = document.querySelectorAll(".template-item");

templates.forEach(card=>{

card.onclick=()=>{

templates.forEach(c=>c.classList.remove("active"));

card.classList.add("active");

resumePaper.className="resume-paper";

resumePaper.classList.add(card.dataset.template);

localStorage.setItem(

"resumeTemplate",

card.dataset.template

);

};

});

const savedTemplate=

localStorage.getItem(

"resumeTemplate"

);

if(savedTemplate){

resumePaper.className=

"resume-paper "+savedTemplate;

}
/*=========================================================
AI SUMMARY
=========================================================*/

document

.getElementById("generateSummary")

.onclick=function(){

const role=

document

.getElementById("jobTitle")

.value;

const summary=

document

.getElementById("summary");

summary.value=

`Results-driven ${role} with strong communication, problem-solving, teamwork and leadership skills. Passionate about delivering high-quality work and continuously learning modern technologies.`;

summary.dispatchEvent(

new Event("input")

);

toast("Summary Generated");

};
/*=========================================================
KEYWORDS
=========================================================*/

document

.getElementById("suggestKeywords")

.onclick=function(){

const keywords=[

"Leadership",

"Communication",

"Problem Solving",

"Teamwork",

"Critical Thinking",

"Time Management",

"Project Management",

"Adaptability",

"Creativity",

"Analytical Skills"

];

document

.getElementById("aiOutput")

.innerHTML=

keywords.join(" • ");

};
/*=========================================================
BULLETS
=========================================================*/

document

.getElementById("generateBullet")

.onclick=function(){

document

.getElementById("aiOutput")

.innerHTML=

`

✔ Improved workflow efficiency by 35%.

<br><br>

✔ Collaborated with cross-functional teams.

<br><br>

✔ Delivered projects before deadlines.

`;

};
/*=========================================================
ATS
=========================================================*/

document

.getElementById("optimizeATS")

.onclick=function(){

document

.getElementById("aiOutput")

.innerHTML=

`

✔ Add measurable achievements.

<br>

✔ Add 5-10 technical skills.

<br>

✔ Include action verbs.

<br>

✔ Keep resume under 2 pages.

<br>

✔ Match job description keywords.

`;

};
/*=========================================================
TAILOR
=========================================================*/

document

.getElementById("tailorResume")

.onclick=function(){

const role=

document

.getElementById("targetRole")

.value;

if(!role){

toast("Enter target role");

return;

}

document

.getElementById("summary")

.value+=

`

 Looking to contribute as ${role}.

`;

updatePreview();

};
/*=========================================================
DRAG & DROP
=========================================================*/

const previewContainer=document.getElementById("resumePaper");

let dragItem=null;

previewContainer.querySelectorAll(".resume-section").forEach(section=>{

section.draggable=true;

section.addEventListener("dragstart",()=>{

dragItem=section;

section.classList.add("dragging");

});

section.addEventListener("dragend",()=>{

section.classList.remove("dragging");

});

section.addEventListener("dragover",(e)=>{

e.preventDefault();

});

section.addEventListener("drop",()=>{

if(dragItem && dragItem!==section){

previewContainer.insertBefore(dragItem,section);

saveResume();

}

});

});
/*=========================================================
PNG EXPORT
=========================================================*/

const pngBtn=document.getElementById("downloadPNG");

if(pngBtn){

pngBtn.onclick=()=>{

html2canvas(resumePaper,{

scale:3

}).then(canvas=>{

const a=document.createElement("a");

a.download="Resume.png";

a.href=canvas.toDataURL();

a.click();

});

};

}
/*=========================================================
DOCX
=========================================================*/

const docBtn=document.getElementById("downloadDOCX");

if(docBtn){

docBtn.onclick=()=>{

toast("DOCX Export requires docx library.");

};

}
/*=========================================================
SEARCH
=========================================================*/

const search=document.getElementById("searchSkill");

if(search){

search.addEventListener("input",()=>{

const keyword=search.value.toLowerCase();

document.querySelectorAll(".skill-item").forEach(item=>{

const text=item.innerText.toLowerCase();

item.style.display=

text.includes(keyword)

?

"block"

:

"none";

});

});

}
/*=========================================================
AUTO YEAR
=========================================================*/

document.querySelectorAll(".currentYear")

.forEach(el=>{

el.innerText=new Date().getFullYear();

});
/*=========================================================
SCROLL
=========================================================*/

document

.querySelectorAll('a[href^="#"]')

.forEach(anchor=>{

anchor.onclick=function(e){

e.preventDefault();

document

.querySelector(this.getAttribute("href"))

.scrollIntoView({

behavior:"smooth"

});

};

});
/*=========================================================
VALIDATION
=========================================================*/

function validateResume(){

let valid=true;

["fullName","email","phone"]

.forEach(id=>{

const field=document.getElementById(id);

if(field && field.value.trim()===""){

field.style.borderColor="red";

valid=false;

}else if(field){

field.style.borderColor="#ddd";

}

});

return valid;

}
const pdfButton=document.getElementById("downloadResumePDF");

if(pdfButton){

pdfButton.addEventListener("click",(e)=>{

if(!validateResume()){

e.preventDefault();

toast("Please complete required fields.");

}

});

}
/*=========================================================
INIT
=========================================================*/

window.addEventListener("DOMContentLoaded",()=>{

loadResume();

updatePreview();

updateATS();

});
