document.addEventListener('DOMContentLoaded', function () {
    // Sidebar toggle
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('main');

    menuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('show');
        mainContent.classList.toggle('sidebar-open');
    });

    // Close sidebar when clicking outside
    document.addEventListener('click', function (event) {
        if (!sidebar.contains(event.target) &&
            event.target !== menuBtn &&
            !menuBtn.contains(event.target)) {
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
}); //closing of the DOMContentLoaded listener
