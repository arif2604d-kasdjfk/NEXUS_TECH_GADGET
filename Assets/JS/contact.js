document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    // Inputs
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    // Real-time validation clear on input
    [fullName, email, subject, message].forEach(input => {
        input.addEventListener('input', () => {
            const formGroup = input.parentElement;
            if (formGroup.classList.contains('invalid')) {
                formGroup.classList.remove('invalid');
            }
        });
    });

    // Form Submission Handler
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate Fields
        let isValid = true;

        if (!fullName.value.trim()) {
            showError(fullName);
            isValid = false;
        }

        if (!validateEmail(email.value.trim())) {
            showError(email);
            isValid = false;
        }

        if (!subject.value) {
            showError(subject);
            isValid = false;
        }

        if (!message.value.trim()) {
            showError(message);
            isValid = false;
        }

        // If form is valid, simulate sending process
        if (isValid) {
            // Button loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
            
            // Simulate API Network Request (2 seconds)
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;

                // Show Success Message
                formStatus.className = 'form-status success';
                formStatus.textContent = '⚡ Thank you! Your message has been sent successfully. We will get back to you shortly.';

                // Reset Form
                contactForm.reset();

                // Clear status after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 5000);

            }, 2000);
        }
    });

    function showError(input) {
        const formGroup = input.parentElement;
        formGroup.classList.add('invalid');
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});