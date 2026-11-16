// Altensor Academy - Frontend API Integration, Mega-Menu & Courses Page

const MEGA_MENU_DATA = {
    proqramlasdirma: [
        {
            id: 1,
            title: "Full-stack Proqramlaşdırma (AI ilə)",
            icon: "fa-solid fa-code",
            iconBg: "rgba(224, 30, 255, 0.14)",
            iconColor: "#C026D3",
            tags: ["Başlanğıc mərhələ", "Karyera inkişafı", "AI İnteqrasiya"]
        }
    ],
    mobil: [
        {
            id: 2,
            title: "Mobil Proqramlaşdırma (iOS & Android)",
            icon: "fa-solid fa-mobile-screen-button",
            iconBg: "rgba(0, 230, 153, 0.16)",
            iconColor: "#059669",
            tags: ["Başlanğıc mərhələ", "Karyera inkişafı"]
        }
    ],
    datascience: [
        {
            id: 3,
            title: "Data Science & Machine Learning",
            icon: "fa-solid fa-brain",
            iconBg: "rgba(255, 138, 0, 0.15)",
            iconColor: "#EA580C",
            tags: ["Başlanğıc mərhələ", "Süni İntellekt"]
        }
    ],
    analitika: [
        {
            id: 4,
            title: "Data Analitika (SQL & Power BI)",
            icon: "fa-solid fa-chart-pie",
            iconBg: "rgba(59, 130, 246, 0.14)",
            iconColor: "#2563EB",
            tags: ["Başlanğıc mərhələ", "Karyera inkişafı"]
        }
    ],
    kids: [
        {
            id: 5,
            title: "Web for Kids (Məktəblilər üçün)",
            icon: "fa-solid fa-gamepad",
            iconBg: "rgba(99, 102, 241, 0.15)",
            iconColor: "#4F46E5",
            tags: ["Başlanğıc mərhələ", "Uşaq və Yeniyetmələr"]
        }
    ],
    biznes: [
        {
            id: 6,
            title: "IT Biznes Analitika",
            icon: "fa-solid fa-briefcase",
            iconBg: "rgba(244, 63, 94, 0.14)",
            iconColor: "#E11D48",
            tags: ["Başlanğıc mərhələ", "Karyera inkişafı"]
        }
    ]
};

const FALLBACK_COURSES = [
    {
        id: 1,
        name: "Full-stack Proqramlaşdırma (AI ilə)",
        category: "Proqramlaşdırma",
        description: "Sıfırdan AI funksiyaları olan tam funksional veb tətbiq qurmaq və canlıya çıxarmaq.",
        lessonDays: "B.ertəsi - Cümə / Şənbə",
        imagePath: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80",
        status: 0
    },
    {
        id: 2,
        name: "Mobil Proqramlaşdırma",
        category: "Mobil İnkşaf",
        description: "Android və iOS platformaları üçün müasir mobil tətbiq və onun C# serverini yazmaq.",
        lessonDays: "B.ertəsi - Cümə / Şənbə",
        imagePath: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=700&q=80",
        status: 0
    },
    {
        id: 3,
        name: "Data Science",
        category: "Süni İntellekt & Data",
        description: "Böyük həcmli datanı Python ilə təhlil etmək, ML modeli qurub API kimi təqdim etmək.",
        lessonDays: "B.ertəsi - Cümə / Şənbə",
        imagePath: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=700&q=80",
        status: 0
    },
    {
        id: 4,
        name: "Data Analitika",
        category: "Analitika",
        description: "Məlumatları SQL ilə çəkmək, modelləşdirmək və Power BI dashboard-ları qurmaq.",
        lessonDays: "B.ertəsi - Cümə / Şənbə",
        imagePath: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80",
        status: 0
    },
    {
        id: 5,
        name: "Web for Kids",
        category: "Uşaqlar Üçün IT",
        description: "Məktəblilər üçün alqoritmik düşüncə, öz saytını, oyununu və viktorinasını yaratmaq.",
        lessonDays: "Həftəiçi / Şənbə",
        imagePath: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=700&q=80",
        status: 0
    },
    {
        id: 6,
        name: "IT Biznes Analitika",
        category: "Biznes & İdarəetmə",
        description: "Biznes tələbini toplamaq, modelləşdirmək və tam texniki tapşırıq (SRS) yazmaq.",
        lessonDays: "B.ertəsi - Cümə / Şənbə",
        imagePath: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=700&q=80",
        status: 0
    }
];

document.addEventListener("DOMContentLoaded", () => {
    updateNavbarAuthUI();
    initMobileMenu();
    initGlobalSearch();
    initFloatingWhatsApp();
    initMegaMenu();
    loadDynamicCourses();
    initCoursesPage();
    initCourseDetailPage();
    initTeachersPage();
});

function initMobileMenu() {
    const btn = document.querySelector(".mobile-menu-btn");
    const menu = document.querySelector(".nav-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("mobile-open");
        btn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    menu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            menu.classList.remove("mobile-open");
            btn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

function initMegaMenu() {
    const catItems = document.querySelectorAll("#megaSidebar .mega-cat-item");
    const grid = document.getElementById("megaCoursesGrid");
    if (!catItems.length || !grid) return;

    function renderMegaCategory(catKey) {
        const items = MEGA_MENU_DATA[catKey] || MEGA_MENU_DATA.proqramlasdirma;
        grid.innerHTML = items.map(item => `
            <a href="courses.html?cat=${encodeURIComponent(catKey)}" class="mega-course-card">
                <div class="mega-course-icon" style="background:${item.iconBg}; color:${item.iconColor};">
                    <i class="${item.icon}"></i>
                </div>
                <div class="mega-course-info">
                    <h4>${escapeHtml(item.title)}</h4>
                    <div class="mega-course-tags">
                        ${item.tags.map(t => `<span class="mega-tag">${escapeHtml(t)}</span>`).join("")}
                    </div>
                </div>
            </a>
        `).join("");
    }

    renderMegaCategory("proqramlasdirma");

    catItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            catItems.forEach(c => c.classList.remove("active"));
            item.classList.add("active");
            const key = item.getAttribute("data-cat") || "proqramlasdirma";
            renderMegaCategory(key);
        });
    });
}

function showPageToast(message, isError = false) {
    let toast = document.getElementById("globalToast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "globalToast";
        toast.style.cssText = `
            position: fixed;
            bottom: 28px;
            right: 28px;
            padding: 15px 22px;
            border-radius: 14px;
            color: #fff;
            font-weight: 600;
            font-size: 0.94rem;
            box-shadow: 0 18px 40px rgba(0,0,0,0.35);
            z-index: 9999;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(toast);
    }
    toast.style.background = isError ? "#991B1B" : "#0F172A";
    toast.style.borderLeft = isError ? "4px solid #EF4444" : "4px solid #10B981";
    toast.textContent = message;
    toast.style.display = "block";

    setTimeout(() => {
        toast.style.display = "none";
    }, 3800);
}

// 1. Update Navbar based on localStorage JWT token
function updateNavbarAuthUI() {
    const navActions = document.querySelector(".nav-actions");
    if (!navActions) return;

    const token = getToken();
    const user = getCurrentUser();

    if (token && user) {
        const searchBtnHtml = `
            <button class="btn-search" aria-label="Axtarış" title="Axtarış">
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>
        `;
        const mobileBtnHtml = `
            <button class="mobile-menu-btn" aria-label="Menyu">
                <i class="fa-solid fa-bars"></i>
            </button>
        `;

        if (user.role === "Admin") {
            navActions.innerHTML = `
                ${searchBtnHtml}
                <a href="admin.html" class="btn-signup" style="background: linear-gradient(135deg, #10B981, #059669); gap: 8px;">
                    <i class="fa-solid fa-gauge-high"></i> Admin Panel
                </a>
                <button onclick="logoutUser()" class="link-login" style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); padding: 10px 18px; border-radius: 9px; cursor: pointer; color: #F87171; font-weight: 700; white-space: nowrap;">
                    Çıxış
                </button>
                ${mobileBtnHtml}
            `;
        } else {
            const displayName = escapeHtml(user.fullName || user.email);
            navActions.innerHTML = `
                ${searchBtnHtml}
                <a href="profile.html" title="Profilim və Müraciətlərim" style="text-decoration: none; font-weight: 600; color: #FFFFFF; font-size: 14px; white-space: nowrap; display: inline-flex; align-items: center; gap: 7px; background: rgba(93, 95, 239, 0.16); padding: 9px 14px; border-radius: 9px; border: 1px solid rgba(129, 140, 248, 0.35); transition: all 0.2s;">
                    <i class="fa-regular fa-circle-user" style="color: #818CF8;"></i>
                    ${displayName}
                </a>
                <button onclick="logoutUser()" class="link-login" style="background: rgba(239, 68, 68, 0.12); border: 1px solid rgba(239, 68, 68, 0.35); padding: 10px 18px; border-radius: 9px; cursor: pointer; color: #F87171; font-weight: 700; white-space: nowrap;">
                    Çıxış
                </button>
                ${mobileBtnHtml}
            `;
        }
    }
}

// 2. Load Courses on index.html
async function loadDynamicCourses() {
    const grid = document.querySelector(".courses-grid");
    if (!grid) return;

    try {
        const res = await fetch(`${API_BASE_URL}/courses`);
        if (!res.ok) return;
        const courses = await res.json();
        if (!Array.isArray(courses) || courses.length === 0) return;

        const categoryStyles = ["cat-purple", "cat-blue", "cat-emerald", "cat-amber", "cat-rose"];

        grid.innerHTML = courses.map((course, idx) => {
            const catClass = categoryStyles[idx % categoryStyles.length];
            const imgUrl = resolveImageUrl(course.imagePath, "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80");
            const isOpen = course.status === 0;

            const statusBadge = isOpen
                ? `<span class="course-status"><span class="status-dot"></span> Qeydiyyat Açıqdır</span>`
                : `<span class="course-status" style="color:#EF4444;"><span class="status-dot" style="background:#EF4444;"></span> Qrup Dolub</span>`;

            const applyButton = isOpen
                ? `<button type="button" onclick="applyToCourse(${Number(course.id)})" class="btn-course-apply" style="border:none; cursor:pointer;">
                     Müraciət Et <i class="fa-solid fa-arrow-right"></i>
                   </button>`
                : `<button type="button" disabled class="btn-course-apply" style="border:none; opacity:0.5; cursor:not-allowed;">
                     Qrup Dolub
                   </button>`;

            return `
                <div class="course-card">
                  <div class="course-thumb">
                    <img src="${imgUrl}" alt="${escapeHtml(course.name)}">
                    <div class="course-thumb-overlay">
                      <div class="course-tech-badge" style="color: #5D5FEF;">
                        <i class="fa-solid fa-laptop-code"></i>
                      </div>
                    </div>
                  </div>
                  <div class="course-body">
                    <span class="course-category ${catClass}">${escapeHtml(course.category)}</span>
                    <h3 class="course-title">${escapeHtml(course.name)}</h3>
                    <p class="course-desc">${escapeHtml(course.description)}</p>
                    <div class="course-meta">
                      <span><i class="fa-regular fa-calendar-check"></i> ${escapeHtml(course.lessonDays)}</span>
                      <span><i class="fa-solid fa-layer-group"></i> 100% Praktiki</span>
                    </div>
                    <div class="course-footer">
                      ${statusBadge}
                      ${applyButton}
                    </div>
                  </div>
                </div>
            `;
        }).join("");
    } catch {
        // Fallback: Keep static brochure courses if backend is offline
    }
}

// 3. Courses Page (courses.html) - Vibrant Study Field Cards + Filter + Detail Modal
let coursesPageData = [];

function getCourseFilterKey(course) {
    const text = `${course.name} ${course.category}`.toLowerCase();
    if (text.includes("kids") || text.includes("uşaq")) return "kids";
    if (text.includes("biznes")) return "biznes";
    if (text.includes("mobil")) return "mobil";
    if (text.includes("data science")) return "datascience";
    if (text.includes("analitika")) return "analitika";
    return "proqramlasdirma";
}

function getCourseModules(course) {
    if (course && typeof course.modules === "string" && course.modules.trim()) {
        const customModules = course.modules
            .split(/\r?\n/)
            .map(m => m.trim())
            .filter(Boolean);
        if (customModules.length > 0) return customModules;
    }

    const key = getCourseFilterKey(course);
    const map = {
        proqramlasdirma: [
            "HTML5, CSS3 & Müasir Responsive Dizayn",
            "JavaScript (ES6+) & Frontend İnteqrasiya",
            "C# & ASP.NET Core Web API",
            "SQL Server & Entity Framework Core",
            "Süni İntellekt (AI) Alətləri ilə Kodlaşdırma",
            "Real Canlı Layihə & Deployment"
        ],
        mobil: [
            "Mobil UI/UX Prinsipləri və Komponentlər",
            "iOS & Android Platforma İnkişafı",
            "C# Backend & RESTful API Qurulması",
            "Verilənlər Bazası və Bildirişlər",
            "Tətbiq Performansı və Test",
            "Play Store / App Store Yayımlama"
        ],
        datascience: [
            "Python Proqramlaşdırma Əsasları",
            "Pandas & NumPy ilə Data Emalı",
            "Statistika və Ehtimal Nəzəriyyəsi",
            "Machine Learning (Maşın Öyrənməsi)",
            "Süni İntellekt Modellərinin Təlimi",
            "Modelin API Kimi Təqdim Edilməsi"
        ],
        analitika: [
            "Data Analitikaya Giriş və Biznes Məntiqi",
            "SQL ilə Məlumatların Çəkilməsi və Emalı",
            "Data Modelləşdirmə və Təmizləmə",
            "Power BI ilə İnteraktiv Dashboard-lar",
            "DAX Funksiyaları və Hesabatlıq",
            "Real Biznes Keysləri üzrə Analiz"
        ],
        kids: [
            "Alqoritmik Düşüncə və Məntiq",
            "HTML & CSS ilə İlk Veb Səhifə",
            "İnteraktiv Elementlər və Animasiyalar",
            "Öz Mini Oyununu Yaratmaq",
            "Viktorina və Yaradıcı Layihələr",
            "Təqdimat və Komanda İşi"
        ],
        biznes: [
            "İT Layihələrin İdarə Edilməsi (Agile/Scrum)",
            "Biznes Tələblərinin Toplanması",
            "Proseslərin Modelləşdirilməsi (BPMN / UML)",
            "Texniki Tapşırıq (SRS) Yazılması",
            "Müştəri və Proqramçı Arasında Kommunikasiya",
            "Real Layihə Sənədləşməsi"
        ]
    };
    return map[key] || map.proqramlasdirma;
}

async function initCoursesPage() {
    const grid = document.getElementById("studyFieldsGrid");
    if (!grid) return;

    try {
        const res = await fetch(`${API_BASE_URL}/courses`);
        if (res.ok) {
            const apiCourses = await res.json();
            coursesPageData = Array.isArray(apiCourses) && apiCourses.length > 0 ? apiCourses : FALLBACK_COURSES;
        } else {
            coursesPageData = FALLBACK_COURSES;
        }
    } catch {
        coursesPageData = FALLBACK_COURSES;
    }

    const urlParams = new URLSearchParams(window.location.search);
    let activeFilter = urlParams.get("cat") || "all";
    let searchTerm = "";

    const filterBtns = document.querySelectorAll("#categoryFilters .filter-pill-btn");
    filterBtns.forEach(btn => {
        if (btn.getAttribute("data-filter") === activeFilter) {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        }
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.getAttribute("data-filter") || "all";
            renderStudyFields(activeFilter, searchTerm);
        });
    });

    const searchInput = document.getElementById("courseSearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchTerm = e.target.value.trim().toLowerCase();
            renderStudyFields(activeFilter, searchTerm);
        });
    }

    renderStudyFields(activeFilter, searchTerm);

    const courseIdParam = urlParams.get("courseId");
    if (courseIdParam) {
        window.location.href = `course-detail.html?id=${encodeURIComponent(courseIdParam)}`;
    }
}

function renderStudyFields(filterKey, searchTerm) {
    const grid = document.getElementById("studyFieldsGrid");
    if (!grid) return;

    const themes = [
        "field-theme-purple",
        "field-theme-emerald",
        "field-theme-orange",
        "field-theme-indigo",
        "field-theme-sky",
        "field-theme-rose"
    ];

    const filtered = coursesPageData.filter(course => {
        const matchesCat = filterKey === "all" || getCourseFilterKey(course) === filterKey;
        const text = `${course.name} ${course.category} ${course.description}`.toLowerCase();
        const matchesSearch = !searchTerm || text.includes(searchTerm);
        return matchesCat && matchesSearch;
    });

    if (!filtered.length) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding: 48px 20px; background:#FFFFFF; border-radius:20px; border:1px dashed #CBD5E1; color:#64748B;">
                <i class="fa-solid fa-magnifying-glass" style="font-size:28px; margin-bottom:12px; color:#94A3B8;"></i>
                <h4 style="color:#0F172A; margin-bottom:6px;">Axtarışa uyğun kurs tapılmadı</h4>
                <p>Başqa kateqoriya və ya açar söz yoxlayın.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map((course, idx) => {
        const themeClass = themes[idx % themes.length];
        const imgUrl = resolveImageUrl(course.imagePath, "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80");
        const isOpen = course.status === 0;

        return `
            <div class="field-card ${themeClass}" onclick="window.location.href='course-detail.html?id=${Number(course.id)}'">
                <svg class="field-geo-lines" viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M-20 260 L90 260 L120 200 L280 200 L310 150 L430 150" stroke="white" stroke-width="24" stroke-linejoin="miter"/>
                    <path d="M20 330 L140 330 L175 270 L340 270" stroke="white" stroke-width="10" stroke-linejoin="miter"/>
                </svg>

                <div class="field-card-top">
                    <div class="field-card-top-left">
                        <h3>${escapeHtml(course.name)}</h3>
                        <div class="field-mini-badges">
                            <span class="field-mini-badge">${escapeHtml(course.category)}</span>
                            <span class="field-mini-badge">${escapeHtml(course.lessonDays)}</span>
                        </div>
                    </div>
                    <div class="field-arrow-btn" title="Ətraflı bax">
                        <i class="fa-solid fa-chevron-right"></i>
                    </div>
                </div>

                <div class="field-card-bottom">
                    <div class="field-card-img-wrap">
                        <img src="${imgUrl}" alt="${escapeHtml(course.name)}">
                        <span class="field-status-float">
                            <span class="field-status-dot ${isOpen ? "" : "full"}"></span>
                            ${isOpen ? "Qeydiyyat Açıqdır" : "Qrup Dolub"}
                        </span>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}

function getCourseExtraMeta(course) {
    const key = getCourseFilterKey(course);
    const catalog = {
        proqramlasdirma: {
            age: "16+",
            groupSize: "15-20 nəfər",
            duration: "8 ay (32 həftə)",
            intensity: "2 × 3 saat",
            prerequisite: "Yoxdur",
            technologies: ["HTML", "CSS", "JavaScript", "SQL Server", "C#", "ASP.NET Core MVC", "EF Core", "LLM API", "RAG"],
            finalProject: "AI köməkçisi olan veb tətbiq (onlayn mağaza, rezervasiya sistemi)"
        },
        mobil: {
            age: "16+",
            groupSize: "15-20 nəfər",
            duration: "6 ay (24 həftə)",
            intensity: "2 × 3 saat",
            prerequisite: "Yoxdur",
            technologies: ["C#", ".NET Web API", "SQL Server", "JavaScript", "TypeScript", "React", "React Native (Expo)"],
            finalProject: "Mobil tətbiq + C# Web API"
        },
        datascience: {
            age: "16+",
            groupSize: "15-20 nəfər",
            duration: "6 ay (24 həftə)",
            intensity: "2 × 3 saat",
            prerequisite: "Yoxdur",
            technologies: ["Python", "SQL", "PostgreSQL", "NumPy", "pandas", "scikit-learn", "XGBoost", "FastAPI"],
            finalProject: "Proqnoz modeli və onun API-si"
        },
        analitika: {
            age: "16+",
            groupSize: "15-20 nəfər",
            duration: "5 ay (20 həftə)",
            intensity: "2 × 3 saat",
            prerequisite: "Kompüterdən sərbəst istifadə",
            technologies: ["Excel", "SQL Server / PostgreSQL", "Power Query", "Power BI", "DAX"],
            finalProject: "İdarə heyəti üçün Power BI dashboard"
        },
        kids: {
            age: "10-14 yaş",
            groupSize: "15-20 nəfər",
            duration: "4 ay (16 həftə)",
            intensity: "2 × 1.5 saat",
            prerequisite: "Yoxdur",
            technologies: ["HTML", "CSS", "JavaScript", "VS Code / CodePen"],
            finalProject: "İnternetdə yayımlanmış şəxsi sayt + JS oyunu"
        },
        biznes: {
            age: "18+",
            groupSize: "15-20 nəfər",
            duration: "4 ay (16 həftə)",
            intensity: "2 × 3 saat",
            prerequisite: "Yoxdur",
            technologies: ["UML", "BPMN", "Jira", "Confluence", "Figma", "Postman", "SQL"],
            finalProject: "Texniki tapşırıq (TT/SRS) + UML/BPMN paketi"
        }
    };
    return catalog[key] || null;
}

async function initCourseDetailPage() {
    const page = document.getElementById("courseDetailPage");
    if (!page) return;

    const params = new URLSearchParams(window.location.search);
    const idParam = Number(params.get("id") || params.get("courseId"));

    let course = null;
    try {
        if (idParam) {
            const res = await fetch(`${API_BASE_URL}/courses/${idParam}`);
            if (res.ok) course = await res.json();
        }
        if (!course) {
            const allRes = await fetch(`${API_BASE_URL}/courses`);
            if (allRes.ok) {
                const list = await allRes.json();
                course = list.find(c => c.id === idParam) || list[0] || null;
            }
        }
    } catch {
        // fallback below
    }

    if (!course) {
        course = FALLBACK_COURSES.find(c => c.id === idParam) || FALLBACK_COURSES[0];
    }

    if (!course) return;

    document.title = `${course.name} | Altensor Academy`;
    document.getElementById("cdCategory").textContent = course.category;
    document.getElementById("cdTitle").textContent = course.name;
    document.getElementById("cdDescription").textContent = course.description;

    const isOpen = course.status === 0;
    const statusPill = document.getElementById("cdStatusPill");
    statusPill.className = `cd-status-pill ${isOpen ? "open" : "full"}`;
    statusPill.innerHTML = isOpen
        ? `<i class="fa-solid fa-circle-dot"></i> Qeydiyyat Açıqdır`
        : `<i class="fa-solid fa-circle-xmark"></i> Qrup Dolub`;

    const imgUrl = resolveImageUrl(course.imagePath, "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=700&q=80");
    const cdImg = document.getElementById("cdImage");
    cdImg.src = imgUrl;
    cdImg.alt = course.name;

    const meta = getCourseExtraMeta(course);
    if (meta) {
        document.getElementById("cdSpecsCard").style.display = "block";
        const specs = [
            { icon: "fa-solid fa-user-group", label: "Yaş həddi", val: meta.age },
            { icon: "fa-solid fa-users", label: "Qrup ölçüsü", val: meta.groupSize },
            { icon: "fa-regular fa-clock", label: "Müddət", val: meta.duration },
            { icon: "fa-regular fa-calendar-check", label: "Dərslər", val: meta.intensity },
            { icon: "fa-solid fa-shield-check", label: "Ön tələb", val: meta.prerequisite },
            { icon: "fa-solid fa-rocket", label: "Yekun layihə", val: meta.finalProject }
        ];

        document.getElementById("cdSpecsGrid").innerHTML = specs.map(s => `
            <div class="cd-spec-item">
                <div class="cd-spec-label"><i class="${s.icon}"></i> ${s.label}</div>
                <div class="cd-spec-val">${escapeHtml(s.val)}</div>
            </div>
        `).join("");

        if (meta.technologies && meta.technologies.length) {
            document.getElementById("cdTechCard").style.display = "block";
            document.getElementById("cdTechList").innerHTML = meta.technologies
                .map(t => `<span class="cd-tech-badge">${escapeHtml(t)}</span>`)
                .join("");
        }
    }

    const modules = getCourseModules(course);
    document.getElementById("cdModulesList").innerHTML = modules.map((m, idx) => `
        <li>
            <span class="cd-module-num">${idx + 1}</span>
            <span>${escapeHtml(m)}</span>
        </li>
    `).join("");

    document.getElementById("cdSidebarMeta").innerHTML = `
        <li><span>Dərs günləri</span><strong>${escapeHtml(course.lessonDays || "-")}</strong></li>
        ${meta ? `<li><span>Müddət</span><strong>${escapeHtml(meta.duration)}</strong></li>` : ""}
        <li><span>Tədris formatı</span><strong>100% Praktiki</strong></li>
        <li><span>Sertifikat</span><strong>Rəsmi Sertifikat</strong></li>
    `;

    const applyBtn = document.getElementById("cdApplyBtn");
    if (isOpen) {
        applyBtn.disabled = false;
        applyBtn.innerHTML = 'Kursa Müraciət Et <i class="fa-solid fa-arrow-right"></i>';
        applyBtn.onclick = () => applyToCourse(course.id);
    } else {
        applyBtn.disabled = true;
        applyBtn.innerHTML = 'Qrup Dolub';
    }

    // Matching Teacher
    let teachers = [];
    try {
        const tRes = await fetch(`${API_BASE_URL}/teachers`);
        if (tRes.ok) {
            const list = await tRes.json();
            if (Array.isArray(list) && list.length) teachers = list;
        }
    } catch {
        // fallback below
    }
    if (!teachers.length) teachers = FALLBACK_TEACHERS;

    const courseKey = getCourseFilterKey(course);
    const matchedTeacher = teachers.find(t => getTeacherFilterKey(t) === courseKey);
    if (matchedTeacher) {
        const tImg = resolveImageUrl(matchedTeacher.imagePath, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80");
        document.getElementById("cdTeacherCard").style.display = "block";
        document.getElementById("cdTeacherBox").innerHTML = `
            <img class="cd-teacher-img" src="${tImg}" alt="${escapeHtml(matchedTeacher.fullName)}">
            <div class="cd-teacher-info">
                <h4>${escapeHtml(matchedTeacher.fullName)}</h4>
                <span class="cd-teacher-spec">${escapeHtml(matchedTeacher.specialty)}</span>
                <p class="cd-teacher-bio">${escapeHtml(matchedTeacher.bio || "")}</p>
            </div>
        `;
    }
}

// 4. Apply to Course Action
async function applyToCourse(courseId) {
    const token = getToken();
    if (!token) {
        showPageToast("Kursa müraciət etmək üçün zəhmət olmasa əvvəlcə daxil olun və ya qeydiyyatdan keçin.", true);
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1100);
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/applications/apply/${courseId}`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        if (!res.ok || !data.succeeded) {
            showPageToast(data.message || "Müraciət zamanı xəta baş verdi.", true);
            return;
        }

        showPageToast(data.message || "Müraciətiniz uğurla qeydə alındı!");
    } catch {
        showPageToast("Serverlə əlaqə yaratmaq mümkün olmadı.", true);
    }
}

// 5. Teachers Page (teachers.html) - Filterable Teacher Cards
const FALLBACK_TEACHERS = [
    {
        id: 1,
        fullName: "Əli Cabbarov",
        specialty: "Data Analitika",
        bio: "Məlumatların toplanması, təmizlənməsi, vizuallaşdırılması və biznes qərarlarının qəbulu üçün analitik hesabatların hazırlanması üzrə təlimçi.",
        imagePath: "assets/images/teachers/ali-cabbarov.jpg"
    },
    {
        id: 2,
        fullName: "Ramil Məmmədli",
        specialty: "Web for Kids",
        bio: "Məktəblilər üçün alqoritmik düşüncənin inkişafı, veb texnologiyaların əsasları və öz ilk interaktiv veb layihələrini sıfırdan hazırlamaq üzrə təlimçi.",
        imagePath: "assets/images/teachers/ramil-memmedli.jpg"
    },
    {
        id: 3,
        fullName: "Hüseyn Həsənli",
        specialty: "Full-stack Proqramlaşdırma (AI ilə)",
        bio: "IT sahəsində 10+ illik təcrübəyə malik Full-stack proqramçı (7 il C#/.NET Core API, 3 il Java/Spring Boot). MSSQL, Oracle və PostgreSQL verilənlər bazaları üzrə real layihə təcrübəsini tələbələrə praktiki şəkildə öyrədir.",
        imagePath: "assets/images/teachers/huseyn-hesenli.jpg"
    }
];

let teachersPageData = [];

function getTeacherFilterKey(teacher) {
    const spec = (teacher.specialty || "").toLowerCase();
    const text = spec || (teacher.bio || "").toLowerCase();
    if (text.includes("kids") || text.includes("uşaq")) return "kids";
    if (text.includes("biznes")) return "biznes";
    if (text.includes("mobil") || text.includes("ios") || text.includes("android")) return "mobil";
    if (text.includes("data science") || text.includes("machine learning")) return "datascience";
    if (text.includes("analitika") || text.includes("power bi")) return "analitika";
    return "proqramlasdirma";
}

async function initTeachersPage() {
    const grid = document.getElementById("teachersPageGrid");
    if (!grid) return;

    try {
        const res = await fetch(`${API_BASE_URL}/teachers`);
        if (res.ok) {
            const apiTeachers = await res.json();
            teachersPageData = Array.isArray(apiTeachers) && apiTeachers.length > 0 ? apiTeachers : FALLBACK_TEACHERS;
        } else {
            teachersPageData = FALLBACK_TEACHERS;
        }
    } catch {
        teachersPageData = FALLBACK_TEACHERS;
    }

    let activeFilter = "all";
    const filterBtns = document.querySelectorAll("#teacherFilters .filter-pill-btn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            filterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeFilter = btn.getAttribute("data-filter") || "all";
            renderTeachersGrid(activeFilter);
        });
    });

    renderTeachersGrid(activeFilter);
}

function renderTeachersGrid(filterKey) {
    const grid = document.getElementById("teachersPageGrid");
    if (!grid) return;

    const filtered = teachersPageData.filter(t => {
        return filterKey === "all" || getTeacherFilterKey(t) === filterKey;
    });

    if (!filtered.length) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding: 48px 20px; background:#FFFFFF; border-radius:20px; border:1px dashed #CBD5E1; color:#64748B;">
                <i class="fa-solid fa-chalkboard-user" style="font-size:30px; margin-bottom:12px; color:#94A3B8;"></i>
                <h4 style="color:#0F172A; margin-bottom:6px;">Bu sahə üzrə müəllim tezliklə əlavə olunacaq</h4>
                <p>Digər tədris istiqamətlərini seçərək mövcud müəllimlərimizlə tanış ola bilərsiniz.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(t => {
        const imgUrl = resolveImageUrl(t.imagePath, "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80");
        return `
            <div class="teacher-card">
                <div class="teacher-photo-wrap">
                    <img src="${imgUrl}" alt="${escapeHtml(t.fullName)}">
                </div>
                <div class="teacher-card-body">
                    <span class="teacher-specialty-badge">${escapeHtml(t.specialty)}</span>
                    <h3 class="teacher-card-name">${escapeHtml(t.fullName)}</h3>
                    <p class="teacher-card-bio">${escapeHtml(t.bio || "Altensor Academy təlimçisi və mentoru.")}</p>
                    <div class="teacher-card-footer">
                        <span><i class="fa-solid fa-circle-check"></i> Praktiki Mentor</span>
                        <span>Altensor Academy</span>
                    </div>
                </div>
            </div>
        `;
    }).join("");
}


// ========================================================
// 6. GLOBAL NAVBAR SEARCH MODAL (All Pages)
// ========================================================
function initGlobalSearch() {
    const searchBtns = document.querySelectorAll(".btn-search");
    if (!searchBtns.length) return;

    if (!document.getElementById("globalSearchModal")) {
        const modalEl = document.createElement("div");
        modalEl.id = "globalSearchModal";
        modalEl.className = "global-search-modal";
        modalEl.innerHTML = `
            <div class="global-search-dialog" role="dialog" aria-modal="true" aria-label="Kurs axtarışı">
                <div class="global-search-header">
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type="text" id="globalSearchInput" placeholder="Kurs adı, sahə və ya açar söz yazın... (məs: Backend, Data, Kids)" autocomplete="off">
                    <button type="button" class="global-search-close" id="globalSearchClose" aria-label="Bağla">
                        <i class="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div class="global-search-results" id="globalSearchResults"></div>
                <div class="global-search-footer">
                    <span>Kursun detallarına keçmək üçün üzərinə klikləyin</span>
                    <span>ESC — Bağla</span>
                </div>
            </div>
        `;
        document.body.appendChild(modalEl);
    }

    const modal = document.getElementById("globalSearchModal");
    const input = document.getElementById("globalSearchInput");
    const resultsBox = document.getElementById("globalSearchResults");
    const closeBtn = document.getElementById("globalSearchClose");
    let cachedCourses = null;

    async function loadCoursesForSearch() {
        if (cachedCourses) return cachedCourses;
        try {
            const res = await fetch(`${API_BASE_URL}/courses`);
            if (res.ok) {
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    cachedCourses = data;
                    return cachedCourses;
                }
            }
        } catch {
            // Fallback if backend is offline
        }
        cachedCourses = FALLBACK_COURSES;
        return cachedCourses;
    }

    function renderResults(courses, query) {
        const q = (query || "").trim().toLowerCase();
        const filtered = q
            ? courses.filter(c =>
                `${c.name} ${c.category} ${c.description}`.toLowerCase().includes(q)
            )
            : courses;

        if (!filtered.length) {
            resultsBox.innerHTML = `
                <div class="global-search-empty">
                    <i class="fa-regular fa-face-frown"></i>
                    <p>"${escapeHtml(query)}" üzrə kurs tapılmadı.</p>
                </div>
            `;
            return;
        }

        resultsBox.innerHTML = filtered.map(course => {
            const imgUrl = resolveImageUrl(course.imagePath, "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80");
            const isOpen = course.status === 0;
            return `
                <button type="button" class="global-search-item" data-course-id="${Number(course.id)}">
                    <img src="${imgUrl}" alt="${escapeHtml(course.name)}">
                    <div class="global-search-item-info">
                        <div class="global-search-item-title">${escapeHtml(course.name)}</div>
                        <div class="global-search-item-meta">
                            <span>${escapeHtml(course.category)}</span>
                            <span>•</span>
                            <span>${escapeHtml(course.lessonDays)}</span>
                        </div>
                    </div>
                    <span class="global-search-status ${isOpen ? "open" : "full"}">
                        ${isOpen ? "Açıqdır" : "Dolub"}
                    </span>
                    <i class="fa-solid fa-chevron-right global-search-arrow"></i>
                </button>
            `;
        }).join("");

        resultsBox.querySelectorAll(".global-search-item").forEach(item => {
            item.addEventListener("click", () => {
                const id = Number(item.getAttribute("data-course-id"));
                closeSearchModal();
                window.location.href = `course-detail.html?id=${encodeURIComponent(id)}`;
            });
        });
    }

    async function openSearchModal() {
        modal.classList.add("open");
        input.value = "";
        setTimeout(() => input.focus(), 40);
        const courses = await loadCoursesForSearch();
        renderResults(courses, "");
    }

    function closeSearchModal() {
        modal.classList.remove("open");
    }

    searchBtns.forEach(btn => {
        btn.addEventListener("click", openSearchModal);
    });

    closeBtn.addEventListener("click", closeSearchModal);

    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeSearchModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modal.classList.contains("open")) {
            closeSearchModal();
        }
    });

    input.addEventListener("input", async () => {
        const courses = await loadCoursesForSearch();
        renderResults(courses, input.value);
    });
}


// ========================================================
// 7. FLOATING WHATSAPP BUTTON (All Public Pages)
// ========================================================
function initFloatingWhatsApp() {
    if (document.querySelector(".floating-whatsapp-btn")) return;

    const btn = document.createElement("a");
    btn.className = "floating-whatsapp-btn";
    btn.href = "https://wa.me/994104727578?text=Salam%2C%20Altensor%20Academy%20kurslar%C4%B1%20haqq%C4%B1nda%20sual%C4%B1m%20var.";
    btn.target = "_blank";
    btn.rel = "noopener noreferrer";
    btn.setAttribute("aria-label", "WhatsApp ilə əlaqə");
    btn.innerHTML = `
        <span class="floating-wa-tooltip">WhatsApp-dan yazın</span>
        <i class="fa-brands fa-whatsapp"></i>
    `;
    document.body.appendChild(btn);
}
