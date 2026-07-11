// ===============================
// Live Resume Preview
// ===============================

function bind(inputId, previewId, placeholder) {

    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    if (!input || !preview) return;

    input.addEventListener("input", function () {

        if (input.value.trim() === "") {
            preview.textContent = placeholder;
        } else {
            preview.textContent = input.value;
        }

    });

}

bind("name", "preview-name", "Your Name");
bind("email", "preview-email", "Email Address");
bind("phone", "preview-phone", "Phone Number");
bind("location", "preview-location", "Your Location");
bind("about", "preview-about", "Write something about yourself...");


// ===============================
// Profile Photo Upload
// ===============================

const photoInput = document.getElementById("photo");

if (photoInput) {

    photoInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {

            document.getElementById("preview-photo").src = e.target.result;

        };

        reader.readAsDataURL(file);

    });

}

// ===============================
// Download Resume PDF
// ===============================

const downloadBtn = document.getElementById("downloadBtn");

if (downloadBtn) {

    downloadBtn.addEventListener("click", function () {

        const resume = document.getElementById("resume");

        if (!resume) {
            alert("Resume section not found.");
            return;
        }

        const opt = {

            margin: 0,

            filename: "ResumeCraftAI-Resume.pdf",

            image: {
                type: "jpeg",
                quality: 1
            },

            html2canvas: {

                scale: 3,

                useCORS: true,

                allowTaint: true,

                scrollY: 0

            },

            jsPDF: {

                unit: "mm",

                format: "a4",

                orientation: "portrait"

            }

        };

        html2pdf()
            .set(opt)
            .from(resume)
            .save();

    });

}// ===============================
// Dynamic Skills
// ===============================

const skillInput = document.getElementById("skillInput");
const addSkill = document.getElementById("addSkill");
const previewSkills = document.getElementById("preview-skills");

if (addSkill) {

    addSkill.addEventListener("click", function () {

        const value = skillInput.value.trim();

        if (value === "") return;

        const li = document.createElement("li");

        li.innerHTML = `
            ${value}
            <button class="delete-btn">❌</button>
        `;

        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
        });

        previewSkills.appendChild(li);

        skillInput.value = "";

    });

}

// ===============================
// Dynamic Education
// ===============================

const educationInput = document.getElementById("educationInput");
const addEducation = document.getElementById("addEducation");
const previewEducation = document.getElementById("preview-education");

if (addEducation) {

    addEducation.addEventListener("click", function () {

        const value = educationInput.value.trim();

        if (value === "") return;

        const li = document.createElement("li");

        li.innerHTML = `
            ${value}
            <button class="delete-btn">❌</button>
        `;

        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
        });

        previewEducation.appendChild(li);

        educationInput.value = "";

    });

}


// ===============================
// Dynamic Experience
// ===============================

const experienceInput = document.getElementById("experienceInput");
const addExperience = document.getElementById("addExperience");
const previewExperience = document.getElementById("preview-experience");

if (addExperience) {

    addExperience.addEventListener("click", function () {

        const value = experienceInput.value.trim();

        if (value === "") return;

        const li = document.createElement("li");

        li.innerHTML = `
            ${value}
            <button class="delete-btn">❌</button>
        `;

        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
        });

        previewExperience.appendChild(li);

        experienceInput.value = "";

    });

}// ===============================
// AUTO SAVE
// ===============================

const fields = [
"name",
"email",
"phone",
"location",
"about"
];

fields.forEach(function(id){

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

input.addEventListener("input",function(){

localStorage.setItem(id,input.value);

});

});// ===============================
// RESET
// ===============================

const resetBtn=document.getElementById("resetBtn");

if(resetBtn){

resetBtn.addEventListener("click",function(){

localStorage.clear();

location.reload();

});

}// ===============================
// Template Switcher
// ===============================

const templateButtons=document.querySelectorAll(".template-btn");

const resume=document.getElementById("resume");

templateButtons.forEach(button=>{

button.addEventListener("click",()=>{

resume.classList.remove("modern");
resume.classList.remove("classic");
resume.classList.remove("corporate");

resume.classList.add(button.dataset.template);

});

});// Template Switch

// ===============================
// Template Gallery
// ===============================

const templateItems = document.querySelectorAll(".template-item");

const resume = document.getElementById("resume");

templateItems.forEach(item => {

    item.addEventListener("click", () => {

        resume.className = "preview";

        resume.classList.add(item.dataset.template);

    });

});

}// ===============================
// Dynamic Experience
// ===============================

const experienceInput = document.getElementById("experienceInput");
const addExperience = document.getElementById("addExperience");
const previewExperience = document.getElementById("preview-experience");

if (addExperience) {

    addExperience.addEventListener("click", function () {

        const value = experienceInput.value.trim();

        if (value === "") return;

        const li = document.createElement("li");

        li.innerHTML = `
            ${value}
            <button class="delete-btn">❌</button>
        `;

        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
        });

        previewExperience.appendChild(li);

        experienceInput.value = "";

    });

}