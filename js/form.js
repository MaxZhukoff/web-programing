showAppointment()
function showAppointment() {
    let commentField = document.getElementById('comment-field');
    let out = '';
    if (localStorage.getItem("appoint") !== null) {
        let appointments = JSON.parse(localStorage.getItem('appoint'))
        out += `<p class="alert alert-primary" role="alert">Имя: ${appointments.first_name}</p>`;
        out += `<p class="alert alert-primary" role="alert">Фамилия: ${appointments.surname}</p>`;
        out += `<p class="alert alert-primary" role="alert">Отчество: ${appointments.middle_name}</p>`;
        out += `<p class="alert alert-primary" role="alert">Номер телефона: ${appointments.phone_number}</p>`;
        out += `<p class="alert alert-primary" role="alert">Время записи: ${appointments.date}</p>`;
        out += `<p class="alert alert-primary" role="alert">Врач: ${appointments.doctor}</p>`;
        commentField.innerHTML = out;
    }
}

document.getElementById("comment-add").addEventListener('click', function(event) {
    event.defaultPrevented;
    let appointment = {
        first_name: document.getElementById('first_name').value,
        surname: document.getElementById('surname').value,
        middle_name: document.getElementById('middle_name').value,
        phone_number: document.getElementById('phone_number').value,
        date: document.getElementById('date1').value,
        doctor: document.getElementById('doctor_sel').value
    }
    localStorage.setItem('appoint', JSON.stringify(appointment));
    showAppointment();
});
