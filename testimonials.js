document.addEventListener("DOMContentLoaded", () => {
    
    // --- Dark/Light Mode Shared Controller Switcher ---
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


    // --- Before/After Interactive Visual Slider Module ---
    const sliderContainer = document.getElementById("ba-slider");
    const beforeWrapper = document.getElementById("before-wrapper");
    const beforeImage = beforeWrapper.querySelector(".before-image");
    const sliderHandle = document.getElementById("slider-handle");
    
    let isSliderDragging = false;

    // Synchronize static base container boundaries against variable scaling states
    function adjustInternalImageSizing() {
        const containerWidth = sliderContainer.offsetWidth;
        beforeImage.style.width = containerWidth + "px";
    }

    window.addEventListener("resize", adjustInternalImageSizing);
    adjustInternalImageSizing(); // Execute initial rendering size sweep calculation

    // Core displacement vector mathematical tracking engine logic
    function processImagePartitionSplit(coordinateX) {
        const containerBounds = sliderContainer.getBoundingClientRect();
        let computedPosition = coordinateX - containerBounds.left;
        
        // Prevent horizontal positioning overflow vectors beyond boundary boxes
        if (computedPosition < 0) computedPosition = 0;
        if (computedPosition > containerBounds.width) computedPosition = containerBounds.width;

        // Express computed values as exact percentages for frame alignments
        const divisionPercentage = (computedPosition / containerBounds.width) * 100;
        
        sliderHandle.style.left = divisionPercentage + "%";
        beforeWrapper.style.width = divisionPercentage + "%";
    }

    // --- Mouse Action Triggers ---
    sliderHandle.addEventListener("mousedown", () => { isSliderDragging = true; });
    window.addEventListener("mouseup", () => { isSliderDragging = false; });
    
    window.addEventListener("mousemove", (e) => {
        if (!isSliderDragging) return;
        processImagePartitionSplit(e.clientX);
    });

    // --- Mobile Touch Interactivity Integration ---
    sliderHandle.addEventListener("touchstart", () => { isSliderDragging = true; }, { passive: true });
    window.addEventListener("touchend", () => { isSliderDragging = false; });
    
    window.addEventListener("touchmove", (e) => {
        if (!isSliderDragging) return;
        // Access target index tracking structures for responsive mobile touch layers
        processImagePartitionSplit(e.touches[0].clientX);
    });
});