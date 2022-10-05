window.addEventListener("load", async function(event) {
  let id = document.getElementById("id_lk");
  let name = document.getElementById("name_lk");
  let email = document.getElementById("email_lk");
  let spec = document.getElementById("spec_lk");

  await ((getUser()).then(async r => {
    const response = await fetch("/users/supertokensID:" + r.userId);
    const json = await response.json().then((json) => {
      id.innerHTML = json.supertokensID;
      email.innerHTML = json.email;
      name.innerHTML = json.name;
    });
    const response2 = await fetch("/doctor/supertokensID:" + r.userId);
    const json2 = await response2.json().then((json2) => {
      spec.innerHTML = json2.specialization;
    });
  }));
});

async function getAppointmentsDoctorLK() {
  await ((getUser()).then(async r => {
    const r1 = await fetch("/appointments");
    const p1 = await r1.json();
    for (let u1 of p1) {
      if (u1.doctorId === r.userId) {
        const response = await fetch("/users/supertokensID:" + u1.userId);
        const user = await response.json().then(async (user) => {
          const response1 = await fetch("/services/" + u1.serviceId);
          const service = await response1.json().then(async (service) => {
            const response2 = await fetch("/users/supertokensID:" + r.userId);
            const doctor = await response2.json().then(async (doctor) => {
              if (u1.visited) {
                let data = {
                  appointmentId: u1.id, date: u1.date,
                  userName: user.name, doctorName: doctor.name, serviceTitle: service.title,
                  content: u1.content, visited: true
                };
                addAppointmentHistoryLk(data);
              } else {
                let data = {
                  appointmentId: u1.id, date: u1.date,
                  userName: user.name, doctorName: doctor.name, serviceTitle: service.title, visited: false
                };
                addAppointmentLk(data);
              }
            });
          });
        });
      }
    }
  }));
}

function addAppointmentHistoryLk(data) {
  let appointment = document.createElement("tr");
  appointment.id = data.appointmentId;
  let appointments = document.getElementById("appointmentsHistory_lk");
  let out = "<td>" + data.date + "</td>";
  out += "<td>" + data.userName + "</td>";
  out += "<td>" + data.serviceTitle + "</td>";
  out += "<td>" + data.content + "</td>";
  appointment.innerHTML = out;
  appointments.appendChild(appointment);
}

function addAppointmentLk(data) {
  let appointment = document.createElement("tr");
  appointment.id = data.appointmentId;
  let appointments = document.getElementById("appointments_lk");
  let out = "<td>" + data.date + "</td>";
  out += "<td>" + data.userName + "</td>";
  out += "<td>" + data.serviceTitle + "</td>";
  out += "<td><textarea class=\"form-control\" id=\"Diagnosis" + data.appointmentId + "\" rows=\"2\"></textarea></td>";
  out += "<td><button type=\"button\" onclick=\"updateAppointment(" + data.appointmentId + ");\" class=\"btn btn-dark\">Сохранить</button></td>";
  appointment.innerHTML = out;
  appointments.appendChild(appointment);
}

async function updateAppointment(id) {
  let diagnosis = document.getElementById("Diagnosis" + id + "").value;
  const response = await fetch("/appointments/" + parseInt(id));
  const appointment = await response.json().then(async (appointment) => {
    const appointmentBody = {
      date: appointment.date, content: diagnosis,
      visited: true, doctorId: appointment.doctorId, userId: appointment.userId,
      serviceId: appointment.serviceId
    };
    await fetch("/appointments/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appointmentBody)
    }).then(async () => {
      const response2 = await fetch("/users/supertokensID:" + appointment.doctorId);
      const doctor = await response2.json().then(async (doctor) => {
        const appointment = document.getElementById(id);
        let data = {
          appointmentId: id, date: appointmentBody.date, userName: appointment.childNodes[1].innerHTML,
          doctorName: doctor.name, serviceTitle: appointment.childNodes[2].innerHTML,
          content: diagnosis, visited: true };
        handleSubmitUpdateAppointment(data);
      });
    });
  });
}

function updateAppointmentToPage(data) {
  const appointment = document.getElementById(data.appointmentId);
  appointment.remove();
  addAppointmentHistoryLk(data)
}

async function getUser() {
  if (await supertokens.doesSessionExist()) {
    let userId = await supertokens.getUserId();
    let userRole = (await supertokens.getAccessTokenPayloadSecurely())["role"];
    return ({ userId, userRole });
  }
}