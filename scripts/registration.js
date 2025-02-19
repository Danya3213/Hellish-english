document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.querySelector('#registrationNameInput');
    const phoneInput = document.querySelector('#registrationPhoneInput');
    const emailInput = document.querySelector('#registrationEmailInput');
    const commentTextarea = document.querySelector('#comment');
    const form = document.querySelector('#form');
    const submitBtn = document.querySelector('#registrationSubmitBtn');
    let statusReady = false;

    function listSend(event) {
      event.preventDefault(); // Зупиняємо стандартну відправку форми

      let formData = new FormData(form);
  
      fetch("https://formsubmit.co/ajax/dn0992947539@gmail.com", {
          method: "POST",
          body: formData
      })
      .then(response => response.json())
      .then(data => alert("Форма успішно відправлена!"))
      .catch(error => alert("Помилка при відправці"));
    };

    submitBtn.addEventListener("click", (event) => {

      if (formValCheck() === 0) {

            if (statusReady) {
                
              listSend(event); // Передаємо event
            }

          submitBtn.textContent = `All is right. Let's start?`;
          statusReady = true;

        } else {

          submitBtn.textContent = `I WANT A FREE LESSON`;
          alert('Введіть коректні дані');
      }
    });

    // submitBtn.onclick = () => {
    //     if (formValCheck() === 0) {
    //         statusReady = true;

    //         if (statusReady) {
                
    //           listSend();
    //         }

    //            submitBtn.textContent = `All is right. Let's start?`;
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
