const nameInput = document.querySelector('#registrationNameInput');
const phoneInput = document.querySelector('#registrationPhoneInput');
const emailInput = document.querySelector('#registrationEmailInput');
const commentTextarea = document.querySelector('#Comment');
const form = document.querySelector('#form')
const submitBtn = document.querySelector('#registrationSubmitBtn');

let statusReady = false;

async function formSend() {

    // let formData = new FormData(form);

    if (!formValCheck()) {

        form.classList.add('_sending');

        // let response = await fetch('sendmail.php', {

        //     method: 'POST',
        //     body: formData
        // });

        // if (response.ok) {

        //     let result = await response.json();
        //     alert(result.message);
        //     formReset();
        //     form.classList.remove('_sending');
        // } else {

        //     alert(`Error, form didn't send`);
        //     form.classList.remove('_sending');
        // }
    }
}



submitBtn.onclick = () => {

    if (formValCheck() === 0) {

        if (statusReady) {

            formSend();
        }

        submitBtn.textContent = `All is right. Lest's start?`;
        statusReady = true;

    } else {

        submitBtn.textContent = `I WANT A FREE LESSON`;
        alert('Вписуйте тільки те, що вас просять');
    }
}

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
        error++
    }

    if (validateEmail(emailInputValue) !== null) {

        emailInput.classList.remove('error');
    } else {

        emailInput.classList.add('error');
        error++
    }

    return (error);
}

function formReset() {

    nameInput.value = '';
    phoneInput.value = '';
    emailInput.value = '';
}

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};