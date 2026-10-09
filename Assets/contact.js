document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault(); // Page refresh roknay ke liye

        // Button state ko loading mein badalna
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending Message...`;

        // Simulate network request (1.5 seconds delay)
        setTimeout(() => {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;

            // Show success alert message
            successMessage.style.display = 'flex';

            // Reset form fields
            contactForm.reset();

            // Hide success alert automatically after 6 seconds
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 6000);

        }, 1500);
    });
});