function bind(inputId, previewId, placeholder) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    input.addEventListener("input", () => {
        preview.textContent = input.value || placeholder;
    });
}

bind("name", "preview-name", "Your Name");
bind("email", "preview-email", "Email Address");
bind("phone", "preview-phone", "Phone Number");
bind("about", "preview-about", "Write something about yourself...");
bind("skills", "preview-skills", "Your Skills");
bind("education", "preview-education", "Your Education");
bind("experience", "preview-experience", "Your Experience");

document.getElementById("downloadBtn").addEventListener("click", function () {

    const element = document.getElementById("resume");

    const options = {
        margin: 0.5,
        filename: "Resume.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: {
            scale: 2
        },
        jsPDF: {
            unit: "in",
            format: "a4",
            orientation: "portrait"
        }
    };

    html2pdf().set(options).from(element).save();

});