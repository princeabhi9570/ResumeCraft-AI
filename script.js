const storageKey = 'resumeCraftData';
const loader = document.getElementById('loader');
const toast = document.getElementById('toast');
const resumePaper = document.getElementById('resumePaper');
const themeToggle = document.getElementById('themeToggle');
const summaryInput = document.getElementById('summary');
const summaryCount = document.getElementById('summaryCount');
const targetRoleInput = document.getElementById('targetRole');
const aiOutput = document.getElementById('aiOutput');
const atsScoreEl = document.getElementById('atsScore');
const atsStatsEl = document.getElementById('atsStats');
const atsTipsEl = document.getElementById('atsTips');
const progressBar = document.getElementById('progressBar');
const fontFamily = document.getElementById('fontFamily');
const fontSize = document.getElementById('fontSize');
const fontSizeValue = document.getElementById('fontSizeValue');
const lineSpacing = document.getElementById('lineSpacing');
const lineSpacingValue = document.getElementById('lineSpacingValue');
const swatches = document.querySelectorAll('.swatch');
const templateItems = document.querySelectorAll('.template-item');

const fieldMap = [
  ['name', 'previewName', 'Your Name'],
  ['jobTitle', 'previewJobTitle', 'Professional Title'],
  ['email', 'previewEmail', 'example@email.com'],
  ['phone', 'previewPhone', '+91 9876543210'],
  ['address', 'previewAddress', 'Your Address'],
  ['linkedin', 'previewLinkedin', 'linkedin.com/in/username'],
  ['github', 'previewGithub', 'github.com/username'],
  ['portfolio', 'previewPortfolio', 'portfolio.com'],
  ['website', 'previewWebsite', 'yourwebsite.com'],
  ['summary', 'previewSummary', 'Write a sharp, results-focused summary that highlights your strengths, achievements, and domain expertise.']
];

const listSections = [
  { containerId: 'skillsContainer', previewId: 'previewSkills', placeholder: 'Enter a skill', defaultValue: '' },
  { containerId: 'educationContainer', previewId: 'previewEducation', placeholder: 'Enter education', defaultValue: '' },
  { containerId: 'experienceContainer', previewId: 'previewExperience', placeholder: 'Enter experience', defaultValue: '' },
  { containerId: 'projectContainer', previewId: 'previewProjects', placeholder: 'Enter project', defaultValue: '' },
  { containerId: 'certificationContainer', previewId: 'previewCertifications', placeholder: 'Enter certification', defaultValue: '' },
  { containerId: 'languageContainer', previewId: 'previewLanguages', placeholder: 'Enter language', defaultValue: '' },
  { containerId: 'achievementContainer', previewId: 'previewAchievements', placeholder: 'Enter achievement', defaultValue: '' },
  { containerId: 'interestContainer', previewId: 'previewInterests', placeholder: 'Enter interest', defaultValue: '' },
  { containerId: 'referenceContainer', previewId: 'previewReferences', placeholder: 'Enter reference', defaultValue: '' }
];

window.addEventListener('load', () => {
  setTimeout(() => { loader.style.display = 'none'; }, 700);
  initializeLists();
  bindInputs();
  bindSectionToggles();
  bindActions();
  loadData();
  updateResumeDisplay();
  calculateATS();
  applyTheme();
});

function showToast(message) {
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}

function saveData() {
  const data = {
    fields: {},
    lists: {},
    toggles: {},
    theme: document.body.classList.contains('dark'),
    template: resumePaper.classList.contains('modern') ? 'modern' : resumePaper.className.split(' ').find(c => ['modern','ats','corporate','creative','minimal'].includes(c)) || 'modern',
    fontFamily: fontFamily.value,
    fontSize: fontSize.value,
    lineSpacing: lineSpacing.value,
    accentColor: document.querySelector('.swatch.active')?.dataset.color || '#2563eb'
  };

  fieldMap.forEach(([id, previewId, fallback]) => {
    const input = document.getElementById(id);
    if (input) {
      data.fields[id] = input.value;
    }
  });

  listSections.forEach(section => {
    const container = document.getElementById(section.containerId);
    const values = Array.from(container.querySelectorAll('input'))
      .map(item => item.value.trim())
      .filter(Boolean);
    data.lists[section.containerId] = values;
  });

  document.querySelectorAll('input[type="checkbox"][data-section]').forEach(box => {
    data.toggles[box.dataset.section] = box.checked;
  });

  localStorage.setItem(storageKey, JSON.stringify(data));
}

function loadData() {
  const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
  if (!saved) return;

  fieldMap.forEach(([id]) => {
    const input = document.getElementById(id);
    if (input && saved.fields?.[id] !== undefined) {
      input.value = saved.fields[id];
    }
  });

  listSections.forEach(section => {
    const container = document.getElementById(section.containerId);
    const preview = document.getElementById(section.previewId);
    const values = saved.lists?.[section.containerId] || [];
    renderList(container, preview, section.placeholder, values);
  });

  document.querySelectorAll('input[type="checkbox"][data-section]').forEach(box => {
    const checked = saved.toggles?.[box.dataset.section];
    box.checked = checked !== undefined ? checked : true;
    const section = document.getElementById(`${box.dataset.section}Section`);
    if (section) section.style.display = box.checked ? '' : 'none';
  });

  if (saved.theme) document.body.classList.add('dark');
  if (saved.template) setTemplate(saved.template);
  if (saved.fontFamily) fontFamily.value = saved.fontFamily;
  if (saved.fontSize) { fontSize.value = saved.fontSize; fontSizeValue.textContent = `${saved.fontSize}px`; }
  if (saved.lineSpacing) { lineSpacing.value = saved.lineSpacing; lineSpacingValue.textContent = saved.lineSpacing; }
  if (saved.accentColor) {
    document.documentElement.style.setProperty('--primary', saved.accentColor);
    document.documentElement.style.setProperty('--secondary', saved.accentColor);
    document.querySelectorAll('.swatch').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.color === saved.accentColor);
    });
  }

  updateResumeDisplay();
  calculateATS();
}

function bindInputs() {
  fieldMap.forEach(([id, previewId, fallback]) => {
    const input = document.getElementById(id);
    const preview = document.getElementById(previewId);
    if (!input || !preview) return;
    input.addEventListener('input', () => {
      if (id === 'summary') {
        preview.textContent = input.value.trim() || fallback;
        summaryCount.textContent = input.value.length;
      } else {
        preview.textContent = input.value.trim() || fallback;
      }
      saveData();
      calculateATS();
      updateResumeDisplay();
    });
  });

  const photoInput = document.getElementById('photo');
  const previewPhoto = document.getElementById('previewPhoto');
  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      previewPhoto.src = reader.result;
      saveData();
    };
    reader.readAsDataURL(file);
  });

  fontFamily.addEventListener('change', () => {
    resumePaper.style.fontFamily = fontFamily.value;
    saveData();
  });
  fontSize.addEventListener('input', () => {
    fontSizeValue.textContent = `${fontSize.value}px`;
    resumePaper.style.fontSize = `${fontSize.value}px`;
    saveData();
  });
  lineSpacing.addEventListener('input', () => {
    lineSpacingValue.textContent = lineSpacing.value;
    resumePaper.style.lineHeight = lineSpacing.value;
    saveData();
  });
  swatches.forEach(btn => {
    btn.addEventListener('click', () => {
      swatches.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const color = btn.dataset.color;
      document.documentElement.style.setProperty('--primary', color);
      document.documentElement.style.setProperty('--secondary', color);
      saveData();
    });
  });
}

function initializeLists() {
  listSections.forEach(section => {
    const container = document.getElementById(section.containerId);
    const preview = document.getElementById(section.previewId);
    renderList(container, preview, section.placeholder, []);
  });
}

function renderList(container, preview, placeholder, values = []) {
  container.innerHTML = '';
  preview.innerHTML = '';
  const items = values.length ? values : [''];
  items.forEach((value, index) => {
    const row = document.createElement('div');
    row.className = 'dynamic-row';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholder;
    input.value = value;
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'remove-btn';
    remove.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    row.append(input, remove);
    container.appendChild(row);

    input.addEventListener('input', () => {
      renderList(container, preview, placeholder, getValues(container));
      saveData();
      calculateATS();
    });
    remove.addEventListener('click', () => {
      row.remove();
      renderList(container, preview, placeholder, getValues(container));
      saveData();
      calculateATS();
    });
  });
  updatePreviewList(preview, getValues(container));
}

function getValues(container) {
  return Array.from(container.querySelectorAll('input')).map(item => item.value.trim()).filter(Boolean);
}

function updatePreviewList(preview, values) {
  preview.innerHTML = '';
  if (!values.length) return;
  const list = document.createElement('ul');
  values.forEach(value => {
    const item = document.createElement('li');
    item.className = 'preview-item';
    item.textContent = value;
    list.appendChild(item);
  });
  preview.appendChild(list);
}

function bindSectionToggles() {
  document.querySelectorAll('input[type="checkbox"][data-section]').forEach(box => {
    box.addEventListener('change', () => {
      const section = document.getElementById(`${box.dataset.section}Section`);
      if (section) section.style.display = box.checked ? '' : 'none';
      saveData();
    });
  });
}

function bindActions() {
  document.getElementById('addSkill').addEventListener('click', () => addListItem('skillsContainer', 'previewSkills', 'Enter a skill'));
  document.getElementById('addEducation').addEventListener('click', () => addListItem('educationContainer', 'previewEducation', 'Enter education'));
  document.getElementById('addExperience').addEventListener('click', () => addListItem('experienceContainer', 'previewExperience', 'Enter experience'));
  document.getElementById('addProject').addEventListener('click', () => addListItem('projectContainer', 'previewProjects', 'Enter project'));
  document.getElementById('addCertification').addEventListener('click', () => addListItem('certificationContainer', 'previewCertifications', 'Enter certification'));
  document.getElementById('addLanguage').addEventListener('click', () => addListItem('languageContainer', 'previewLanguages', 'Enter language'));
  document.getElementById('addAchievement').addEventListener('click', () => addListItem('achievementContainer', 'previewAchievements', 'Enter achievement'));
  document.getElementById('addInterest').addEventListener('click', () => addListItem('interestContainer', 'previewInterests', 'Enter interest'));
  document.getElementById('addReference').addEventListener('click', () => addListItem('referenceContainer', 'previewReferences', 'Enter reference'));

  document.getElementById('generateSummary').addEventListener('click', () => {
    const role = targetRoleInput.value.trim();
    const text = role ? `Results-focused ${role} professional with strong execution, stakeholder communication, and delivery discipline.` : 'Results-focused professional with strong execution, stakeholder communication, and delivery discipline.';
    summaryInput.value = text;
    document.getElementById('previewSummary').textContent = text;
    summaryCount.textContent = text.length;
    saveData();
    calculateATS();
  });

  document.getElementById('tailorResume').addEventListener('click', () => {
    const role = targetRoleInput.value.trim() || 'target role';
    const text = `Tailored for ${role}: emphasizing delivery, collaboration, measurable impact, and domain-relevant achievements.`;
    summaryInput.value = text;
    document.getElementById('previewSummary').textContent = text;
    summaryCount.textContent = text.length;
    saveData();
    calculateATS();
  });

  document.getElementById('optimizeATS').addEventListener('click', () => {
    const role = targetRoleInput.value.trim() || 'your target role';
    const skills = getSuggestedKeywords();
    const currentSummary = summaryInput.value.trim();
    const optimizedSummary = currentSummary.length > 40
      ? `${currentSummary} Experienced in ${skills.slice(0, 3).join(', ')} with a strong record of delivering measurable outcomes.`
      : `Results-driven ${role} professional with experience in ${skills.slice(0, 3).join(', ')} and a strong record of delivering measurable outcomes.`;
    summaryInput.value = optimizedSummary;
    document.getElementById('previewSummary').textContent = optimizedSummary;
    summaryCount.textContent = optimizedSummary.length;
    saveData();
    calculateATS();
    aiOutput.textContent = `ATS-ready summary generated for ${role}.`;
  });
  document.getElementById('generateBullet').addEventListener('click', () => {
    const role = targetRoleInput.value.trim() || 'professional';
    const skills = getSuggestedKeywords();
    const bullet = `Delivered measurable impact in ${role} by combining ${skills.slice(0, 3).join(', ')} with strong execution and stakeholder communication.`;
    aiOutput.textContent = `Suggested bullet: ${bullet}`;
  });
  document.getElementById('suggestKeywords').addEventListener('click', () => {
    const keywords = getSuggestedKeywords();
    aiOutput.textContent = `Suggested keywords: ${keywords.join(', ')}.`;
  });

  document.getElementById('downloadResumePDF').addEventListener('click', () => {
    const opt = { margin: 0.2, filename: 'resume.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
    html2pdf().set(opt).from(resumePaper).save();
    showToast('PDF download started');
  });

  document.getElementById('printResume').addEventListener('click', () => {
    window.print();
  });

  document.getElementById('resetResume').addEventListener('click', () => {
    if (confirm('Reset all resume fields?')) {
      localStorage.removeItem(storageKey);
      location.reload();
    }
  });

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    saveData();
  });

  templateItems.forEach(item => {
    item.addEventListener('click', () => {
      templateItems.forEach(t => t.classList.remove('active'));
      item.classList.add('active');
      setTemplate(item.dataset.template);
      saveData();
    });
  });
}

function addListItem(containerId, previewId, placeholder) {
  const container = document.getElementById(containerId);
  const preview = document.getElementById(previewId);
  const row = document.createElement('div');
  row.className = 'dynamic-row';
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = placeholder;
  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'remove-btn';
  remove.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  row.append(input, remove);
  container.appendChild(row);
  input.addEventListener('input', () => {
    updatePreviewList(preview, getValues(container));
    saveData();
    calculateATS();
  });
  remove.addEventListener('click', () => {
    row.remove();
    updatePreviewList(preview, getValues(container));
    saveData();
    calculateATS();
  });
  updatePreviewList(preview, getValues(container));
}

function setTemplate(template) {
  resumePaper.className = `resume-paper ${template}`;
  templateItems.forEach(item => item.classList.toggle('active', item.dataset.template === template));
}

function getSuggestedKeywords() {
  const roleText = targetRoleInput.value.toLowerCase();
  const skillText = Array.from(document.querySelectorAll('#skillsContainer input'))
    .map(input => input.value.toLowerCase())
    .join(' ');
  const text = `${roleText} ${skillText}`;
  const keywordPool = ['leadership', 'strategy', 'execution', 'analytics', 'collaboration', 'communication', 'problem solving', 'stakeholder management', 'delivery', 'product', 'design', 'development'];
  const matched = keywordPool.filter(keyword => text.includes(keyword));
  return matched.length ? matched : ['leadership', 'strategy', 'execution', 'collaboration'];
}

function calculateATS() {
  let score = 20;
  const text = [
    summaryInput.value,
    targetRoleInput.value,
    document.getElementById('name').value,
    document.getElementById('email').value,
    document.getElementById('phone').value,
    document.getElementById('address').value
  ].join(' ').toLowerCase();

  if (text.includes('react') || text.includes('javascript') || text.includes('node') || text.includes('python')) score += 12;
  if (summaryInput.value.trim().length > 60) score += 12;
  if (document.getElementById('skillsContainer').querySelectorAll('input').length >= 2) score += 10;
  if (document.getElementById('experienceContainer').querySelectorAll('input').length >= 1) score += 10;
  if (document.getElementById('educationContainer').querySelectorAll('input').length >= 1) score += 8;
  if (document.getElementById('projectContainer').querySelectorAll('input').length >= 1) score += 8;
  if (document.getElementById('certificationContainer').querySelectorAll('input').length >= 1) score += 6;
  if (document.getElementById('targetRole').value.trim()) score += 6;
  score = Math.min(100, score);

  atsScoreEl.textContent = `${score}%`;
  progressBar.style.width = `${score}%`;
  atsStatsEl.innerHTML = `Strong structure • ${score >= 80 ? 'Excellent' : 'Needs refinement'} • Tailor keywords to the role`;

  const tips = [];
  if (!summaryInput.value.trim()) tips.push('Add a concise professional summary.');
  if (!targetRoleInput.value.trim()) tips.push('Mention a target role to tailor the resume.');
  if (document.getElementById('skillsContainer').querySelectorAll('input').length < 3) tips.push('Add more skills for stronger keyword coverage.');
  if (document.getElementById('experienceContainer').querySelectorAll('input').length < 1) tips.push('Include at least one relevant experience entry.');
  if (document.getElementById('projectContainer').querySelectorAll('input').length < 1) tips.push('Show projects to reinforce hands-on experience.');
  if (score < 80) tips.push('Use measurable achievements and role-specific keywords.');
  if (tips.length === 0) tips.push('Your resume is looking ATS-ready.');
  atsTipsEl.innerHTML = tips.map(tip => `<li>${tip}</li>`).join('');
}

function updateResumeDisplay() {
  const photoInput = document.getElementById('photo');
  const previewPhoto = document.getElementById('previewPhoto');
  if (photoInput.files && photoInput.files[0]) {
    previewPhoto.src = previewPhoto.src || '';
  }
}

function applyTheme() {
  if (document.body.classList.contains('dark')) {
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}
