// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
    } else {
        navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections (except hero to keep top clean)
document.querySelectorAll('section').forEach(section => {
    if (section.id === 'inicio') return;
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Profesionales Data
const PROFESSIONALS = [
    {
        name: "Dr. Javier Ruiz",
        specialty: "Pediatría y Neonatología",
        description: "Especialista en cuidado crítico infantil y recién nacidos.",
        tags: ["Pediatría", "Neonatología", "Materno Infantil"],
        icon: "👨‍⚕️"
    },
    {
        name: "Dra. Elena Martínez",
        specialty: "Ginecología y Obstetricia",
        description: "Experta en seguimiento de embarazo y salud de la mujer.",
        tags: ["Ginecología", "Obstetricia", "Adultos", "Materno Infantil"],
        icon: "👩‍⚕️"
    },
    {
        name: "Dr. Carlos Sánchez",
        specialty: "Cardiología Infantil y Adultos",
        description: "Especialista en salud cardiovascular para todas las edades.",
        tags: ["Cardiología", "Adultos", "Materno Infantil"],
        icon: "👨‍⚕️"
    },
    {
        name: "Dra. Ana Belén López",
        specialty: "Psicología Infantil",
        description: "Apoyo emocional y desarrollo cognitivo en la infancia.",
        tags: ["Psicología", "Terapias", "Materno Infantil"],
        icon: "👩‍⚕️"
    },
    {
        name: "Dr. Miguel Ángel Torres",
        specialty: "Traumatología y Ortopedia",
        description: "Cirugía ortopédica y tratamiento de lesiones deportivas.",
        tags: ["Traumatología", "Adultos"],
        icon: "👨‍⚕️"
    },
    {
        name: "Dra. Sofía Castro",
        specialty: "Nutrición y Dietética",
        description: "Planes nutricionales personalizados y educación alimentaria.",
        tags: ["Nutrición", "Adultos", "Materno Infantil"],
        icon: "👩‍⚕️"
    },
    {
        name: "Dr. Roberto García",
        specialty: "Urología",
        description: "Especialista en sistema urinario y salud masculina.",
        tags: ["Urología", "Adultos"],
        icon: "👨‍⚕️"
    },
    {
        name: "Dra. Lucía Ferrán",
        specialty: "Logopedia y Foniatría",
        description: "Trastornos del habla y comunicación en niños y adultos.",
        tags: ["Logopedia", "Terapias", "Materno Infantil"],
        icon: "👩‍⚕️"
    },
    {
        name: "Dr. Germán Ocaña",
        specialty: "Podología Clínica",
        description: "Cuidado integral del pie y biomecánica de la marcha.",
        tags: ["Podología", "Adultos", "Materno Infantil"],
        icon: "👨‍⚕️"
    },
    {
        name: "Dra. Carmen Valls",
        specialty: "Neurología Infantil",
        description: "Diagnóstico y tratamiento de trastornos neurológicos en niños.",
        tags: ["Neurología", "Materno Infantil"],
        icon: "👩‍⚕️"
    },
    {
        name: "Dr. Alberto Moreno",
        specialty: "Digestivo",
        description: "Especialista en sistema digestivo y endoscopia.",
        tags: ["Digestivo", "Adultos", "Materno Infantil"],
        icon: "👨‍⚕️"
    },
    {
        name: "Dra. Beatriz Jiménez Canet",
        specialty: "Medicina Familiar (Adultos)",
        description: "Atención integral y personalizada para adultos, enfocada en la prevención y el bienestar.",
        tags: ["Medicina Familiar", "Adultos"],
        icon: "👩‍⚕️",
        personalWebsite: "https://beatriztumedicadefamilia.familia-jimenez.es/"
    },
    {
        name: "Dra. Isabell Pardo",
        specialty: "Medicina Familiar",
        description: "Atención primaria y medicina preventiva.",
        tags: ["Medicina Familiar", "Adultos"],
        icon: "👩‍⚕️"
    }
    // Add more up to 20 as needed
];

let activeFilter = "";
let selectedTags = new Set();

const teamGrid = document.getElementById('team-grid');
const searchInput = document.getElementById('prof-search');
const tagsContainer = document.getElementById('active-tags');

function renderProfessionals() {
    const teamGrid = document.getElementById('team-grid');
    
    if (!teamGrid) {
        console.error('Team grid element not found');
        return;
    }
    
    console.log('Rendering professionals...', PROFESSIONALS.length);
    
    teamGrid.innerHTML = "";
    
    const filtered = PROFESSIONALS.filter(prof => {
        const matchesSearch = prof.name.toLowerCase().includes(activeFilter.toLowerCase()) || 
                             prof.specialty.toLowerCase().includes(activeFilter.toLowerCase());
        
        const matchesTags = selectedTags.size === 0 || 
                           [...selectedTags].every(tag => prof.tags.includes(tag));
        
        return matchesSearch && matchesTags;
    });

    console.log('Filtered professionals:', filtered.length);

    if (filtered.length === 0) {
        teamGrid.innerHTML = '<div class="no-results">No se encontraron profesionales con esos criterios.</div>';
        return;
    }

    filtered.forEach(prof => {
        const card = document.createElement('div');
        card.className = 'team-member animate-in';
        card.innerHTML = `
            <div class="member-photo">
                <div class="photo-placeholder">
                    <span class="placeholder-icon">${prof.icon}</span>
                </div>
            </div>
            <div class="member-info">
                <h4 class="member-name">${prof.name}</h4>
                <p class="member-specialty">${prof.specialty}</p>
                <p class="member-description">${prof.description}</p>
                <div class="member-tags">
                    ${prof.tags.map(tag => `<span class="member-tag">${tag}</span>`).join('')}
                </div>
                ${prof.personalWebsite ? `
                    <a href="${prof.personalWebsite}" class="personal-web-link" target="_blank">
                        🌐 Ver web personal
                    </a>
                ` : ''}
            </div>
        `;
        teamGrid.appendChild(card);
    });
    
    console.log('Professionals rendered successfully');
}

function renderTags() {
    if (!tagsContainer) return;
    
    const allTags = new Set();
    PROFESSIONALS.forEach(p => p.tags.forEach(t => allTags.add(t)));
    
    tagsContainer.innerHTML = "";
    [...allTags].sort().forEach(tag => {
        const tagEl = document.createElement('span');
        tagEl.className = `tag ${selectedTags.has(tag) ? 'active' : ''}`;
        tagEl.textContent = tag;
        tagEl.addEventListener('click', () => {
            if (selectedTags.has(tag)) {
                selectedTags.delete(tag);
            } else {
                selectedTags.add(tag);
            }
            renderTags();
            renderProfessionals();
        });
        tagsContainer.appendChild(tagEl);
    });
}

// Mobile detection
const isMobile = () => {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Enhanced initialization
function initializeProfessionals() {
    console.log('Initializing professionals section...', isMobile() ? 'mobile' : 'desktop');
    
    const teamGrid = document.getElementById('team-grid');
    const searchInput = document.getElementById('prof-search');
    const tagsContainer = document.getElementById('active-tags');
    
    if (!teamGrid) {
        console.error('Team grid element not found during initialization');
        return;
    }
    
    // Clear loading state
    teamGrid.innerHTML = '';
    
    // Render tags and professionals
    renderTags();
    renderProfessionals();
    
    // Setup search functionality (only if not already setup)
    if (searchInput && !searchInput.hasAttribute('data-setup')) {
        searchInput.addEventListener('input', (e) => {
            activeFilter = e.target.value;
            renderProfessionals();
        });
        searchInput.setAttribute('data-setup', 'true');
    }
    
    console.log('Professionals section initialized successfully');
}

// Initial render with multiple fallbacks
document.addEventListener('DOMContentLoaded', () => {
    // Try immediate render
    initializeProfessionals();
    
    // Fallback for slow mobile browsers
    setTimeout(() => {
        const teamGrid = document.getElementById('team-grid');
        if (teamGrid && teamGrid.children.length === 0) {
            console.log('Fallback: Re-initializing professionals...');
            initializeProfessionals();
        }
    }, 500);
});

// Final fallback on window load
window.addEventListener('load', () => {
    const teamGrid = document.getElementById('team-grid');
    if (teamGrid && teamGrid.innerHTML.includes('Cargando profesionales')) {
        console.log('Final fallback: Re-initializing professionals...');
        initializeProfessionals();
    }
});

console.log('Contigo Centro Médico Integral - Website loaded successfully');

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 968) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}
