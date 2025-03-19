// script.js
/* ===== MAIN VALIDATION SYSTEM ===== */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    // Real-time Password Validation
    const passwordFields = [password, confirmPassword];
    passwordFields.forEach(field => {
        field.addEventListener('input', () => {
            validatePasswordStrength();
            validatePasswordMatch();
        });
    });

    // Form Submission Handler
    form.addEventListener('submit', handleFormSubmit);

    /* ===== CORE VALIDATION FUNCTIONS ===== */
    function handleFormSubmit(e) {
        e.preventDefault();
        if (validateForm()) {
            // Successful submission handling
            alert('Account created successfully!');
            form.reset();
            clearAllErrors();
        }
    }

    function validateForm() {
        let isValid = true;
        clearAllErrors();

        // Validate Required Fields
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                showFieldError(field, 'This field is required');
                isValid = false;
            }
        });

        // Field-Specific Validations
        isValid = validateEmailField() && isValid;
        isValid = validatePhoneField() && isValid;
        isValid = validatePasswordStrength() && isValid;
        isValid = validatePasswordMatch() && isValid;

        return isValid;
    }

    /* ===== FIELD-SPECIFIC VALIDATORS ===== */
    function validateEmailField() {
        const emailField = document.getElementById('email');
        const email = emailField.value.trim();
        
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
            showFieldError(emailField, 'Invalid email format');
            return false;
        }
        return true;
    }

    function validatePhoneField() {
        const phoneField = document.getElementById('phone');
        const phone = phoneField.value.replace(/\D/g, ''); // Remove non-digits
        
        if (phone.length < 10 || phone.length > 15) {
            showFieldError(phoneField, 'Invalid phone number (10-15 digits)');
            return false;
        }
        return true;
    }

    function validatePasswordStrength() {
        const passwordValue = password.value;
        let isValid = true;
        
        // Complexity Requirements
        const requirements = {
            minLength: 8,
            hasUpper: /[A-Z]/.test(passwordValue),
            hasNumber: /\d/.test(passwordValue),
            hasSpecial: /[!@#$%^&*]/.test(passwordValue)
        };

        // Build error message for missing criteria
        const errors = [];
        if (passwordValue.length < requirements.minLength) {
            errors.push(`At least ${requirements.minLength} characters`);
        }
        if (!requirements.hasUpper) errors.push('One uppercase letter');
        if (!requirements.hasNumber) errors.push('One number');
        if (!requirements.hasSpecial) errors.push('One special character');

        if (errors.length > 0) {
            showFieldError(password, `Password needs: ${errors.join(', ')}`);
            isValid = false;
        }
        return isValid;
    }

    function validatePasswordMatch() {
        if (password.value !== confirmPassword.value) {
            showFieldError(confirmPassword, 'Passwords do not match');
            return false;
        }
        return true;
    }

    /* ===== ERROR HANDLING UTILITIES ===== */
    function showFieldError(field, message) {
        // Remove existing errors first
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) existingError.remove();

        // Create new error element
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#dc3545';
        errorElement.style.fontSize = '0.8rem';
        errorElement.style.marginTop = '0.25rem';

        // Add ARIA attributes for accessibility
        field.setAttribute('aria-invalid', 'true');
        field.parentNode.appendChild(errorElement);
    }

    function clearAllErrors() {
        const errors = form.querySelectorAll('.error-message');
        errors.forEach(error => error.remove());
        
        // Clear ARIA invalid states
        const fields = form.querySelectorAll('[aria-invalid="true"]');
        fields.forEach(field => field.removeAttribute('aria-invalid'));
    }
});

/* ===== ENHANCED VALIDATOR CLASS (Alternative Approach) ===== */
class FormValidator {
    constructor(formId, config = {}) {
        this.form = document.getElementById(formId);
        this.config = {
            password: {
                minLength: 8,
                requireUpper: true,
                requireNumber: true,
                requireSpecial: true,
                ...config.password
            },
            ...config
        };
        
        this.initializeValidation();
    }

    initializeValidation() {
        // Event Listeners
        this.form.addEventListener('submit', e => this.handleSubmit(e));
        this.setupRealTimeValidation();
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.validateAllFields()) {
            this.form.submit(); // Or handle submission
        }
    }

    setupRealTimeValidation() {
        // Validate on input and blur
        this.form.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
    }

    /* ===== CORE VALIDATION LOGIC ===== */
    validateAllFields() {
        return Array.from(this.form.elements)
            .filter(element => element.tagName === 'INPUT')
            .every(input => this.validateField(input));
    }

    validateField(input) {
        this.clearFieldError(input);
        const value = input.value.trim();

        // Common validations
        if (input.required && !value) {
            return this.showFieldError(input, 'This field is required');
        }

        // Type-specific validations
        switch(input.type) {
            case 'email': return this.validateEmail(input);
            case 'tel': return this.validatePhone(input);
            case 'password': 
                return input.id === 'confirmPassword' 
                    ? this.validatePasswordConfirm(input)
                    : this.validatePassword(input);
            default: return true;
        }
    }

    /* ===== SPECIALIZED VALIDATORS ===== */
    validateEmail(input) {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value);
        return isValid || this.showFieldError(input, 'Invalid email format');
    }

    validatePhone(input) {
        const digits = input.value.replace(/\D/g, '');
        const isValid = digits.length >= 10 && digits.length <= 15;
        return isValid || this.showFieldError(input, 'Invalid phone number');
    }

    validatePassword(input) {
        const errors = [];
        const value = input.value;

        if (value.length < this.config.password.minLength) {
            errors.push(`Minimum ${this.config.password.minLength} characters`);
        }
        if (this.config.password.requireUpper && !/[A-Z]/.test(value)) {
            errors.push('One uppercase letter');
        }
        if (this.config.password.requireNumber && !/\d/.test(value)) {
            errors.push('One number');
        }
        if (this.config.password.requireSpecial && !/[!@#$%^&*]/.test(value)) {
            errors.push('One special character');
        }

        return errors.length === 0 || 
            this.showFieldError(input, `Password needs: ${errors.join(', ')}`);
    }

    validatePasswordConfirm(input) {
        const password = this.form.querySelector('#password').value;
        return input.value === password || 
            this.showFieldError(input, 'Passwords must match');
    }

    /* ===== ERROR MANAGEMENT ===== */
    showFieldError(input, message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        input.parentNode.appendChild(error);
        input.setAttribute('aria-invalid', 'true');
        return false;
    }

    clearFieldError(input) {
        const error = input.parentNode.querySelector('.error-message');
        if (error) error.remove();
        input.removeAttribute('aria-invalid');
    }
}

// Initialize either validation system (not both!)
// const validator = new FormValidator('signupForm');