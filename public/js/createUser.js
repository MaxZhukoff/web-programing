supertokens.init({
  apiDomain: "http://localhost:3000",
  apiBasePath: "/authapi"
});

document.getElementById("reg").addEventListener("click", async function(event) {
  let user = {
    name: document.getElementById("inputNameReg").value,
    email: document.getElementById("inputEmailReg").value,
    password: document.getElementById("inputPasswordReg").value,
    checkPassword: document.getElementById("inputPasswordCheckReg").value
  };

  if (user.password !== user.checkPassword) {
    alert("Пароли не совпадают.");
    throw "Passwords do not match";
  }
//testpassword123
  const email = { id: "email", value: user.email };
  const password = { id: "password", value: user.password };
  const formFields = [email, password];
  const data = { formFields: formFields };

  const responseSingUp = await fetch("/authapi/signup", {
    method: "POST",
    credentials: "include",
    headers: {
      rid: "thirdpartyemailpassword",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(responseSingUp => responseSingUp.json().then((responseSingUp) => f({
    responseSingUp: responseSingUp,
    email: user.email,
    password: user.password,
    name: user.name
  })));
});

async function f(data) {
  if (data.responseSingUp.status !== "OK") {
    console.log(data.responseSingUp)
    alert(data.responseSingUp.formFields[0]);
    throw data.responseSingUp.status;
  } else {
    const dataRegisterDB = {
      supertokensID: data.responseSingUp.user.id,
      email: data.email,
      name: data.name,
      role: "USER"
    };
    await fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(dataRegisterDB)
      }
    )
    location.reload();
  }
}
