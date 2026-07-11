// ========================================
// ResumeCraft AI v3
// ========================================

// -------- Live Preview --------

function bind(inputId, previewId, placeholder){

const input=document.getElementById(inputId);

const preview=document.getElementById(previewId);

if(!input||!preview) return;

preview.textContent=input.value||placeholder;

input.addEventListener("input",()=>{

preview.textContent=input.value.trim()||placeholder;

});

}

bind("name","preview-name","Your Name");

bind("email","preview-email","Email Address");

bind("phone","preview-phone","Phone Number");

bind("location","preview-location","Location");

bind("about","preview-about","Write about yourself...");

// -------- Profile Photo --------

const photo=document.getElementById("photo");

const previewPhoto=document.getElementById("preview-photo");

if(photo){

photo.addEventListener("change",function(){

const file=this.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(e){

previewPhoto.src=e.target.result;

};

reader.readAsDataURL(file);

});

}

// -------- Template Change --------

const templateItems=document.querySelectorAll(".template-item");

const resume=document.getElementById("resume");

templateItems.forEach(item=>{

item.addEventListener("click",()=>{

templateItems.forEach(card=>{

card.classList.remove("active-template");

});

item.classList.add("active-template");

resume.className="preview";

resume.classList.add(item.dataset.template);

});

});

// -------- Helper Function --------

function addItem(inputId,listId){

const input=document.getElementById(inputId);

const list=document.getElementById(listId);

if(!input||!list) return;

const value=input.value.trim();

if(value==="") return;

const li=document.createElement("li");

li.innerHTML=`
${value}
<button class="delete-btn">✖</button>
`;

li.querySelector("button").onclick=()=>{

li.remove();

};

list.appendChild(li);

input.value="";

}// ========================================
// Dynamic Education
// ========================================

const addEducation=document.getElementById("addEducation");

if(addEducation){

addEducation.addEventListener("click",()=>{

addItem("educationInput","preview-education");

showToast("Education Added");

});

}

// ========================================
// Dynamic Skills
// ========================================

const addSkill=document.getElementById("addSkill");

if(addSkill){

addSkill.addEventListener("click",()=>{

addItem("skillInput","preview-skills");

showToast("Skill Added");

});

}

// ========================================
// Dynamic Experience
// ========================================

const addExperience=document.getElementById("addExperience");

if(addExperience){

addExperience.addEventListener("click",()=>{

addItem("experienceInput","preview-experience");

showToast("Experience Added");

});

}

// ========================================
// Dynamic Projects
// ========================================

const addProject=document.getElementById("addProject");

if(addProject){

addProject.addEventListener("click",()=>{

const title=document.getElementById("projectTitle").value.trim();

const desc=document.getElementById("projectDesc").value.trim();

if(title===""||desc==="") return;

const box=document.createElement("div");

box.className="project-item";

box.innerHTML=`

<h4>${title}</h4>

<p>${desc}</p>

<button class="delete-btn">✖</button>

`;

box.querySelector("button").onclick=()=>{

box.remove();

showToast("Project Removed");

};

document.getElementById("preview-projects").appendChild(box);

document.getElementById("projectTitle").value="";

document.getElementById("projectDesc").value="";

showToast("Project Added");

});

}

// ========================================
// Toast Notification
// ========================================

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.remove();

},2500);

}// ========================================
// AI Resume Generator (Demo)
// ========================================

const aiGenerate=document.getElementById("aiGenerate");

if(aiGenerate){

aiGenerate.addEventListener("click",()=>{

document.getElementById("about").value=
"Motivated and detail-oriented professional with strong problem-solving skills and a passion for continuous learning.";

document.getElementById("preview-about").textContent=
document.getElementById("about").value;

showToast("AI Resume Generated");

});

}

// ========================================
// ATS Score Checker
// ========================================

const checkATS=document.getElementById("checkATS");

if(checkATS){

checkATS.addEventListener("click",()=>{

let score=0;

if(document.getElementById("name").value.trim()) score+=15;

if(document.getElementById("email").value.trim()) score+=10;

if(document.getElementById("phone").value.trim()) score+=10;

if(document.getElementById("location").value.trim()) score+=5;

if(document.getElementById("about").value.trim()) score+=20;

if(document.getElementById("preview-education").children.length>0) score+=15;

if(document.getElementById("preview-skills").children.length>0) score+=15;

if(document.getElementById("preview-experience").children.length>0) score+=10;

document.getElementById("scoreValue").textContent=score+"%";

showToast("ATS Score : "+score+"%");

});

}

// ========================================
// Download PDF
// ========================================

const downloadBtn=document.getElementById("downloadBtn");

if(downloadBtn){

downloadBtn.addEventListener("click",()=>{

const resume=document.getElementById("resume");

const opt={

margin:0,

filename:"ResumeCraftAI-Resume.pdf",

image:{type:"jpeg",quality:1},

html2canvas:{

scale:3,

useCORS:true

},

jsPDF:{

unit:"mm",

format:"a4",

orientation:"portrait"

}

};

html2pdf().set(opt).from(resume).save();

showToast("PDF Download Started");

});

}

// ========================================
// Reset Resume
// ========================================

const resetBtn=document.getElementById("resetBtn");

if(resetBtn){

resetBtn.addEventListener("click",()=>{

if(!confirm("Reset Resume?")) return;

location.reload();

});

}

// ========================================
// Dark Mode
// ========================================

const darkBtn=document.getElementById("darkModeBtn");

if(darkBtn){

darkBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

localStorage.setItem(

"theme",

document.body.classList.contains("dark")

?"dark"

:"light"

);

});

}

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark");

}

// ========================================
// Auto Save
// ========================================

["name","email","phone","location","about"].forEach(id=>{

const input=document.getElementById(id);

if(!input) return;

const saved=localStorage.getItem(id);

if(saved){

input.value=saved;

const preview=document.getElementById("preview-"+id);

if(preview){

preview.textContent=saved;

}

}

input.addEventListener("input",()=>{

localStorage.setItem(id,input.value);

});

});// ========================================
// Print Resume
// ========================================

const printBtn=document.createElement("button");

printBtn.innerHTML="🖨 Print Resume";

printBtn.type="button";

printBtn.id="printBtn";

const downloadButton=document.getElementById("downloadBtn");

if(downloadButton){

downloadButton.parentNode.insertBefore(printBtn,downloadButton.nextSibling);

}

printBtn.addEventListener("click",()=>{

window.print();

showToast("Opening Print Preview");

});

// ========================================
// Export Resume JSON
// ========================================

function exportResume(){

const data={

name:document.getElementById("name").value,

email:document.getElementById("email").value,

phone:document.getElementById("phone").value,

location:document.getElementById("location").value,

about:document.getElementById("about").value,

education:[...document.querySelectorAll("#preview-education li")].map(li=>li.firstChild.textContent.trim()),

skills:[...document.querySelectorAll("#preview-skills li")].map(li=>li.firstChild.textContent.trim()),

experience:[...document.querySelectorAll("#preview-experience li")].map(li=>li.firstChild.textContent.trim())

};

const blob=new Blob(

[JSON.stringify(data,null,2)],

{type:"application/json"}

);

const link=document.createElement("a");

link.href=URL.createObjectURL(blob);

link.download="resume.json";

link.click();

URL.revokeObjectURL(link.href);

showToast("Resume Exported");

}

// ========================================
// Export Button
// ========================================

const exportBtn=document.createElement("button");

exportBtn.type="button";

exportBtn.id="exportBtn";

exportBtn.innerHTML="⬇ Export JSON";

if(printBtn){

printBtn.parentNode.insertBefore(exportBtn,printBtn.nextSibling);

}

exportBtn.addEventListener("click",exportResume);

// ========================================
// Copy Resume
// ========================================

const copyBtn=document.createElement("button");

copyBtn.type="button";

copyBtn.id="copyBtn";

copyBtn.innerHTML="📋 Copy Resume";

if(exportBtn){

exportBtn.parentNode.insertBefore(copyBtn,exportBtn.nextSibling);

}

copyBtn.addEventListener("click",()=>{

navigator.clipboard.writeText(

document.getElementById("resume").innerText

);

showToast("Resume Copied");

});

// ========================================
// Keyboard Shortcut
// Ctrl + S = Download PDF
// ========================================

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="s"){

e.preventDefault();

document.getElementById("downloadBtn").click();

}

});

// ========================================
// Drag & Drop Photo
// ========================================

const photoBox=document.querySelector(".photo-box");

if(photoBox){

photoBox.addEventListener("dragover",(e)=>{

e.preventDefault();

});

photoBox.addEventListener("drop",(e)=>{

e.preventDefault();

const file=e.dataTransfer.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(event){

document.getElementById("preview-photo").src=event.target.result;

};

reader.readAsDataURL(file);

});

}// ========================================
// Resume Progress Bar
// ========================================

function updateProgress(){

let total=8;
let filled=0;

if(document.getElementById("name").value.trim()) filled++;
if(document.getElementById("email").value.trim()) filled++;
if(document.getElementById("phone").value.trim()) filled++;
if(document.getElementById("location").value.trim()) filled++;
if(document.getElementById("about").value.trim()) filled++;
if(document.getElementById("preview-education").children.length>0) filled++;
if(document.getElementById("preview-skills").children.length>0) filled++;
if(document.getElementById("preview-experience").children.length>0) filled++;

const percent=Math.round((filled/total)*100);

let bar=document.getElementById("progressBar");

if(!bar){

const container=document.createElement("div");

container.style.marginBottom="20px";

container.innerHTML=`

<h3>Resume Completion</h3>

<div style="width:100%;height:18px;background:#ddd;border-radius:20px;overflow:hidden;">

<div id="progressBar"
style="height:100%;width:${percent}%;background:#22c55e;transition:.4s;"></div>

</div>

<p id="progressText">${percent}% Complete</p>

`;

document.querySelector(".form").prepend(container);

}else{

bar.style.width=percent+"%";

document.getElementById("progressText").innerHTML=percent+"% Complete";

}

}

setInterval(updateProgress,500);

// ========================================
// Import Resume JSON
// ========================================

const importBtn=document.createElement("button");

importBtn.innerHTML="📂 Import JSON";

importBtn.type="button";

document.querySelector(".form").appendChild(importBtn);

const importInput=document.createElement("input");

importInput.type="file";

importInput.accept=".json";

importInput.style.display="none";

document.body.appendChild(importInput);

importBtn.onclick=()=>{

importInput.click();

};

importInput.onchange=function(){

const file=this.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(e){

const data=JSON.parse(e.target.result);

document.getElementById("name").value=data.name||"";
document.getElementById("email").value=data.email||"";
document.getElementById("phone").value=data.phone||"";
document.getElementById("location").value=data.location||"";
document.getElementById("about").value=data.about||"";

document.getElementById("name").dispatchEvent(new Event("input"));
document.getElementById("email").dispatchEvent(new Event("input"));
document.getElementById("phone").dispatchEvent(new Event("input"));
document.getElementById("location").dispatchEvent(new Event("input"));
document.getElementById("about").dispatchEvent(new Event("input"));

showToast("Resume Imported");

};

reader.readAsText(file);

};

// ========================================
// Demo AI Suggestions
// ========================================

const suggestions=[

"Strong Communication Skills",

"Problem Solving",

"Leadership",

"Team Collaboration",

"Time Management",

"React.js",

"Node.js",

"Python",

"Java",

"SQL"

];

const skillInput=document.getElementById("skillInput");

if(skillInput){

skillInput.addEventListener("focus",()=>{

console.log("AI Suggestions:",suggestions);

});

}

// ========================================
// Console Message
// ========================================

console.log("ResumeCraft AI v3 Loaded Successfully 🚀");