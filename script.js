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
       

        try {
            // Send login data to the API endpoint
            const response = await fetch('http://13.55.169.57:8080/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            // Process the response
            if (response.ok) {
                const responseData = await response.json();

                // Check if email and password match the response
               
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Invalid email or password. Please try again.');
                }
           
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred while trying to log in. Please try again later.');
        }
    });

   
});



