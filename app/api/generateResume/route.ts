import { ResumeData } from "@/app/models";
import Chromium from "@sparticuz/chromium-min";
import { parse } from "node-html-parser";
import puppeteer from "puppeteer-core";
function generateHtmlContent(rData: ResumeData) {
    // Implementation for generating HTML content
    const themeColor = rData.theme || 'slate';
    const root = parse(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Resume</title>
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body>
    <div class="container w-full mx-auto p-6">
    </div>
</body>
</html>`);
const container = root.querySelector("div")!;
if (rData?.heading) {
    const heading = parse(`<div class="w-full bg-${themeColor}-600 p-4 shadow-sm shadow-black-300 rounded-t-lg">
        <h1 class="text-3xl font-bold text-white">${rData.heading.name}</h1>
        <h2 class="text-md font-semibold text-white ml-auto">${rData.heading.title}</h2>
    </div>`);
    container.appendChild(heading);
}
// Appened left and right panel
container.appendChild(parse(`<div id="resume-body" class="flex w-full"></div>`));
const resumeBody = root.getElementById("resume-body");

// Prepare left panel
resumeBody?.appendChild(parse(`<div id="left-panel" class="w-[30%] bg-${themeColor}-500 rounded-bl-lg"></div>`));
const leftPanel = root.getElementById("left-panel");
// prepare contact detail
leftPanel?.appendChild(parse(`<section id="contact-detail" class="m-4 pb-4"></section>`));
const contactDetail = root.getElementById("contact-detail");
contactDetail?.appendChild(parse(`<h2 class="text-xl font-bold text-white border-b border-white">${rData.contactInfo.title ?? 'Contact Information'}</h2>`));
if (rData.contactInfo.email) {
    contactDetail?.appendChild(parse(`<p class="text-white text-sm"><span>&#x2709;</span><br/> ${rData.contactInfo.email}</p>`));
}
if (rData.contactInfo.phone) {
    contactDetail?.appendChild(parse(`<p class="text-white text-sm"><span>&#x1F4DE;</span><br/> ${rData.contactInfo.phone}</p>`));
}
if (rData.contactInfo.location) {
    contactDetail?.appendChild(parse(`<p class="text-white text-sm"><span>&#x1F30E;</span><br/> ${rData.contactInfo.location}</p>`));
}
if (rData.contactInfo.profileLink) {
    contactDetail?.appendChild(parse(`<p class="text-white text-sm"><span>&#128279;</span><br/> <a href="${rData.contactInfo.profileLink}" target="_blank">${rData.contactInfo.linkTitle ?? 'Profile'}</a></p>`));
}
//leftPanel.appendChild(contactDetail);

// Prepare skill set
leftPanel?.appendChild(parse(`<section id="skills-set" class="m-4 pb-4 text-white"></section>`));
const skillsSet = root.getElementById("skills-set");
skillsSet?.appendChild(parse(`<h2 class="text-xl font-bold text-white border-b border-white">
                       ${rData.skills.title ?? 'Skills'}
                    </h2>`))
let skillItems = `<ul class="list-disc list-inside">`
rData.skills.skillGroups?.forEach((skill) => {
    skillItems += `<li class="text-white">${skill.title}<br/><em class="text-sm">${skill.level}</em></li>`;
});
skillItems += `</ul>`;
skillsSet?.appendChild(parse(skillItems));
//leftPanel.appendChild(skillsSet);

resumeBody?.appendChild(parse(`<div id="right-panel" class="w-[70%] p-4 bg-${themeColor}-100 rounded-br-lg text-sm"></div>`));
const rightPanel = root.getElementById("right-panel");
// Prepare summary
rightPanel?.appendChild(parse(`<section id="summary" class="mb-4 p-4"></section>`));
const summary = root.getElementById("summary");
summary?.appendChild(parse(`<h2 class="text-xl font-bold border-b border-${themeColor}-600">${rData.professionalSummary.title ?? 'Professional Summary'}</h2>`));
summary?.appendChild(parse(`<p>${rData.professionalSummary.description}</p>`));
//rightPanel.appendChild(summary);

// Prepare Experience
if (rData.experience) {
    rightPanel?.appendChild(parse(`<section id="experience" class="mb-4 p-4"></section>`));
    const experience = root.getElementById("experience");
    experience?.appendChild(parse(`<h2 class="text-xl font-bold border-b border-${themeColor}-600">${rData.experience.title ?? 'Professional Experience'}</h2>`));
    // Append experience items here
    let experienceItems = '';
    rData.experience.experienceSet?.forEach((item) => {
       item.description = item.description.replace('<ul>', '<ul class="list-disc list-inside">');
       item.description = item.description.replaceAll('&nbsp;', ' ');
        experienceItems += `<h3 class="text-md font-bold">${item.position} – ${item.company}</h3>
                    <p class="text-md"><em>${item.from} – ${item.to?? 'Present'} | ${item.location}</em></p>
                    <p class="text-md">${item.description}</p>`;
    });
    experience?.appendChild(parse(experienceItems));
    //rightPanel.appendChild(experience);
}
if (rData.education) {
    rightPanel?.appendChild(parse(`<section id="education" class="mb-4  p-4"></section>`));
    const education = root.getElementById("education");
    education?.appendChild(parse(`<h2 class="text-xl font-bold border-b border-${themeColor}-600">${rData.education.title ?? 'Education'}</h2>`));
    // Append education items here
    let educationItems = '';
    rData.education.list?.forEach((item) => {
        educationItems += `<h3 class="text-md font-bold">${item.degree} – ${item.name}</h3>
                    <p class="text-md"><em>${item.from} – ${item.to ?? 'Present'}</em></p>`;
        if (item.marks) {
            educationItems += `<p>${item.marks}</p>`;
        }
    });
    education?.appendChild(parse(educationItems));
    //rightPanel.appendChild(education);
}
if (rData.achievement) {
    rightPanel?.appendChild(parse(`<section id="achievement" class="mb-4  p-4"></section>`));
    const achievement = root.getElementById("achievement");
    achievement?.appendChild(parse(`<h2 class="text-xl font-bold border-b border-${themeColor}-600">${rData.achievement.title ?? 'Achievements'}</h2>`));
    // Append achievement items here
    let achievementItems = '';
    rData.achievement.list?.forEach((item) => {
        achievementItems += `<h3 class="text-md font-bold">${item.name}</h3>
                    <p class="text-md"><em>${item.organization} – ${item.year}</em></p>`;
    });
    achievement?.appendChild(parse(achievementItems));
    //rightPanel.appendChild(achievement);
}
if (rData.projects) {
    rightPanel?.appendChild(parse(`<section id="projects" class="mb-4  p-4"></section>`));
    const projects = root.getElementById("projects");
    projects?.appendChild(parse(`<h2 class="text-xl font-bold border-b border-${themeColor}-600">${rData.projects.title ?? 'Projects'}</h2>`));
    // Append projects items here
    let projectsItems = '';
    rData.projects.list?.forEach((item) => {
        projectsItems += `<h3 class="text-md font-bold">${item.name}</h3>
                    <p class="text-md">${item.description}</p>`;
        if (item.link) {
            projectsItems += `<p><a href="${item.link}" target="_blank" class="text-blue-500 underline">View Project</a></p>`;
        }
    });
    projects?.appendChild(parse(projectsItems));
    //rightPanel.appendChild(projects);
}

return root.toString();
}

export async function POST(request: Request) {
    let browser;
    try {
        const rData: ResumeData = await request.json();
       // console.log(JSON.stringify(rData));
        const htmlContent = generateHtmlContent(rData);
        //console.log(htmlContent);
        browser = await puppeteer.launch({
        args: Chromium.args,
        //defaultViewport: Chromium.defaultViewport,
        executablePath: await Chromium.executablePath(),
        //headless: Chromium.headless,
    });
        const page = await browser.newPage();
        await page.setContent(htmlContent,{ waitUntil: 'domcontentloaded' });
        const pdfBuffer = await page.pdf({
        //path: './generated-resume.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
            top: '1mm',
            right: '1mm',
            bottom: '1mm',
            left: '1mm'
        },
        preferCSSPageSize: true,
        landscape: false,
        scale: 0.9,
        displayHeaderFooter: false, 
        headerTemplate: '',
        footerTemplate: ''      
    });
        //await browser.close();
        //console.log("PDF generated successfully",pdfBuffer);
        return new Response(pdfBuffer as BodyInit, {
            headers: {
                'Content-Type': 'application/pdf'
            },
            status: 200
        });

    } catch (error) {
        console.error("Error generating resume:", error);
        return new Response("Error generating resume", { status: 500 });
    } finally {
        if (browser) await browser.close();
    }
}