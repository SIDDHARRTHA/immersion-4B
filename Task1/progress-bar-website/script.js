function createProgressBar() {
    const container = document.getElementById('progress-bars');
    const progressBar = document.createElement('div');
    const progressFill = document.createElement('div');

    progressBar.className = 'progress-bar';
    progressFill.className = 'progress-fill';
    progressBar.appendChild(progressFill);
    container.appendChild(progressBar);

    let currentWidth = 0;

    progressBar.addEventListener('click', function handler() {
        if (currentWidth < 100) {
            currentWidth += 10;
            progressFill.style.width = currentWidth + '%';
        }
        if (currentWidth >= 100) {
            progressBar.removeEventListener('click', handler);
            createProgressBar(); 
        }
    });

    return progressFill;
}
window.onload = function() {
    createProgressBar();
};