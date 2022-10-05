window.addEventListener("load", async function(event) {
  const doctors = await fetch("/doctor");
  const jsonDoctors = await doctors.json();
  let outDoctors = "";
  for (let u of jsonDoctors) {
    const responseDoctor = await fetch("/users/supertokensID:" + u.userSupertokensID);
    if (!responseDoctor.ok) {
      alert("Error");
      throw Error;
    }
    const jsonDoctor = await responseDoctor.json();
    outDoctors += "<option id=\"" + u.userSupertokensID + "\" value=\"" + jsonDoctor.name + " - " + u.specialization + "\">" + jsonDoctor.name + " - " + u.specialization + "</option>";
  }

  document.getElementById("doctor_sel").innerHTML = outDoctors;
});

document.getElementById("doctor_sel").addEventListener("click", async function(event) {
  let outService = "";
  let doctorName = document.getElementById("doctor_sel").value;
  let doctor = document.getElementById("doctor_sel").querySelector("[value=\"" + doctorName + "\"]");
  let servicesField = document.getElementById("service_sel");
  const responseDoctor = await fetch("/doctor/supertokensID:" + doctor.id);
  if (!responseDoctor.ok) {
    alert("Error");
    throw Error;
  }
  const jsonDoctor = await responseDoctor.json();
  const services = await fetch("/services");
  const jsonServices = await services.json();
  for (let u of jsonServices) {
    if (jsonDoctor.specialization === u.doctorSpecialization)
      outService += "<option id=\"" + u.id + "\" value=\"" + u.title + " - " + u.price + "\">" + u.title + " - " + u.price + "$</option>";
  }
  servicesField.innerHTML = outService;
});

document.getElementById("appointment_add").addEventListener("click", async function(event) {

  await ((getUser()).then(async r => {
    event.defaultPrevented;
    let appointment = {
      name: "",
      date: document.getElementById("date1").value,
      service: document.getElementById("service_sel").value,
      doctor: document.getElementById("doctor_sel").value
    };

    let doctor = document.getElementById("doctor_sel").querySelector("[value=\"" + appointment.doctor + "\"]");
    let doctorId = doctor.id;

    let service = document.getElementById("service_sel").querySelector("[value=\"" + appointment.service + "\"]");
    let serviceId = service.id;
    const date = new Date(appointment.date);

    const appointmentJson = {
      date: date,
      content: "",
      doctorId: doctorId,
      userId: r.userId,
      serviceId: parseInt(serviceId)
    };
    const response2 = await fetch("/appointments/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(appointmentJson)
    });

    if (!response2.ok) {
      window.alert("Что-то пошло не так");
      throw Error;
    }
    const appointmentAnswer = await response2.json().then(async (appointmentAnswer) => {
      const response3 = await fetch("/users/supertokensID:" + doctorId);
      const doctor = await response3.json().then(async (doctor) => {
        const response4 = await fetch("/users/supertokensID:" + r.userId);
        const userName = await response4.json().then(async (userName) => {
          const response5 = await fetch("/services/" + serviceId);
          const serviceTitle = await response5.json().then(async (serviceTitle) => {

            let data = {
              appointmentId: appointmentAnswer.id, date: date,
              doctorName: doctor.name, userName: userName.name, serviceTitle: serviceTitle.title,
              content: '', visited: false
            };
            handleSubmitNewAppointment(data);

            window.alert("Вы успешно записались!");
          });
        });
      });
    });
  }));
});

let loadDoctors = (async function() {

});

async function getUser() {
  if (await supertokens.doesSessionExist()) {
    let userId = await supertokens.getUserId();
    let userRole = (await supertokens.getAccessTokenPayloadSecurely())["role"];
    return ({ userId, userRole });
  } else {
    alert("Для записи необходимо авторизоваться");
    throw "Unauthorized";
  }
}
