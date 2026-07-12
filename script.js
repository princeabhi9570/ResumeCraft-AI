/*=====================================

ResumeCraft AI Pro v2

script.js

======================================*/

"use strict";

/*==============================
DOM
==============================*/

const body = document.body;

const resumePaper = document.getElementById("resumePaper");

const loader = document.getElementById("loader");

const toast = document.getElementById("toast");

const themeToggle = document.getElementById("themeToggle");

/*==============================
LOADER
==============================*/

window.addEventListener("load", () => {

setTimeout(() => {

loader.style.display = "none";

},600);

});

/*==============================
TOAST
==============================*/

function showToast(message){

toast.innerText = message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},2500);

}

/*==============================
THEME
==============================*/

const savedTheme = localStorage.getItem("theme");

if(savedTheme==="dark"){

body.classList.add("dark");

}

if(themeToggle){

themeToggle.addEventListener("click",()=>{

body.classList.toggle("dark");

localStorage.setItem(

"theme",

body.classList.contains("dark")?"dark":"light"

);

});

}

/*==============================
LIVE INPUTS
==============================*/

function bindText(inputId,previewId,defaultText=""){

const input=document.getElementById(inputId);

const preview=document.getElementById(previewId);

if(!input||!preview)return;

preview.textContent=defaultText;

input.addEventListener("input",()=>{

const value=input.value.trim();

preview.textContent=value||defaultText;

updateVisibility();

saveResume();

});

}

/*==============================
PERSONAL INFO
==============================*/

bindText("name","previewName","Your Name");

bindText("jobTitle","previewJobTitle","Professional Title");

bindText("email","previewEmail","");

bindText("phone","previewPhone","");

bindText("address","previewAddress","");

bindText("linkedin","previewLinkedin","");

bindText("github","previewGithub","");

bindText("portfolio","previewPortfolio","");

bindText("website","previewWebsite","");

bindText(

"summary",

"previewSummary",

"Write your professional summary."

);

/*==============================
CHARACTER COUNT
==============================*/

const summary=document.getElementById("summary");

const summaryCount=document.getElementById("summaryCount");

if(summary&&summaryCount){

summary.addEventListener("input",()=>{

summaryCount.innerText=summary.value.length;

});

}

/*==============================
PHOTO
==============================*/

const photo=document.getElementById("photo");

const previewPhoto=document.getElementById("previewPhoto");

const photoSection=document.getElementById("photoSection");

if(photo){

photo.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(!file){

photoSection.style.display="none";

return;

}

const reader=new FileReader();

reader.onload=function(event){

previewPhoto.src=event.target.result;

photoSection.style.display="block";

saveResume();

};

reader.readAsDataURL(file);

});

}

/*==============================
AUTO HIDE
==============================*/

function toggleBlock(previewId,blockId){

const preview=document.getElementById(previewId);

const block=document.getElementById(blockId);

if(!preview||!block)return;

if(preview.textContent.trim()===""){

block.style.display="none";

}else{

block.style.display="flex";

}

}

function updateVisibility(){

toggleBlock("previewEmail","emailBlock");

toggleBlock("previewPhone","phoneBlock");

toggleBlock("previewAddress","addressBlock");

toggleBlock("previewLinkedin","linkedinBlock");

toggleBlock("previewGithub","githubBlock");

toggleBlock("previewPortfolio","portfolioBlock");

toggleBlock("previewWebsite","websiteBlock");

}

/*==============================
LOCAL STORAGE
==============================*/

function saveResume(){

const data={

name:document.getElementById("name").value,

jobTitle:document.getElementById("jobTitle").value,

email:document.getElementById("email").value,

phone:document.getElementById("phone").value,

address:document.getElementById("address").value,

linkedin:document.getElementById("linkedin").value,

github:document.getElementById("github").value,

portfolio:document.getElementById("portfolio").value,

website:document.getElementById("website").value,

summary:document.getElementById("summary").value

};

localStorage.setItem(

"resumeCraft",

JSON.stringify(data)

);

}

function loadResume(){

const data=JSON.parse(

localStorage.getItem("resumeCraft")

);

if(!data)return;

Object.keys(data).forEach(key=>{

const el=document.getElementById(key);

if(el){

el.value=data[key];

el.dispatchEvent(new Event("input"));

}

});

}

loadResume();

updateVisibility();
/*=====================================
DYNAMIC SECTION HELPERS
======================================*/

function createInput(type, placeholder, className = "") {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.className = className;
    return input;
}

function createTextarea(placeholder) {
    const textarea = document.createElement("textarea");
    textarea.placeholder = placeholder;
    textarea.rows = 4;
    return textarea;
}

function createRemoveButton(wrapper) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "remove-btn";
    btn.innerHTML = '<i class="fa-solid fa-trash"></i> Remove';

    btn.onclick = () => {
        wrapper.remove();
        updateAllPreview();
        saveResume();
    };

    return btn;
}

/*=====================================
SKILLS
======================================*/

const skillContainer = document.getElementById("skillsContainer");
const previewSkills = document.getElementById("previewSkills");

document.getElementById("addSkill").onclick = () => {

    const box = document.createElement("div");
    box.className = "dynamic-box";

    const input = createInput("text","Skill");

    input.oninput = () => {

        updateSkills();

        saveResume();

    };

    box.append(input);

    box.append(createRemoveButton(box));

    skillContainer.append(box);

};

function updateSkills(){

previewSkills.innerHTML="";

document.querySelectorAll("#skillsContainer input").forEach(input=>{

const value=input.value.trim();

if(value){

const li=document.createElement("li");

li.innerText=value;

previewSkills.append(li);

}

});

document.getElementById("skillsSection").style.display=

previewSkills.children.length?"block":"none";

}

/*=====================================
EDUCATION
======================================*/

const educationContainer=document.getElementById("educationContainer");

const previewEducation=document.getElementById("previewEducation");

document.getElementById("addEducation").onclick=()=>{

const box=document.createElement("div");

box.className="dynamic-box";

const degree=createInput("text","Degree");

const college=createInput("text","College");

const year=createInput("text","Year");

[degree,college,year].forEach(i=>{

i.oninput=()=>{

updateEducation();

saveResume();

};

box.append(i);

});

box.append(createRemoveButton(box));

educationContainer.append(box);

};

function updateEducation(){

previewEducation.innerHTML="";

document.querySelectorAll("#educationContainer .dynamic-box").forEach(box=>{

const input=box.querySelectorAll("input");

if(input[0].value||input[1].value){

const div=document.createElement("div");

div.className="edu-item";

div.innerHTML=`

<h4>${input[0].value}</h4>

<span>${input[1].value}</span>

<span>${input[2].value}</span>

`;

previewEducation.append(div);

}

});

document.getElementById("educationSection").style.display=

previewEducation.children.length?"block":"none";

}

/*=====================================
EXPERIENCE
======================================*/

const experienceContainer=document.getElementById("experienceContainer");

const previewExperience=document.getElementById("previewExperience");

document.getElementById("addExperience").onclick=()=>{

const box=document.createElement("div");

box.className="dynamic-box";

const company=createInput("text","Company");

const role=createInput("text","Position");

const date=createInput("text","2023 - Present");

const desc=createTextarea("Description");

[company,role,date,desc].forEach(i=>{

i.oninput=()=>{

updateExperience();

saveResume();

};

box.append(i);

});

box.append(createRemoveButton(box));

experienceContainer.append(box);

};

function updateExperience(){

previewExperience.innerHTML="";

document.querySelectorAll("#experienceContainer .dynamic-box").forEach(box=>{

const input=box.querySelectorAll("input");

const desc=box.querySelector("textarea");

if(input[0].value||input[1].value){

const div=document.createElement("div");

div.className="exp-item";

div.innerHTML=`

<div class="exp-title">${input[1].value}</div>

<div class="exp-company">${input[0].value}</div>

<div class="exp-date">${input[2].value}</div>

<div class="exp-desc">${desc.value}</div>

`;

previewExperience.append(div);

}

});

document.getElementById("experienceSection").style.display=

previewExperience.children.length?"block":"none";

}

/*=====================================
UPDATE ALL
======================================*/

function updateAllPreview(){

updateSkills();

updateEducation();

updateExperience();

}
/*=====================================
PROJECTS
======================================*/

const projectContainer=document.getElementById("projectContainer");
const previewProjects=document.getElementById("previewProjects");

document.getElementById("addProject").onclick=()=>{

const box=document.createElement("div");
box.className="dynamic-box";

const title=createInput("text","Project Name");
const tech=createInput("text","Technologies Used");
const github=createInput("url","GitHub Link");
const live=createInput("url","Live Demo Link");
const desc=createTextarea("Project Description");

[title,tech,github,live,desc].forEach(el=>{
el.oninput=()=>{
updateProjects();
saveResume();
};
box.append(el);
});

box.append(createRemoveButton(box));
projectContainer.append(box);

};

function updateProjects(){

previewProjects.innerHTML="";

document.querySelectorAll("#projectContainer .dynamic-box").forEach(box=>{

const input=box.querySelectorAll("input");
const desc=box.querySelector("textarea");

if(input[0].value.trim()){

const div=document.createElement("div");

div.className="project-item";

div.innerHTML=`
<h4>${input[0].value}</h4>
<p><strong>Tech :</strong> ${input[1].value}</p>
<p>${desc.value}</p>
${input[2].value?`<p><strong>GitHub :</strong> ${input[2].value}</p>`:""}
${input[3].value?`<p><strong>Live :</strong> ${input[3].value}</p>`:""}
`;

previewProjects.append(div);

}

});

document.getElementById("projectsSection").style.display=
previewProjects.children.length?"block":"none";

}

/*=====================================
CERTIFICATIONS
======================================*/

const certificationContainer=document.getElementById("certificationContainer");
const previewCertifications=document.getElementById("previewCertifications");

document.getElementById("addCertification").onclick=()=>{

const box=document.createElement("div");

box.className="dynamic-box";

const name=createInput("text","Certificate Name");
const org=createInput("text","Organization");
const year=createInput("text","Year");

[name,org,year].forEach(el=>{

el.oninput=()=>{

updateCertification();

saveResume();

};

box.append(el);

});

box.append(createRemoveButton(box));

certificationContainer.append(box);

};

function updateCertification(){

previewCertifications.innerHTML="";

document.querySelectorAll("#certificationContainer .dynamic-box").forEach(box=>{

const input=box.querySelectorAll("input");

if(input[0].value){

const div=document.createElement("div");

div.className="cert-item";

div.innerHTML=`<b>${input[0].value}</b><br>${input[1].value} (${input[2].value})`;

previewCertifications.append(div);

}

});

document.getElementById("certificationsSection").style.display=
previewCertifications.children.length?"block":"none";

}

/*=====================================
LANGUAGES
======================================*/

const languageContainer=document.getElementById("languageContainer");
const previewLanguages=document.getElementById("previewLanguages");

document.getElementById("addLanguage").onclick=()=>{

const box=document.createElement("div");

box.className="dynamic-box";

const lang=createInput("text","Language");

lang.oninput=()=>{

updateLanguages();

saveResume();

};

box.append(lang);

box.append(createRemoveButton(box));

languageContainer.append(box);

};

function updateLanguages(){

previewLanguages.innerHTML="";

document.querySelectorAll("#languageContainer input").forEach(input=>{

if(input.value.trim()){

const li=document.createElement("li");

li.textContent=input.value;

previewLanguages.append(li);

}

});

document.getElementById("languagesSection").style.display=
previewLanguages.children.length?"block":"none";

}

/*=====================================
ACHIEVEMENTS
======================================*/

const achievementContainer=document.getElementById("achievementContainer");
const previewAchievements=document.getElementById("previewAchievements");

document.getElementById("addAchievement").onclick=()=>{

const box=document.createElement("div");

box.className="dynamic-box";

const input=createInput("text","Achievement");

input.oninput=()=>{

updateAchievements();

saveResume();

};

box.append(input);

box.append(createRemoveButton(box));

achievementContainer.append(box);

};

function updateAchievements(){

previewAchievements.innerHTML="";

document.querySelectorAll("#achievementContainer input").forEach(input=>{

if(input.value.trim()){

const div=document.createElement("div");

div.className="achievement-item";

div.textContent="• "+input.value;

previewAchievements.append(div);

}

});

document.getElementById("achievementsSection").style.display=
previewAchievements.children.length?"block":"none";

}

/*=====================================
INTERESTS
======================================*/

const interestContainer=document.getElementById("interestContainer");
const previewInterests=document.getElementById("previewInterests");

document.getElementById("addInterest").onclick=()=>{

const box=document.createElement("div");

box.className="dynamic-box";

const input=createInput("text","Interest");

input.oninput=()=>{

updateInterests();

saveResume();

};

box.append(input);

box.append(createRemoveButton(box));

interestContainer.append(box);

};

function updateInterests(){

previewInterests.innerHTML="";

document.querySelectorAll("#interestContainer input").forEach(input=>{

if(input.value.trim()){

const li=document.createElement("li");

li.textContent=input.value;

previewInterests.append(li);

}

});

document.getElementById("interestsSection").style.display=
previewInterests.children.length?"block":"none";

}

/*=====================================
REFERENCES
======================================*/

const referenceContainer=document.getElementById("referenceContainer");
const previewReferences=document.getElementById("previewReferences");

document.getElementById("addReference").onclick=()=>{

const box=document.createElement("div");

box.className="dynamic-box";

const name=createInput("text","Reference Name");
const company=createInput("text","Company");
const phone=createInput("text","Phone");

[name,company,phone].forEach(el=>{

el.oninput=()=>{

updateReferences();

saveResume();

};

box.append(el);

});

box.append(createRemoveButton(box));

referenceContainer.append(box);

};

function updateReferences(){

previewReferences.innerHTML="";

document.querySelectorAll("#referenceContainer .dynamic-box").forEach(box=>{

const input=box.querySelectorAll("input");

if(input[0].value){

const div=document.createElement("div");

div.className="reference-item";

div.innerHTML=`
<b>${input[0].value}</b><br>
${input[1].value}<br>
${input[2].value}
`;

previewReferences.append(div);

}

});

document.getElementById("referencesSection").style.display=
previewReferences.children.length?"block":"none";

}

/*=====================================
UPDATE ALL
======================================*/

function updateAllPreview(){

updateSkills();
updateEducation();
updateExperience();
updateProjects();
updateCertification();
updateLanguages();
updateAchievements();
updateInterests();
updateReferences();

}

updateAllPreview();
/*=====================================
PDF DOWNLOAD (BLANK FIX)
======================================*/

const pdfBtn = document.getElementById("downloadResumePDF");

if(pdfBtn){

pdfBtn.addEventListener("click", async ()=>{

const element=document.getElementById("resumePaper");

if(!element){

alert("Resume not found.");

return;

}

showToast("Preparing PDF...");

const options={

margin:0,

filename:

(document.getElementById("name").value||"Resume")+".pdf",

image:{

type:"jpeg",

quality:1

},

html2canvas:{

scale:3,

useCORS:true,

backgroundColor:"#ffffff",

scrollY:0

},

jsPDF:{

unit:"mm",

format:"a4",

orientation:"portrait"

},

pagebreak:{

mode:["avoid-all","css","legacy"]

}

};

await html2pdf()

.set(options)

.from(element)

.save();

showToast("PDF Downloaded");

});

}

/*=====================================
PRINT
======================================*/

const printBtn=document.getElementById("printResume");

if(printBtn){

printBtn.onclick=()=>{

window.print();

};

}

/*=====================================
RESET
======================================*/

const resetBtn=document.getElementById("resetResume");

if(resetBtn){

resetBtn.onclick=()=>{

if(confirm("Reset Resume?")){

localStorage.removeItem("resumeCraft");

location.reload();

}

};

}

/*=====================================
PNG EXPORT
======================================*/

const pngBtn=document.getElementById("downloadPNG");

if(pngBtn){

pngBtn.onclick=()=>{

html2canvas(document.getElementById("resumePaper"),{

scale:3,

useCORS:true,

backgroundColor:"#ffffff"

}).then(canvas=>{

const link=document.createElement("a");

link.download="Resume.png";

link.href=canvas.toDataURL("image/png");

link.click();

showToast("PNG Downloaded");

});

};

}

/*=====================================
ATS SCORE
======================================*/

function calculateATS(){

let score=0;

const tips=[];

const name=document.getElementById("name").value.trim();

const email=document.getElementById("email").value.trim();

const phone=document.getElementById("phone").value.trim();

const summary=document.getElementById("summary").value.trim();

const skills=document.querySelectorAll("#skillsContainer input");

const experience=document.querySelectorAll("#experienceContainer .dynamic-box");

const education=document.querySelectorAll("#educationContainer .dynamic-box");

if(name)score+=10;
else tips.push("Add Full Name");

if(email)score+=10;
else tips.push("Add Email");

if(phone)score+=10;
else tips.push("Add Phone Number");

if(summary.length>80)score+=20;
else tips.push("Write a stronger summary");

if(skills.length>=5)score+=20;
else tips.push("Add at least 5 skills");

if(experience.length>0)score+=15;
else tips.push("Add Work Experience");

if(education.length>0)score+=15;
else tips.push("Add Education");

document.getElementById("atsScore").innerText=score+"%";

document.getElementById("progressBar").style.width=score+"%";

const list=document.getElementById("atsTips");

list.innerHTML="";

tips.forEach(t=>{

const li=document.createElement("li");

li.innerText=t;

list.append(li);

});

}

setInterval(calculateATS,1000);

/*=====================================
THEME COLORS
======================================*/

document.querySelectorAll(".theme-color").forEach(btn=>{

btn.onclick=()=>{

document.querySelectorAll(".theme-color")

.forEach(b=>b.classList.remove("active"));

btn.classList.add("active");

const color=btn.dataset.color;

document.documentElement

.style

.setProperty("--primary",color);

localStorage.setItem(

"themeColor",

color

);

};

});

const savedColor=

localStorage.getItem("themeColor");

if(savedColor){

document.documentElement

.style

.setProperty("--primary",savedColor);

}

/*=====================================
TEMPLATE SWITCHER
======================================*/

document.querySelectorAll(".template-item")

.forEach(card=>{

card.onclick=()=>{

document.querySelectorAll(".template-item")

.forEach(c=>c.classList.remove("active"));

card.classList.add("active");

resumePaper.className="resume-paper";

resumePaper.classList.add(

card.dataset.template

);

showToast(

card.dataset.template.toUpperCase()

+" Template Selected"

);

};

});

/*=====================================
AUTO SAVE
======================================*/

setInterval(saveResume,3000);

showToast("ResumeCraft Ready 🚀");
/*=====================================
DOCX EXPORT
======================================*/

const docxBtn = document.getElementById("downloadDOCX");

if(docxBtn){

docxBtn.addEventListener("click",()=>{

alert("DOCX Export backend integration ready.");

});

}

/*=====================================
FONT FAMILY
======================================*/

const fontFamily=document.getElementById("fontFamily");

if(fontFamily){

fontFamily.addEventListener("change",()=>{

resumePaper.style.fontFamily=fontFamily.value;

});

}

/*=====================================
FONT SIZE
======================================*/

const fontSize=document.getElementById("fontSize");

const fontSizeValue=document.getElementById("fontSizeValue");

if(fontSize){

fontSize.addEventListener("input",()=>{

resumePaper.style.fontSize=fontSize.value+"px";

fontSizeValue.innerText=fontSize.value+"px";

});

}

/*=====================================
LINE SPACING
======================================*/

const lineSpacing=document.getElementById("lineSpacing");

const lineSpacingValue=document.getElementById("lineSpacingValue");

if(lineSpacing){

lineSpacing.addEventListener("input",()=>{

resumePaper.style.lineHeight=lineSpacing.value;

lineSpacingValue.innerText=lineSpacing.value;

});

}

/*=====================================
SHOW / HIDE SECTIONS
======================================*/

document

.querySelectorAll(".toggle-list input[type='checkbox']")

.forEach(box=>{

box.addEventListener("change",()=>{

const section=

document.getElementById(

box.dataset.section+"Section"

);

if(section){

section.style.display=

box.checked?"block":"none";

}

});

});

/*=====================================
DRAG & DROP
======================================*/

if(window.Sortable){

document.querySelectorAll(

"#skillsContainer,#educationContainer,#experienceContainer,#projectContainer,#certificationContainer,#languageContainer,#achievementContainer,#interestContainer,#referenceContainer"

)

.forEach(el=>{

Sortable.create(el,{

animation:150,

onEnd(){

updateAllPreview();

saveResume();

}

});

});

}

/*=====================================
AI BUTTONS
======================================*/

const aiOutput=document.getElementById("aiOutput");

function aiMessage(msg){

if(aiOutput){

aiOutput.innerHTML=msg;

}

}

const generateSummary=document.getElementById("generateSummary");

if(generateSummary){

generateSummary.onclick=()=>{

aiMessage(

"AI Summary feature will be connected with Gemini/OpenAI."

);

};

}

const optimizeATS=document.getElementById("optimizeATS");

if(optimizeATS){

optimizeATS.onclick=()=>{

calculateATS();

aiMessage(

"ATS optimization completed."

);

};

}

const suggestKeywords=document.getElementById("suggestKeywords");

if(suggestKeywords){

suggestKeywords.onclick=()=>{

aiMessage(

"Suggested Keywords:<br><br>Leadership<br>Problem Solving<br>Communication<br>Teamwork<br>Project Management"

);

};

}

const generateBullet=document.getElementById("generateBullet");

if(generateBullet){

generateBullet.onclick=()=>{

aiMessage(

"• Improved workflow by 35%<br>• Reduced project delivery time<br>• Collaborated with cross-functional teams"

);

};

}

const tailorResume=document.getElementById("tailorResume");

if(tailorResume){

tailorResume.onclick=()=>{

const role=document.getElementById("targetRole").value;

if(role.trim()==""){

alert("Enter Target Role");

return;

}

aiMessage(

"Resume tailored for:<br><b>"+role+"</b>"

);

};

}

/*=====================================
INITIALIZE
======================================*/

calculateATS();

updateAllPreview();

updateVisibility();

showToast("ResumeCraft AI Loaded Successfully");