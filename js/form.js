let check_first_name = false;
let check_surname = false;
let check_middle_name = false;
let check_phone_number = false;
let check_date = false;
let check_doctor = false;
let first_load = true;

function showAppointment() {
    let appointments = JSON.parse(localStorage.getItem('appoint'));
    let appointment_field = document.getElementById('appointments_field');
    let out = '';
    for (let item in appointments) {
        out += '<tr>'
        if (check_first_name)
            out += '<td class="table-success">' + appointments[item].first_name + '</td>'
        if (check_surname)
            out += '<td class="table-success">' + appointments[item].surname + '</td>'
        if (check_middle_name)
            out += '<td class="table-success">' + appointments[item].middle_name + '</td>'
        if (check_phone_number)
            out += '<td class="table-success">' + appointments[item].phone_number + '</td>'
        if (check_date)
            out += '<td class="table-success">' + appointments[item].date + '</td>'
        if (check_doctor)
            out += '<td class="table-success">' + appointments[item].doctor + '</td>'
        out += '</tr>'
        appointment_field.innerHTML = out;
    }
}

document.getElementById("table_add").addEventListener('click', function (event) {
    event.preventDefault();
    if (document.getElementById('check_first_name').checked)
        check_first_name = true;
    if (document.getElementById('check_surname').checked)
        check_surname = true;
    if (document.getElementById('check_middle_name').checked)
        check_middle_name = true;
    if (document.getElementById('check_phone_number').checked)
        check_phone_number = true;
    if (document.getElementById('check_date').checked)
        check_date = true;
    if (document.getElementById('check_doctor').checked)
        check_doctor = true;
    let checkboxField = document.getElementById('delete');
    let columnsTable_field = document.getElementById('columnsTable_field');
    let out = ''
    if (check_first_name)
        out += '<th scope="col">Имя</th>'
    if (check_surname)
        out += '<th scope="col">Фамилия</th>'
    if (check_middle_name)
        out += '<th scope="col">Отчество</th>'
    if (check_phone_number)
        out += '<th scope="col">Номер телефона</th>'
    if (check_date)
        out += '<th scope="col">Время записи</th>'
    if (check_doctor)
        out += '<th scope="col">Врач</th>'
    columnsTable_field.innerHTML = out;
    checkboxField.innerHTML = '';
    first_load = false;
    showAppointment();
});

document.getElementById("appointment_add").addEventListener('click', function (event) {
    event.defaultPrevented;
    let appointment = {
        first_name: document.getElementById('first_name').value,
        surname: document.getElementById('surname').value,
        middle_name: document.getElementById('middle_name').value,
        phone_number: document.getElementById('phone_number').value,
        date: document.getElementById('date1').value,
        doctor: document.getElementById('doctor_sel').value
    }
    let appointments = [];
    if (localStorage.getItem("appoint") !== null) {
        appointments = JSON.parse(localStorage.getItem('appoint'));
    }
    appointments.push(appointment);
    localStorage.setItem('appoint', JSON.stringify(appointments));
    if (!first_load) {
        showAppointment();
    }
});
