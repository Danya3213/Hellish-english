const sgMail = require('@sendgrid/mail');

// Встановіть API-ключ SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event) => {
    // Перевірка методу запиту
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method Not Allowed' }),
        };
    }

    // Отримання даних з форми
    const { name, email, message } = JSON.parse(event.body);

    // Налаштування листа
    const msg = {
        to: 'dn0992947530@gmail.com', // Ваша електронна пошта
        from: 'dn0992947530@gmail.com', // Відправник (має бути підтверджений у SendGrid)
        subject: 'Нове повідомлення з форми',
        text: `Ім'я: ${name}\nEmail: ${email}\nПовідомлення: ${message}`,
        html: `<strong>Ім'я:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Повідомлення:</strong> ${message}`,
    };

    try {
        // Відправка листа
        await sgMail.send(msg);
        return {
            statusCode: 200,
            body: JSON.stringify({ status: 'success', message: 'Повідомлення успішно відправлено!' }),
        };
    } catch (error) {
        console.error('SendGrid Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ status: 'error', message: 'Помилка при відправці повідомлення' }),
        };
    }
};