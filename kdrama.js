document.addEventListener('DOMContentLoaded', function () {
    // Sidebar toggle
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('main');
    const themeToggle = document.getElementById('theme-toggle');
    const navbarTitle = document.querySelector('.navbar-title');

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('dramaTheme');
    let isCdramaMode = savedTheme === 'cdrama';

    // Apply saved theme on page load
    if (isCdramaMode) {
        document.body.classList.add('cdrama-theme');
        themeToggle.textContent = 'toggle_on';
        navbarTitle.textContent = "Rupika's Cdrama Recs";
        document.getElementById('kdrama-list').style.display = 'none';
        document.getElementById('cdrama-list').style.display = 'block';
        document.getElementById('kdrama-rec').style.display = 'none';
        document.getElementById('cdrama-rec').style.display = 'block';
    }

    // Toggle sidebar
    menuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('show');
        mainContent.classList.toggle('sidebar-open');
    });

    // Theme toggle
    themeToggle.addEventListener('click', function () {
        isCdramaMode = !isCdramaMode;

        if (isCdramaMode) {
            // Switch to Cdrama mode
            document.body.classList.add('cdrama-theme');
            themeToggle.textContent = 'toggle_on';
            navbarTitle.textContent = "Rupika's Cdrama Recs";
            document.getElementById('kdrama-list').style.display = 'none';
            document.getElementById('cdrama-list').style.display = 'block';
            document.getElementById('kdrama-rec').style.display = 'none';
            document.getElementById('cdrama-rec').style.display = 'block';
        } else {
            // Switch to Kdrama mode
            document.body.classList.remove('cdrama-theme');
            themeToggle.textContent = 'toggle_off';
            navbarTitle.textContent = "Rupika's Kdrama Recs";
            document.getElementById('kdrama-list').style.display = 'block';
            document.getElementById('cdrama-list').style.display = 'none';
            document.getElementById('kdrama-rec').style.display = 'block';
            document.getElementById('cdrama-rec').style.display = 'none';
        }

        // Save theme preference
        localStorage.setItem('dramaTheme', isCdramaMode ? 'cdrama' : 'kdrama');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function (event) {
        if (
            !sidebar.contains(event.target) &&
            event.target !== menuBtn &&
            !menuBtn.contains(event.target)
        ) {
            sidebar.classList.remove('show');
            mainContent.classList.remove('sidebar-open');
        }
    });

    // Responsive adjustments
    function handleResize() {
        if (window.innerWidth <= 576) {
            mainContent.classList.remove('sidebar-open');
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
});
