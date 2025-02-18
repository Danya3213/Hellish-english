const formData = new FormData();
formData.append("From", "dn0992947530@gmail.com");
formData.append("FromName", "Danya test");
formData.append("Subject", "Test");
formData.append("To", "vladarduino@gmail.com");
formData.append("Text", "test");

axios.post("https://api.mailjet.com/v3/send", formData, {
  headers: {
    "Authorization": "Basic MDkxNTIyNTJlZTA1OThhY2Q3MDMyMDhkMDk4ZWNiNmE6YTc1YWY3ZjkxZDFkN2MxMzZiN2NiM2JjODZjZmIzYjk=",
    'Content-Type': 'application/json'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));


  // const email = {
  //   from: 'test@example.com',
  //   to: 'vladarduino@gmail.com',
  //   subject: 'Test email',
  //   text: 'This is a test email sent from the browser'
  // }
  // smtp.sendMail(email)
  //   .then(info => console.log(info))
  //   .catch(err => console.error(err))


document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.querySelector('#registrationNameInput');
    const phoneInput = document.querySelector('#registrationPhoneInput');
    const emailInput = document.querySelector('#registrationEmailInput');
    const commentTextarea = document.querySelector('#comment');
    const form = document.querySelector('#form');
    const submitBtn = document.querySelector('#registrationSubmitBtn');

    let statusReady = false;

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault(); // Заборона стандартної поведінки форми
    
        if (formValCheck() === 0) {
          const formData = {
            name: nameInput.value,
            email: emailInput.value,
            message: commentTextarea.value,
          };
    
          try {
            const response = await fetch('../netlify/functions/sendEmail', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            });
    
            const result = await response.json();
            alert(result.message);
    
            if (response.ok) {
              formReset();
            }
          } catch (error) {
            alert('Помилка, форма не відправлена');
          }
        } else {
          alert('Будь ласка, введіть коректні дані');
        }
      });

    // submitBtn.onclick = () => {
    //     if (formValCheck() === 0) {
    //         if (statusReady) {
                

    //         }

    //         submitBtn.textContent = `All is right. Let's start?`;
    //         statusReady = true;
    //     } else {
    //         submitBtn.textContent = `I WANT A FREE LESSON`;
    //         alert('Введіть коректні дані');
    //     }
    // }

    function formValCheck() {
        let nameInputValue = nameInput.value;
        let phoneInputValue = Number(phoneInput.value);
        let emailInputValue = emailInput.value;

        let error = 0;

        if (typeof(nameInputValue) === 'string' && nameInputValue.length < 10 && nameInputValue.length > 2 && !Number(nameInputValue)) {
            nameInput.classList.remove('error');
        } else {
            nameInput.classList.add('error');
            error++;
        }

        if (typeof(phoneInputValue) === 'number' && String(phoneInputValue).length === 12) {
            phoneInput.classList.remove('error');
        } else {
            phoneInput.classList.add('error');
            error++;
        }

        if (validateEmail(emailInputValue) !== null) {
            emailInput.classList.remove('error');
        } else {
            emailInput.classList.add('error');
            error++;
        }

        return error;
    }

    function formReset() {
        nameInput.value = '';
        phoneInput.value = '';
        emailInput.value = '';
        commentTextarea.value = '';
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
});
