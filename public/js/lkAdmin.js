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

async function loadDoctors() {
  const r1 = await fetch("/doctor");
  const p1 = await r1.json();
  for (let u1 of p1) {
    const response = await fetch("/users/supertokensID:" + u1.userSupertokensID);
    const doctor = await response.json().then(async (doctor) => {
      let doctorId = u1.id;
      let supertokensID = u1.userSupertokensID;
      let name = doctor.name;
      addDoctorToPage({doctorId, supertokensID, name })
    });
  }
}

function addDoctorToPage(data) {
  let doctors = document.getElementById("appointments_lk");
  let doctorField = document.createElement("tr");
  doctorField.id = "Doctor" + data.doctorId;
  let out = "<td>" + data.supertokensID + "</td>";
  out += "<td>" + data.name + "</td>";
  out += "<td><button onclick=\"deleteDoctor(" + data.doctorId + ")\">Вычеркнуть</button></td>";
  doctorField.innerHTML = out;
  doctors.appendChild(doctorField);
}

async function deleteDoctor(id) {
  const response = await fetch("/doctor/" + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  });
  const doctor = await response.json().then(async (doctor) => {
    let doctorField = document.getElementById('Doctor'+id);
    doctorField.remove();
    const responseUser = await fetch("/users/supertokensID:" + doctor.userSupertokensID);
    const user = await responseUser.json().then(async (user) => {
      const userBody = {supertokensID: doctor.userSupertokensID,
        email: user.email, name: user.name, role: 'USER'};
      await fetch("/users/supertokensID", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userBody),
      });
    })
  });
}

async function addDoctor() {
  let userId = document.getElementById('inputSupertokensId').value;
  let spec = document.getElementById('inputSpec').value;
  document.getElementById('inputSupertokensId').innerHTML = '';
  document.getElementById('inputSpec').innerHTML = '';
  document.getElementById('inputSupertokensId').value = '';
  document.getElementById('inputSpec').value = '';
  const doctorBody = {userSupertokensID: userId, specialization: spec};
  const responseDoctor = await fetch("/doctor",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(doctorBody)
  });
  const doctor = await responseDoctor.json().then(async (doctor) => {
    const response = await fetch("/users/supertokensID:" + userId);
    const user = await response.json().then(async (user) => {
      const userBody = {supertokensID: userId, email: user.email, name: user.name, role: 'DOCTOR'};
      await fetch("/users/supertokensID", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userBody)
      }).then(() => {
        let doctorId = doctor.id;
        let supertokensID = userId;
        let name = user.name;
        addDoctorToPage({doctorId, supertokensID, name })
      })
    })
  })
}

async function getUser() {
  if (await supertokens.doesSessionExist()) {
    let userId = await supertokens.getUserId();
    let userRole = (await supertokens.getAccessTokenPayloadSecurely())["role"];
    return ({ userId, userRole });
  }
}

