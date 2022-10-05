supertokens.init({
  apiDomain: "http://localhost:3000",
  apiBasePath: "/authapi"
});

document.getElementById("loginGitHub").addEventListener('click', async function(event) {
  const responseForm = await fetch("http://localhost:3000/authapi/authorisationurl?thirdPartyId=github",
    {
      method: "GET",
      headers: {
        rid: "thirdpartyemailpassword"
      }
    }
  ).then(responseForm => responseForm.json());

  console.log(responseForm)
  let urlObj = new URL(responseForm.url)
  urlObj.searchParams.append("redirect_uri", "http://localhost:3000/auth/callback/github");
  window.location.href = urlObj.toString();
})

document.getElementById("login").addEventListener('click', async function(event) {
  let user = {
    email: document.getElementById('inputEmail').value,
    password: document.getElementById('inputPassword').value,
  }
  const email = { id: "email", value: user.email };
  const password = { id: "password", value: user.password }
  const formFields = [email, password]
  const data = {formFields: formFields}
  const responseSingIn = await fetch("/authapi/signin", {
    method: "POST",
    credentials: "include",
    headers: {
      rid: "thirdpartyemailpassword",
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }).then(responseSingIn => responseSingIn.json());
  if (responseSingIn.status !== 'OK') {
    alert(JSON.stringify(responseSingIn.status));
    throw responseSingIn.status;
  }
  location.reload();
})
