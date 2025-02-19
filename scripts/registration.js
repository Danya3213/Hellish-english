document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.querySelector('#registrationNameInput');
    const phoneInput = document.querySelector('#registrationPhoneInput');
    const emailInput = document.querySelector('#registrationEmailInput');
    const commentTextarea = document.querySelector('#comment');
    const form = document.querySelector('#form');
    const submitBtn = document.querySelector('#registrationSubmitBtn');
    
    function sendEmail() {
      Email.send({
          Host: "smtp.gmail.com",
          Username: "dn0992947530@gmail.com",
          Password: "vvob phvf gxjx vgev",
          To: 'dn0992947530@gmail.com',
          From: "dn0992947530@gmail.com",
          Subject: "Test Email",
          Body: "This is a test email sent using SMTP.js"
      })
      .then(function (message) {
          alert("Mail sent successfully") // Alert message on successful email delivery
      });
  }


    let statusReady = false;

    submitBtn.addEventListener('click', async (e) => {
        
        sendEmail();
        console.log(1);
        
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
