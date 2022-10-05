window.addEventListener("load", async function(event) {
  let id = document.getElementById("id_lk");
  let name = document.getElementById("name_lk");
  let email = document.getElementById("email_lk");

  await ((getUser()).then(async r => {
    const response = await fetch("/users/supertokensID:" + r.userId);
    const json = await response.json().then((json) => {
      id.innerHTML = json.supertokensID;
      email.innerHTML = json.email;
      name.innerHTML = json.name;
    });
  }));
});

async function getAppointmentsUserLK() {
  await ((getUser()).then(async r => {
    const r1 = await fetch("/appointments");
    const p1 = await r1.json();
    for (let u1 of p1) {
      if (u1.userId === r.userId) {
        const response = await fetch("/users/supertokensID:" + u1.doctorId);
        const doctor = await response.json().then(async (doctor) => {
          const response1 = await fetch("/services/" + u1.serviceId);
          const service = await response1.json().then(async (service) => {
            const response2 = await fetch("/users/supertokensID:" + r.userId);
            const user = await response2.json().then(async (user) => {
              if (u1.visited) {
                let data = {
                  appointmentId: u1.id, date: u1.date,
                  doctorName: doctor.name, userName: user.name, serviceTitle: service.title,
                  content: u1.content, visited: true };
                addAppointmentHistoryLk(data);
              } else {
                let data = {
                  appointmentId: u1.id, date: u1.date,
                  doctorName: doctor.name, userName: user.name, serviceTitle: service.title, visited: false
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
  out += "<td>" + data.doctorName + "</td>";
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
  out += "<td>" + data.doctorName + "</td>";
  out += "<td>" + data.serviceTitle + "</td>";
  appointment.innerHTML = out;
  appointments.appendChild(appointment);
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