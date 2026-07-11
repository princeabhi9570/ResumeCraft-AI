/*=========================================
 ResumeCraft Pro v2.0
 JavaScript Part 1
==========================================*/

// ==========================================
// Resume Data Model
// ==========================================

const resumeData = {
  personal: {
    fullName: "",
    jobTitle: "",
    email: "",
    phone: "",
    location: "",
    website: "",
    summary: "",
    image: ""
  },

  skills: [],

  education: [],

  experience: [],

  projects: [],

  certificates: [],

  languages: [],

  social: {
    linkedin: "",
    github: "",
    portfolio: ""
  }
};

// ==========================================
// Inputs
// ==========================================

const fullName = document.getElementById("fullName");
const jobTitle = document.getElementById("jobTitle");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const locationInput = document.getElementById("location");
const website = document.getElementById("website");
const summary = document.getElementById("summary");
const profileImage = document.getElementById("profileImage");

// ==========================================
// Preview Elements
// ==========================================

const previewName = document.getElementById("previewName");
const previewJobTitle = document.getElementById("previewJobTitle");
const previewEmail = document.getElementById("previewEmail");
const previewPhone = document.getElementById("previewPhone");
const previewLocation = document.getElementById("previewLocation");
const previewWebsite = document.getElementById("previewWebsite");
const previewSummary = document.getElementById("previewSummary");
const previewImage = document.getElementById("previewImage");

// ==========================================
// Update Resume Object
// ==========================================

function updatePersonalData(){

resumeData.personal.fullName=fullName.value;

resumeData.personal.jobTitle=jobTitle.value;

resumeData.personal.email=email.value;

resumeData.personal.phone=phone.value;

resumeData.personal.location=locationInput.value;

resumeData.personal.website=website.value;

resumeData.personal.summary=summary.value;

updatePreview();

}

// ==========================================
// Update Live Preview
// ==========================================

function updatePreview(){

previewName.textContent=
resumeData.personal.fullName || "Your Name";

previewJobTitle.textContent=
resumeData.personal.jobTitle || "Your Profession";

previewEmail.textContent=
resumeData.personal.email || "example@gmail.com";

previewPhone.textContent=
resumeData.personal.phone || "+91 9876543210";

previewLocation.textContent=
resumeData.personal.location || "India";

previewWebsite.textContent=
resumeData.personal.website || "www.portfolio.com";

previewSummary.textContent=
resumeData.personal.summary ||
"Your Professional Summary Appears Here.";

}

// ==========================================
// Live Events
// ==========================================

[
fullName,
jobTitle,
email,
phone,
locationInput,
website,
summary
].forEach(input=>{

input.addEventListener("input",updatePersonalData);

});

// ==========================================
// Image Upload
// ==========================================

profileImage.addEventListener("change",function(){

const file=this.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(e){

resumeData.personal.image=e.target.result;

previewImage.src=e.target.result;

}

reader.readAsDataURL(file);

});

// ==========================================
// Generate Resume
// ==========================================

const generateBtn=document.getElementById("generateResume");

generateBtn.addEventListener("click",()=>{

updatePersonalData();

showToast("Resume Generated Successfully!");

});

// ==========================================
// Toast
// ==========================================

function showToast(message){

const toast=document.getElementById("toast");

toast.innerText=message;

toast.classList.add("show");

setTimeout(()=>{

toast.classList.remove("show");

},3000);

}

// ==========================================
// Initial Preview
// ==========================================

updatePreview();

console.log("ResumeCraft Pro Loaded");/*=========================================
 ResumeCraft Pro v2.0
 JavaScript Part 2
==========================================*/

// ==========================================
// Containers
// ==========================================

const skillsContainer = document.getElementById("skillsContainer");
const educationContainer = document.getElementById("educationContainer");
const experienceContainer = document.getElementById("experienceContainer");
const projectsContainer = document.getElementById("projectsContainer");

// ==========================================
// Preview Containers
// ==========================================

const previewSkills = document.getElementById("previewSkills");
const previewEducation = document.getElementById("previewEducation");
const previewExperience = document.getElementById("previewExperience");
const previewProjects = document.getElementById("previewProjects");

// ==========================================
// Analytics
// ==========================================

const skillCount = document.getElementById("skillCount");
const projectCount = document.getElementById("projectCount");
const educationCount = document.getElementById("educationCount");
const experienceCount = document.getElementById("experienceCount");

// ==========================================
// Update Analytics
// ==========================================

function updateAnalytics(){

skillCount.textContent = resumeData.skills.length;

projectCount.textContent = resumeData.projects.length;

educationCount.textContent = resumeData.education.length;

experienceCount.textContent = resumeData.experience.length;

}

// ==========================================
// Skills
// ==========================================

function updateSkills(){

const inputs=document.querySelectorAll(".skill-input");

resumeData.skills=[];

previewSkills.innerHTML="";

inputs.forEach(input=>{

const value=input.value.trim();

if(value!=""){

resumeData.skills.push(value);

const li=document.createElement("li");

li.textContent=value;

previewSkills.appendChild(li);

}

});

updateAnalytics();

}

document.addEventListener("input",function(e){

if(e.target.classList.contains("skill-input")){

updateSkills();

}

});

document.getElementById("addSkill").addEventListener("click",()=>{

const input=document.createElement("input");

input.type="text";

input.placeholder="Skill";

input.className="skill-input";

skillsContainer.appendChild(input);

});

// ==========================================
// Education
// ==========================================

function updateEducation(){

resumeData.education=[];

previewEducation.innerHTML="";

document.querySelectorAll(".education-item").forEach(card=>{

const degree=card.querySelector(".degree").value;

const college=card.querySelector(".college").value;

const year=card.querySelector(".eduYear").value;

const desc=card.querySelector(".eduDescription").value;

if(degree!=""){

resumeData.education.push({

degree,

college,

year,

desc

});

const div=document.createElement("div");

div.innerHTML=`

<h4>${degree}</h4>

<p>${college}</p>

<p>${year}</p>

<p>${desc}</p>

`;

previewEducation.appendChild(div);

}

});

updateAnalytics();

}

document.addEventListener("input",(e)=>{

if(

e.target.classList.contains("degree") ||

e.target.classList.contains("college") ||

e.target.classList.contains("eduYear") ||

e.target.classList.contains("eduDescription")

){

updateEducation();

}

});

document.getElementById("addEducation").onclick=()=>{

educationContainer.insertAdjacentHTML("beforeend",`

<div class="education-item">

<input type="text" class="degree" placeholder="Degree">

<input type="text" class="college" placeholder="College">

<input type="text" class="eduYear" placeholder="Year">

<textarea class="eduDescription" placeholder="Description"></textarea>

</div>

`);

};

// ==========================================
// Experience
// ==========================================

function updateExperience(){

resumeData.experience=[];

previewExperience.innerHTML="";

document.querySelectorAll(".experience-item").forEach(card=>{

const company=card.querySelector(".company").value;

const position=card.querySelector(".position").value;

const year=card.querySelector(".experienceYear").value;

const desc=card.querySelector(".experienceDescription").value;

if(position!=""){

resumeData.experience.push({

company,

position,

year,

desc

});

const div=document.createElement("div");

div.innerHTML=`

<h4>${position}</h4>

<p>${company}</p>

<p>${year}</p>

<p>${desc}</p>

`;

previewExperience.appendChild(div);

}

});

updateAnalytics();

}

document.addEventListener("input",(e)=>{

if(

e.target.classList.contains("company") ||

e.target.classList.contains("position") ||

e.target.classList.contains("experienceYear") ||

e.target.classList.contains("experienceDescription")

){

updateExperience();

}

});

document.getElementById("addExperience").onclick=()=>{

experienceContainer.insertAdjacentHTML("beforeend",`

<div class="experience-item">

<input class="company" placeholder="Company">

<input class="position" placeholder="Position">

<input class="experienceYear" placeholder="Duration">

<textarea class="experienceDescription" placeholder="Description"></textarea>

</div>

`);

};

// ==========================================
// Projects
// ==========================================

function updateProjects(){

resumeData.projects=[];

previewProjects.innerHTML="";

document.querySelectorAll(".project-item").forEach(card=>{

const name=card.querySelector(".projectName").value;

const tech=card.querySelector(".projectTech").value;

const desc=card.querySelector(".projectDescription").value;

if(name!=""){

resumeData.projects.push({

name,

tech,

desc

});

const div=document.createElement("div");

div.innerHTML=`

<h4>${name}</h4>

<p>${tech}</p>

<p>${desc}</p>

`;

previewProjects.appendChild(div);

}

});

updateAnalytics();

}

document.addEventListener("input",(e)=>{

if(

e.target.classList.contains("projectName") ||

e.target.classList.contains("projectTech") ||

e.target.classList.contains("projectDescription")

){

updateProjects();

}

});

document.getElementById("addProject").onclick=()=>{

projectsContainer.insertAdjacentHTML("beforeend",`

<div class="project-item">

<input class="projectName" placeholder="Project Name">

<input class="projectTech" placeholder="Technology">

<textarea class="projectDescription" placeholder="Description"></textarea>

</div>

`);

};

// ==========================================
// Initialize
// ==========================================

updateSkills();

updateEducation();

updateExperience();

updateProjects();

updateAnalytics();

console.log("Dynamic Resume Builder Loaded");/*=========================================
 ResumeCraft Pro v2.0
 JavaScript Part 3
==========================================*/

// ==========================================
// Local Storage
// ==========================================

const STORAGE_KEY = "resumeCraftData";

function saveResume() {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(resumeData)
    );

    showToast("Resume Saved Successfully");

}

function loadResume() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    const data = JSON.parse(saved);

    Object.assign(resumeData, data);

    // Personal

    fullName.value = data.personal.fullName || "";
    jobTitle.value = data.personal.jobTitle || "";
    email.value = data.personal.email || "";
    phone.value = data.personal.phone || "";
    locationInput.value = data.personal.location || "";
    website.value = data.personal.website || "";
    summary.value = data.personal.summary || "";

    updatePersonalData();

    // Skills

    skillsContainer.innerHTML = "";

    (data.skills || []).forEach(skill => {

        const input = document.createElement("input");

        input.type = "text";

        input.className = "skill-input";

        input.value = skill;

        input.placeholder = "Skill";

        skillsContainer.appendChild(input);

    });

    if ((data.skills || []).length === 0) {

        skillsContainer.innerHTML =
        `<input type="text"
        class="skill-input"
        placeholder="Skill">`;

    }

    updateSkills();

}

// ==========================================
// Auto Save
// ==========================================

document.addEventListener("input", () => {

    saveResume();

});

// ==========================================
// Save Button
// ==========================================

const saveBtn = document.getElementById("saveResume");

saveBtn.addEventListener("click", () => {

    saveResume();

});

// ==========================================
// Export JSON
// ==========================================

const exportBtn =
document.getElementById("exportResume");

exportBtn.addEventListener("click", () => {

    const blob = new Blob(

        [JSON.stringify(resumeData, null, 2)],

        {

            type: "application/json"

        }

    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "ResumeCraft.json";

    link.click();

    showToast("Resume Exported");

});

// ==========================================
// Import JSON
// ==========================================

const importBtn =
document.getElementById("importResume");

const importInput =
document.createElement("input");

importInput.type = "file";

importInput.accept = ".json";

importBtn.onclick = () => {

    importInput.click();

};

importInput.onchange = function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const json = JSON.parse(e.target.result);

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(json)

        );

        location.reload();

    };

    reader.readAsText(file);

};

// ==========================================
// Dark Mode
// ==========================================

const themeBtn =
document.getElementById("themeToggle");

function loadTheme() {

    const theme =

    localStorage.getItem("theme");

    if (theme === "light") {

        document.body.classList.add("light");

    }

}

themeBtn.onclick = () => {

    document.body.classList.toggle("light");

    if (

        document.body.classList.contains("light")

    ) {

        localStorage.setItem(

            "theme",

            "light"

        );

    } else {

        localStorage.setItem(

            "theme",

            "dark"

        );

    }

};

// ==========================================
// Scroll Top
// ==========================================

const scrollTopBtn =
document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {

        scrollTopBtn.style.display = "block";

    }

    else {

        scrollTopBtn.style.display = "none";

    }

});

scrollTopBtn.onclick = () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

};

// ==========================================
// Loader
// ==========================================

const loader =
document.getElementById("loader");

function showLoader() {

    loader.classList.add("active");

}

function hideLoader() {

    loader.classList.remove("active");

}

// ==========================================
// Generate Resume
// ==========================================

generateBtn.onclick = () => {

    showLoader();

    setTimeout(() => {

        hideLoader();

        saveResume();

        showToast(

            "Resume Generated Successfully"

        );

    }, 1200);

};

// ==========================================
// Load Saved Data
// ==========================================

window.addEventListener("load", () => {

    loadTheme();

    loadResume();

});

console.log("Storage System Loaded");/*=========================================
 ResumeCraft Pro v2.0
 JavaScript Part 4
 ATS + Print + PDF + Validation
==========================================*/

// ==========================================
// ATS Score
// ==========================================

const atsScore = document.getElementById("atsScore");
const checkATSBtn = document.getElementById("checkATS");

function calculateATS() {

    let score = 0;

    if (resumeData.personal.fullName.trim() !== "") score += 10;
    if (resumeData.personal.jobTitle.trim() !== "") score += 10;
    if (resumeData.personal.email.trim() !== "") score += 10;
    if (resumeData.personal.phone.trim() !== "") score += 10;
    if (resumeData.personal.summary.trim().length > 50) score += 15;

    if (resumeData.skills.length >= 5) score += 15;

    if (resumeData.education.length >= 1) score += 10;

    if (resumeData.experience.length >= 1) score += 10;

    if (resumeData.projects.length >= 1) score += 10;

    score = Math.min(score, 100);

    atsScore.textContent = score + "%";

    return score;
}

checkATSBtn.addEventListener("click", () => {

    const score = calculateATS();

    if (score >= 90) {

        showToast("Excellent ATS Resume ✅");

    } else if (score >= 70) {

        showToast("Good Resume 👍");

    } else {

        showToast("Improve Your Resume ⚠");

    }

});

// ==========================================
// Resume Validation
// ==========================================

function validateResume() {

    let errors = [];

    if (!resumeData.personal.fullName)
        errors.push("Enter your name.");

    if (!resumeData.personal.email)
        errors.push("Enter email.");

    if (!resumeData.personal.phone)
        errors.push("Enter phone.");

    if (resumeData.skills.length === 0)
        errors.push("Add at least one skill.");

    if (resumeData.education.length === 0)
        errors.push("Add education.");

    return errors;
}

// ==========================================
// Print Resume
// ==========================================

const printBtn = document.getElementById("printResumeBtn");

printBtn.addEventListener("click", () => {

    const errors = validateResume();

    if (errors.length > 0) {

        alert(errors.join("\n"));

        return;

    }

    window.print();

});

// ==========================================
// PDF Download
// ==========================================

const pdfBtn = document.getElementById("downloadResumePDF");

pdfBtn.addEventListener("click", () => {

    const resume = document.getElementById("resumePaper");

    if (typeof html2pdf === "undefined") {

        alert("html2pdf library missing.");

        return;

    }

    html2pdf()

        .from(resume)

        .set({

            margin: 0.3,

            filename: "ResumeCraft.pdf",

            image: {

                type: "jpeg",

                quality: 1

            },

            html2canvas: {

                scale: 2

            },

            jsPDF: {

                unit: "in",

                format: "a4",

                orientation: "portrait"

            }

        })

        .save();

});

// ==========================================
// Resume Statistics
// ==========================================

function refreshStatistics() {

    skillCount.textContent = resumeData.skills.length;

    projectCount.textContent = resumeData.projects.length;

    educationCount.textContent = resumeData.education.length;

    experienceCount.textContent = resumeData.experience.length;

}

setInterval(refreshStatistics, 1000);

// ==========================================
// Word Counter
// ==========================================

function countWords(text) {

    return text
        .trim()
        .split(/\s+/)
        .filter(word => word !== "")
        .length;

}

summary.addEventListener("input", () => {

    const words = countWords(summary.value);

    console.log("Summary Words:", words);

});

// ==========================================
// Auto ATS Update
// ==========================================

setInterval(() => {

    calculateATS();

}, 2000);

// ==========================================
// Resume Completion
// ==========================================

function getCompletionPercentage() {

    let total = 8;

    let completed = 0;

    if (resumeData.personal.fullName) completed++;
    if (resumeData.personal.jobTitle) completed++;
    if (resumeData.personal.email) completed++;
    if (resumeData.personal.phone) completed++;
    if (resumeData.personal.summary) completed++;
    if (resumeData.skills.length) completed++;
    if (resumeData.education.length) completed++;
    if (resumeData.projects.length) completed++;

    return Math.round((completed / total) * 100);

}

setInterval(() => {

    console.log(
        "Resume Completion:",
        getCompletionPercentage() + "%"
    );

}, 3000);

console.log("ATS Module Loaded");/*=========================================
 ResumeCraft Pro v2.0
 JavaScript Part 5 (FINAL)
 AI + Final Features
==========================================*/

// ==========================================
// Gemini API
// ==========================================

const GEMINI_API_KEY = "PASTE_YOUR_GEMINI_API_KEY_HERE";

const AI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

// ==========================================
// Generate AI Summary
// ==========================================

async function generateAISummary(){

const prompt=document.getElementById("aiPrompt").value;

if(prompt==""){

showToast("Enter Prompt");

return;

}

showLoader();

try{

const response=await fetch(AI_URL,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

contents:[{

parts:[{

text:
`Write a professional resume summary.

User:

${prompt}`

}]

}]

})

});

const data=await response.json();

hideLoader();

const result=

data.candidates[0].content.parts[0].text;

summary.value=result;

updatePersonalData();

showToast("AI Summary Generated");

showSuccessPopup();

}

catch(e){

hideLoader();

console.error(e);

showToast("AI Error");

}

}

// ==========================================
// AI Button
// ==========================================

const generateAIBtn=

document.getElementById("generateAI");

if(generateAIBtn){

generateAIBtn.onclick=generateAISummary;

}

// ==========================================
// Success Popup
// ==========================================

const popup=

document.getElementById("successPopup");

const closePopup=

document.getElementById("closePopup");

function showSuccessPopup(){

popup.classList.add("active");

}

if(closePopup){

closePopup.onclick=()=>{

popup.classList.remove("active");

};

}

// ==========================================
// AI Modal
// ==========================================

const aiModal=

document.getElementById("aiModal");

const openAI=

document.getElementById("openAI");

const closeAI=

document.querySelector(".close-modal");

if(openAI){

openAI.onclick=()=>{

aiModal.classList.add("active");

};

}

if(closeAI){

closeAI.onclick=()=>{

aiModal.classList.remove("active");

};

}

window.onclick=function(e){

if(e.target==aiModal){

aiModal.classList.remove("active");

}

};

// ==========================================
// Resume Completion Progress
// ==========================================

function updateCompletionBar(){

const progress=

getCompletionPercentage();

console.log(

"Resume Completion:",

progress+"%"

);

}

// ==========================================
// Auto Save Every 30 Seconds
// ==========================================

setInterval(()=>{

saveResume();

},30000);

// ==========================================
// Keyboard Shortcut
// Ctrl + S
// ==========================================

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="s"){

e.preventDefault();

saveResume();

showToast("Resume Saved");

}

});

// ==========================================
// Welcome Message
// ==========================================

window.addEventListener("load",()=>{

setTimeout(()=>{

showToast(

"Welcome to ResumeCraft Pro"

);

},1200);

});

// ==========================================
// Footer Year
// ==========================================

const footerYear=

document.getElementById("year");

if(footerYear){

footerYear.innerText=

new Date().getFullYear();

}

// ==========================================
// Auto Update
// ==========================================

setInterval(()=>{

updateCompletionBar();

},5000);

console.log("ResumeCraft Pro v2.0 Loaded Successfully");