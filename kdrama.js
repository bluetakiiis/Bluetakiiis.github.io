document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.querySelector('main');
    const themeToggle = document.getElementById('theme-toggle');
    const navbarTitle = document.querySelector('.navbar-title');
    const form = document.getElementById('recommend-form');
    const status = document.getElementById('form-status');

    const savedTheme = localStorage.getItem('dramaTheme');
    let isCdramaMode = savedTheme === 'cdrama';

    if (isCdramaMode) {
        document.body.classList.add('cdrama-theme');
        themeToggle.textContent = 'toggle_on';
        navbarTitle.textContent = "Rupika's Cdrama Recs";
        document.getElementById('kdrama-list').style.display = 'none';
        document.getElementById('cdrama-list').style.display = 'block';
        document.getElementById('kdrama-rec').style.display = 'none';
        document.getElementById('cdrama-rec').style.display = 'block';
    }

    menuBtn.addEventListener('click', function () {
        sidebar.classList.toggle('show');
        mainContent.classList.toggle('sidebar-open');
        clearStatus();
    });

    themeToggle.addEventListener('click', function () {
        isCdramaMode = !isCdramaMode;

        if (isCdramaMode) {
            document.body.classList.add('cdrama-theme');
            themeToggle.textContent = 'toggle_on';
            navbarTitle.textContent = "Rupika's Cdrama Recs";
            document.getElementById('kdrama-list').style.display = 'none';
            document.getElementById('cdrama-list').style.display = 'block';
            document.getElementById('kdrama-rec').style.display = 'none';
            document.getElementById('cdrama-rec').style.display = 'block';
        } else {
            document.body.classList.remove('cdrama-theme');
            themeToggle.textContent = 'toggle_off';
            navbarTitle.textContent = "Rupika's Kdrama Recs";
            document.getElementById('kdrama-list').style.display = 'block';
            document.getElementById('cdrama-list').style.display = 'none';
            document.getElementById('kdrama-rec').style.display = 'block';
            document.getElementById('cdrama-rec').style.display = 'none';
        }

        localStorage.setItem('dramaTheme', isCdramaMode ? 'cdrama' : 'kdrama');
        clearStatus();
    });

    document.addEventListener('click', function (event) {
        if (!sidebar.contains(event.target) && event.target !== menuBtn && !menuBtn.contains(event.target)) {
            sidebar.classList.remove('show');
            mainContent.classList.remove('sidebar-open');
            clearStatus();
        }
    });

    function handleResize() {
        if (window.innerWidth <= 576) {
            mainContent.classList.remove('sidebar-open');
        }
    }

    function clearStatus() {
        if (status) {
            status.textContent = '';
            status.className = 'form-status';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize();

    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const data = new FormData(form);
            clearStatus();

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    status.textContent = 'Submitted successfully.';
                    status.classList.add('status-success');
                    form.reset();
                } else {
                    status.textContent = 'Submission failed. Try again.';
                    status.classList.add('status-error');
                }
            } catch (error) {
                status.textContent = 'Something went wrong. Check your internet.';
                status.classList.add('status-error');
            }
        });
    }
});
