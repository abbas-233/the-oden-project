// script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Real-time password validation
    [password, confirmPassword].forEach(field => {
        field.addEventListener('input', () => {
            validatePassword();
            validatePasswordMatch();
        });
    });

    // Form submission handler
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Simulate form submission
            alert('Account created successfully!');
            form.reset();
            clearErrors();
        }
    });

    // Validation functions
    function validateForm() {
        let isValid = true;
        clearErrors();

        // Validate all required fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            }
        });

        // Email validation
        const email = document.getElementById('email');
        if (!validateEmail(email.value)) {
            showError(email, 'Invalid email address');
            isValid = false;
        }

        // Phone validation
        const phone = document.getElementById('phone');
        if (!validatePhone(phone.value)) {
            showError(phone, 'Invalid phone number');
            isValid = false;
        }

        // Password validation
        if (!validatePassword()) isValid = false;
        if (!validatePasswordMatch()) isValid = false;

        return isValid;
    }

    function validatePassword() {
        const minLength = 8;
        if (password.value.length < minLength) {
            showError(password, `Password must be at least ${minLength} characters`);
            return false;
        }
        return true;
    }

    function validatePasswordMatch() {
        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, 'Passwords do not match');
            return false;
        }
        return true;
    }

    // Helper functions
    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[\d\s().-]+$/.test(phone);
    }

    function showError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = '#ff0000';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '4px';
        errorElement.textContent = message;
        
        // Insert after the input field
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }

    function clearErrors() {
        const errors = form.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
    }
});