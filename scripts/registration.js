
const sendEmail = async () => {
  const apiKeyPublic = '09152252ee0598acd703208d098ecb6a';
  const apiKeyPrivate = 'a75af7f91d1d7c136b7cb3bc86cfb3b9';
  const auth = btoa(`${apiKeyPublic}:${apiKeyPrivate}`);

  const response = await fetch('https://api.mailjet.com/v3/send', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify({
          FromEmail: 'danya@dev.com',
          FromName: 'Danya test',
          Subject: 'Test',
          "Text-part": 'Test',
          "Html-part": 'Test',
          Recipients: [{ Email: 'vladarduino@gmail.com' }]
      })
  });

  const data = await response.json();
  console.log(data);
};

sendEmail();

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
