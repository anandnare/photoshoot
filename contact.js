document.addEventListener("DOMContentLoaded", () => {
    
    // --- Dark/Light Theme Switching Node Config ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    if(themeToggleBtn) {
        const icon = themeToggleBtn.querySelector('i');
        icon.className = savedTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    }

    themeToggleBtn?.addEventListener('click', () => {
        let currentTheme = htmlElement.getAttribute('data-theme');
        let newTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        const icon = themeToggleBtn.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
    });


    // --- Contextual Package URL Parameter Parser ---
    function selectPackageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const targetPackage = urlParams.get('package');
        const selectDropdown = document.getElementById('event-type');

        if(targetPackage && selectDropdown) {
            // Match parameter variables safely against form dropdown option values
            for(let option of selectDropdown.options) {
                if(option.value === targetPackage) {
                    selectDropdown.value = targetPackage;
                    break;
                }
            }
        }
    }
    selectPackageFromURL();


    // --- Form Tracking & Validation Controller Logic ---
    const inquiryForm = document.getElementById("booking-inquiry-form");
    const feedbackMsg = document.getElementById("form-feedback-message");

    inquiryForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Halt default browser submit refreshing loop
        
        let isFormValid = true;
        const requiredElements = inquiryForm.querySelectorAll("[required]");

        requiredElements.forEach(element => {
            const parentBlock = element.parentElement;
            
            // Check specific data input validations
            if(!element.value.trim()) {
                parentBlock.classList.add("invalid-error");
                isFormValid = false;
            } else if (element.type === "email" && !validateEmailSignature(element.value)) {
                parentBlock.classList.add("invalid-error");
                isFormValid = false;
            } else {
                parentBlock.classList.remove("invalid-error");
            }
        });

        if(isFormValid) {
            // Render frontend confirmation alert notice
            feedbackMsg.textContent = "Thank you for reaching out to Gaurai Studio! Your booking inquiry has been safely locked into our review queue. Check your email for confirmation.";
            feedbackMsg.className = "form-alert success-alert";
            feedbackMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

            // Reset state fields cleanly upon successful submission
            inquiryForm.reset();
        }
    });

    // Clean up error visualization tracking real-time as users modify entries
    inquiryForm.querySelectorAll("[required]").forEach(element => {
        element.addEventListener("input", () => {
            const parentBlock = element.parentElement;
            if(element.value.trim()) {
                parentBlock.classList.remove("invalid-error");
            }
        });
        
        if(element.tagName === "SELECT") {
            element.addEventListener("change", () => {
                if(element.value) element.parentElement.classList.remove("invalid-error");
            });
        }
    });

    // Simple RegEx verification utility function
    function validateEmailSignature(email) {
        const signaturePattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return signaturePattern.test(String(email).toLowerCase());
    }
});