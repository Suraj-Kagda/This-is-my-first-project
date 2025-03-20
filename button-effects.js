// Button Effects Handler
document.addEventListener('DOMContentLoaded', () => {
    // Get all modern buttons
    const buttons = document.querySelectorAll('.modern-button');

    // 3D Tilt Effect
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            button.style.setProperty('--rotateX', `${rotateX}deg`);
            button.style.setProperty('--rotateY', `${rotateY}deg`);
            button.classList.add('tilt');
        });

        button.addEventListener('mouseleave', () => {
            button.style.setProperty('--rotateX', '0deg');
            button.style.setProperty('--rotateY', '0deg');
            button.classList.remove('tilt');
        });

        // Ripple Effect
        button.addEventListener('click', (e) => {
            button.classList.remove('ripple');
            button.classList.add('ripple');
            setTimeout(() => {
                button.classList.remove('ripple');
            }, 600);
        });
    });

    // Loading State Demo (if needed)
    buttons.forEach(button => {
        if (button.dataset.loading === 'true') {
            button.classList.add('loading');
            setTimeout(() => {
                button.classList.remove('loading');
                button.classList.add('success');
            }, 2000);
        }
    });
});

// Helper function to add loading state
function setButtonLoading(button, isLoading = true) {
    if (isLoading) {
        button.classList.add('loading');
        button.disabled = true;
    } else {
        button.classList.remove('loading');
        button.disabled = false;
    }
}

// Helper function to set button state
function setButtonState(button, state) {
    button.classList.remove('success', 'error', 'loading');
    if (state) {
        button.classList.add(state);
    }
} 