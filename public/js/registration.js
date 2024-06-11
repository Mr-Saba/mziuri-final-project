document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('name');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('repeatPassword');
    const registerBtn = document.getElementById('registerBtn');
    const emailErrorP = document.getElementById('emailErrorP');
    const passwordErrorP = document.getElementById('passwordErrorP');
    const confirmPasswordErrorP = document.getElementById('confirmPasswordErrorP');

    const errorMessages = {
        email: 'enter valid email',
        password: 'enter strong password',
        confirmPassword: 'password does not match'
    };

    registerBtn.addEventListener('click', (e) => {
        e.preventDefault()
        if (!usernameInput.value.trim() || !nameInput.value.trim()) {
            alert('please fill everything')
            return; 
        }
        checkValidations()


        function checkValidations() {
            let isEmailValid = checkEmailValidation()
            let isPasswordValid = checkPasswordValidation()
            let isConfirmPasswordValid = checkConfirmPasswordValidation()

            if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
                const registrationData = {
                    name: nameInput.value,
                    username: usernameInput.value,
                    password: passwordInput.value,
                    email: emailInput.value
                }

                fetch('/api/users/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(registrationData)
                })
                .then(res => res.json())
                .then(data =>{
                    if(data.success){
                        window.location.href = '/'
                    }else{
                        // alert("Registration Failed")
                    }
                })
                .catch(error => {
                    console.error('Error:', error)
                });
            }
        }

        function checkEmailValidation() {
            if (!emailInput.value.includes('@')) {
                emailErrorP.innerText = errorMessages.email;
                emailErrorP.classList.add('error')
                return false;
            } else {
                emailErrorP.innerText = '';
                emailInput.classList.remove('error')
                return true;
            }
        }
        function checkPasswordValidation() {
            const specialSymbolsArr = ['@', '#', '!', '$', '%'];
            const password = passwordInput.value;
        
            for (let i = 0; i < password.length; i++) {
                let char = password[i];
        
                if (specialSymbolsArr.includes(char)) {
                    passwordErrorP.innerText = '';
                    passwordInput.classList.remove('error');
                    return true; // Return true if a special symbol is found
                }
            }
        
            // If the loop completes without finding any special symbol, display error message and return false
            passwordErrorP.innerText = errorMessages.password;
            passwordErrorP.classList.add('error');
            return false;
        }
        
        
        function checkConfirmPasswordValidation() {
            if (confirmPasswordInput.value !== passwordInput.value) {
                confirmPasswordErrorP.innerText = errorMessages.confirmPassword
                confirmPasswordErrorP.classList.add('error');
                return false;
            } else {
                confirmPasswordErrorP.innerText = '';
                confirmPasswordInput.classList.remove('error')
                return true
            }
        }
    });
});
