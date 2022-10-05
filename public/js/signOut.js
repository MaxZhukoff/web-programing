supertokens.init({
  apiDomain: "http://localhost:3000",
  apiBasePath: "/authapi"
});

document.getElementById("exit").addEventListener('click', async function(event) {
  async function logout() {
    await supertokens.signOut();
    window.location.href = "/";
  }
  if (await supertokens.doesSessionExist()) {
    logout();
    supertokens.attemptRefreshingSession();
  }
})
