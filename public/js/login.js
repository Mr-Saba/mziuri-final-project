document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('Username');
    const passwordInput = document.getElementById('password');
    const loginBtn = document.getElementById('loginBtn');

    loginBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        const username = usernameInput.value
        const password = passwordInput.value

        try {
            await fetch('/api/users/login', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({ username, password })
            })
            .then(res => res.json())
            .then(data =>{
                if(data.success){
                    window.location.href = '/'
                    // alert('Registation Succesful')
                }else{
                    // alert("Registration Failed")
                }
            })
            // alert(result);
        } catch(error) {
            console.error(error)
        }
    });
});
