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
bind("education", "preview-education", "Your Education");
bind("skills", "preview-skills", "Your Skills");
bind("experience", "preview-experience", "Your Experience");

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

if(addSkill){

addSkill.addEventListener("click",function(){

const value=skillInput.value.trim();

if(value==="") return;

const li=document.createElement("li");

li.textContent=value;

previewSkills.appendChild(li);

skillInput.value="";

});

}// ===============================
// Dynamic Education
// ===============================

const educationInput = document.getElementById("educationInput");

const addEducation = document.getElementById("addEducation");

const previewEducation = document.getElementById("preview-education");

if(addEducation){

addEducation.addEventListener("click",function(){

const value = educationInput.value.trim();

if(value==="") return;

const li=document.createElement("li");

li.textContent=value;

previewEducation.appendChild(li);

educationInput.value="";

});

}