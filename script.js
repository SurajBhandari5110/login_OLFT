// Ensure DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.createElement('button');

    // Add a button to toggle password visibility
    togglePasswordBtn.innerText = '👁️';
    togglePasswordBtn.className = 'toggle-password';
    togglePasswordBtn.type = 'button'; // Prevent form submission
    togglePasswordBtn.style.marginLeft = '10px';
    passwordInput.parentElement.appendChild(togglePasswordBtn);

    togglePasswordBtn.addEventListener('click', () => {
        // Toggle the password visibility
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePasswordBtn.innerText = type === 'password' ? '👁️' : '🙈';
    });

    // Form submission handler
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent actual form submission

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!email || !password) {
            alert('Please fill in both email and password.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        try {
            // Send login data to the API endpoint
            const response = await fetch('http://13.55.169.57:8080/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });

            // Check if the response is successful
            if (response.ok) {
                const data = await response.json();
                console.log('Response:', data); // Handle the response as needed
                // Optionally redirect the user or perform other actions
            } else {
                const errorData = await response.json();
                alert(`Login failed: ${errorData.message || 'Invalid email or password.'}`);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while trying to log in. Please try again later.');
        }
    });

    // Add Google button functionality (placeholder)
    const googleBtn = document.querySelector('.google-btn');
    googleBtn.addEventListener('click', () => {
        alert('Google login is currently under development.');
    });
});

// Helper function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
