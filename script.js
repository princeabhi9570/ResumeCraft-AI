/*=========================================================
ResumeCraft AI
SCRIPT.JS PART-1
=========================================================*/

"use strict";

/*=========================================================
ELEMENTS
=========================================================*/

const $ = (id) => document.getElementById(id);

const resumePaper = $("resumePaper");

const fullName = $("fullName");
const jobTitle = $("jobTitle");
const email = $("email");
const phone = $("phone");
const address = $("address");

const linkedin = $("linkedin");
const github = $("github");
const portfolio = $("portfolio");
const website = $("website");

const summary = $("summary");

const photo = $("photo");

const previewName = $("previewName");
const previewJobTitle = $("previewJobTitle");
const previewEmail = $("previewEmail");
const previewPhone = $("previewPhone");
const previewAddress = $("previewAddress");

const previewSummary = $("previewSummary");

const previewLinkedin = $("previewLinkedin");
const previewGithub = $("previewGithub");
const previewPortfolio = $("previewPortfolio");
const previewWebsite = $("previewWebsite");

const previewPhoto = $("previewPhoto");

const summaryCount = $("summaryCount");

const themeToggle = $("themeToggle");

/*=========================================================
SAFE FUNCTION
=========================================================*/

function setText(el, value, fallback = "") {

if (!el) return;

el.textContent = value.trim() || fallback;

}

function setLink(el, value) {

if (!el) return;

if (value.trim() === "") {

el.style.display = "none";

return;

}

el.style.display = "inline-block";

el.href = value;

el.innerText = value;

}

/*=========================================================
LIVE INPUT
=========================================================*/

function updatePreview() {

setText(previewName, fullName.value, "Your Name");

setText(previewJobTitle, jobTitle.value, "Professional Title");

setText(previewEmail, email.value, "");

setText(previewPhone, phone.value, "");

setText(previewAddress, address.value, "");

setText(previewSummary, summary.value, "");

setLink(previewLinkedin, linkedin.value);

setLink(previewGithub, github.value);

setLink(previewPortfolio, portfolio.value);

setLink(previewWebsite, website.value);

summaryCount.innerText = summary.value.length;

saveResume();

}

/*=========================================================
INPUT LISTENER
=========================================================*/

[
fullName,
jobTitle,
email,
phone,
address,
linkedin,
github,
portfolio,
website,
summary

].forEach(input => {

if (!input) return;

input.addEventListener("input", updatePreview);

});

/*=========================================================
PHOTO
=========================================================*/

if (photo) {

photo.addEventListener("change", function () {

const file = this.files[0];

if (!file) {

previewPhoto.style.display = "none";

previewPhoto.src = "";

saveResume();

return;

}

const reader = new FileReader();

reader.onload = function (e) {

previewPhoto.src = e.target.result;

previewPhoto.style.display = "block";

saveResume();

};

reader.readAsDataURL(file);

});

}

/*=========================================================
THEME
=========================================================*/

if (themeToggle) {

themeToggle.addEventListener("click", () => {

document.body.classList.toggle("dark");

localStorage.setItem(

"theme",

document.body.classList.contains("dark")

);

});

}

if (localStorage.getItem("theme") === "true") {

document.body.classList.add("dark");

}

/*=========================================================
AUTO SAVE
=========================================================*/

function saveResume() {

const data = {

fullName: fullName.value,

jobTitle: jobTitle.value,

email: email.value,

phone: phone.value,

address: address.value,

linkedin: linkedin.value,

github: github.value,

portfolio: portfolio.value,

website: website.value,

summary: summary.value,

photo: previewPhoto.src

};

localStorage.setItem(

"ResumeCraftAI",

JSON.stringify(data)

);

}

/*=========================================================
LOAD
=========================================================*/

function loadResume() {

const data = JSON.parse(

localStorage.getItem("ResumeCraftAI")

);

if (!data) return;

fullName.value = data.fullName || "";

jobTitle.value = data.jobTitle || "";

email.value = data.email || "";

phone.value = data.phone || "";

address.value = data.address || "";

linkedin.value = data.linkedin || "";

github.value = data.github || "";

portfolio.value = data.portfolio || "";

website.value = data.website || "";

summary.value = data.summary || "";

if (data.photo) {

previewPhoto.src = data.photo;

previewPhoto.style.display = "block";

}

updatePreview();

}

window.addEventListener("load", loadResume);

/*=========================================================
LOADER
=========================================================*/

window.addEventListener("load", () => {

const loader = document.getElementById("loader");

if (loader) {

loader.style.opacity = "0";

setTimeout(() => {

loader.style.display = "none";

}, 500);

}

});
/*=========================================================
SCRIPT.JS PART-2
Dynamic Resume Sections
=========================================================*/

const sections = {

skills: [],
education: [],
experience: [],
projects: [],
certifications: [],
languages: [],
achievements: [],
interests: [],
references: []

};

/*=========================================================
HELPER
=========================================================*/

function createInput(placeholder){

const input=document.createElement("input");

input.type="text";

input.placeholder=placeholder;

input.className="dynamic-input";

return input;

}

function createTextarea(placeholder){

const area=document.createElement("textarea");

area.placeholder=placeholder;

area.rows=4;

area.className="dynamic-input";

return area;

}

function createDelete(){

const btn=document.createElement("button");

btn.type="button";

btn.className="danger-btn";

btn.innerHTML='<i class="fa fa-trash"></i> Remove';

return btn;

}

/*=========================================================
SKILLS
=========================================================*/

const skillContainer=document.getElementById("skillsContainer");

const previewSkills=document.getElementById("previewSkills");

document.getElementById("addSkill").onclick=()=>{

const box=document.createElement("div");

box.className="dynamic-box";

const input=createInput("Skill");

const del=createDelete();

box.append(input,del);

skillContainer.appendChild(box);

input.oninput=updateSkills;

del.onclick=()=>{

box.remove();

updateSkills();

};

};

function updateSkills(){

previewSkills.innerHTML="";

const data=[];

document.querySelectorAll("#skillsContainer input").forEach(i=>{

if(i.value.trim()!=""){

data.push(i.value.trim());

}

});

if(data.length==0){

document.getElementById("skillsSection").style.display="none";

return;

}

document.getElementById("skillsSection").style.display="block";

data.forEach(skill=>{

const li=document.createElement("li");

li.innerText=skill;

previewSkills.appendChild(li);

});

saveResume();

}

/*=========================================================
LANGUAGES
=========================================================*/

const languageContainer=document.getElementById("languageContainer");

const previewLanguages=document.getElementById("previewLanguages");

document.getElementById("addLanguage").onclick=()=>{

const box=document.createElement("div");

box.className="dynamic-box";

const input=createInput("Language");

const del=createDelete();

box.append(input,del);

languageContainer.appendChild(box);

input.oninput=updateLanguage;

del.onclick=()=>{

box.remove();

updateLanguage();

};

};

function updateLanguage(){

previewLanguages.innerHTML="";

const arr=[];

document.querySelectorAll("#languageContainer input").forEach(i=>{

if(i.value.trim()!="") arr.push(i.value.trim());

});

if(arr.length==0){

languagesSection.style.display="none";

return;

}

languagesSection.style.display="block";

arr.forEach(item=>{

const li=document.createElement("li");

li.innerText=item;

previewLanguages.appendChild(li);

});

saveResume();

}

/*=========================================================
INTERESTS
=========================================================*/

const interestContainer=document.getElementById("interestContainer");

const previewInterests=document.getElementById("previewInterests");

document.getElementById("addInterest").onclick=()=>{

const box=document.createElement("div");

box.className="dynamic-box";

const input=createInput("Interest");

const del=createDelete();

box.append(input,del);

interestContainer.appendChild(box);

input.oninput=updateInterest;

del.onclick=()=>{

box.remove();

updateInterest();

};

};

function updateInterest(){

previewInterests.innerHTML="";

const arr=[];

document.querySelectorAll("#interestContainer input").forEach(i=>{

if(i.value.trim()!="") arr.push(i.value.trim());

});

if(arr.length==0){

interestsSection.style.display="none";

return;

}

interestsSection.style.display="block";

arr.forEach(item=>{

const li=document.createElement("li");

li.innerText=item;

previewInterests.appendChild(li);

});

saveResume();

}

/*=========================================================
ACHIEVEMENTS
=========================================================*/

const achievementContainer=document.getElementById("achievementContainer");

const previewAchievements=document.getElementById("previewAchievements");

document.getElementById("addAchievement").onclick=()=>{

const box=document.createElement("div");

box.className="dynamic-box";

const input=createInput("Achievement");

const del=createDelete();

box.append(input,del);

achievementContainer.appendChild(box);

input.oninput=updateAchievement;

del.onclick=()=>{

box.remove();

updateAchievement();

};

};

function updateAchievement(){

previewAchievements.innerHTML="";

const arr=[];

document.querySelectorAll("#achievementContainer input").forEach(i=>{

if(i.value.trim()!="") arr.push(i.value.trim());

});

if(arr.length==0){

achievementsSection.style.display="none";

return;

}

achievementsSection.style.display="block";

arr.forEach(item=>{

const li=document.createElement("li");

li.innerText=item;

previewAchievements.appendChild(li);

});

saveResume();

}
/*=========================================================
SCRIPT.JS PART-3A
EDUCATION
=========================================================*/

const educationContainer = document.getElementById("educationContainer");
const previewEducation = document.getElementById("previewEducation");
const educationSection = document.getElementById("educationSection");

document.getElementById("addEducation").addEventListener("click", addEducation);

function addEducation(data = {}) {

const card = document.createElement("div");
card.className = "dynamic-card";

card.innerHTML = `

<div class="form-grid">

<div class="form-group">
<label>Degree</label>
<input type="text" class="degree" placeholder="B.Tech" value="${data.degree || ""}">
</div>

<div class="form-group">
<label>College</label>
<input type="text" class="college" placeholder="ABC College" value="${data.college || ""}">
</div>

<div class="form-group">
<label>University</label>
<input type="text" class="university" placeholder="XYZ University" value="${data.university || ""}">
</div>

<div class="form-group">
<label>Percentage / CGPA</label>
<input type="text" class="cgpa" placeholder="8.5 CGPA" value="${data.cgpa || ""}">
</div>

<div class="form-group">
<label>Start Year</label>
<input type="text" class="startYear" placeholder="2022" value="${data.startYear || ""}">
</div>

<div class="form-group">
<label>End Year</label>
<input type="text" class="endYear" placeholder="2026" value="${data.endYear || ""}">
</div>

</div>

<button type="button" class="danger-btn removeEducation">

<i class="fa-solid fa-trash"></i>

Remove

</button>

`;

educationContainer.appendChild(card);

card.querySelectorAll("input").forEach(input => {

input.addEventListener("input", updateEducation);

});

card.querySelector(".removeEducation").onclick = () => {

card.remove();

updateEducation();

};

updateEducation();

}

/*=========================================================
UPDATE EDUCATION
=========================================================*/

function updateEducation(){

previewEducation.innerHTML = "";

const cards = educationContainer.querySelectorAll(".dynamic-card");

let count = 0;

cards.forEach(card=>{

const degree = card.querySelector(".degree").value.trim();
const college = card.querySelector(".college").value.trim();
const university = card.querySelector(".university").value.trim();
const cgpa = card.querySelector(".cgpa").value.trim();
const startYear = card.querySelector(".startYear").value.trim();
const endYear = card.querySelector(".endYear").value.trim();

if(

degree==="" &&
college==="" &&
university==="" &&
cgpa==="" &&
startYear==="" &&
endYear===""

){

return;

}

count++;

const item=document.createElement("div");

item.className="education-item";

item.innerHTML=`

<h4>${degree}</h4>

<p>

${college}

${university ? " • "+university : ""}

</p>

<p>

${cgpa}

${cgpa && (startYear || endYear) ? " | " : ""}

${startYear}

${startYear && endYear ? " - " : ""}

${endYear}

</p>

`;

previewEducation.appendChild(item);

});

educationSection.style.display = count ? "block" : "none";

saveResume();

}

/*=========================================================
INITIAL
=========================================================*/

if(educationContainer.children.length===0){

addEducation();

}