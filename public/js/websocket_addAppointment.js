const socket = io("http://localhost:3000");

const handleSubmitNewAppointment = ({ appointmentId, date, doctorName, userName, serviceTitle, content, visited }) => {
  socket.emit("messageAppointmentCreate", {
    data: {
      appointmentId,
      date,
      doctorName,
      userName,
      serviceTitle,
      content,
      visited
    }
  });
};

socket.on("messageAppointmentCreate", ({ data }) => {
  buildNewAppointment(data).then();
});

const buildNewAppointment = async (message) => {
  if (window.location.href.toString().split(window.location.host)[1] !== "/sign_up_for_an_appointment") {
    await ((getUser()).then(async r => {
      if (r.userRole === "USER") {
        if (message.visited) {
          let data = {
            appointmentId: message.appointmentId, date: message.date,
            doctorName: message.doctorName, serviceTitle: message.doctorName,
            content: message.content
          };
          addAppointmentHistoryLk(data);
        } else {
          let data = {
            appointmentId: message.appointmentId, date: message.date,
            doctorName: message.doctorName, serviceTitle: message.serviceTitle
          };
          addAppointmentLk(data);
        }
      } else if (r.userRole === "DOCTOR") {
        if (message.visited) {
          let data = {
            appointmentId: message.appointmentId, date: message.date,
            userName: message.userName, serviceTitle: message.doctorName,
            content: message.content
          };
          addAppointmentHistoryLk(data);
        } else {
          let data = {
            appointmentId: message.appointmentId, date: message.date,
            userName: message.userName, serviceTitle: message.serviceTitle
          };
          addAppointmentLk(data);
        }
      }
    }));
  }
};

async function getUser() {
  if (await supertokens.doesSessionExist()) {
    let userId = await supertokens.getUserId();
    let userRole = (await supertokens.getAccessTokenPayloadSecurely())["role"];
    return ({ userId, userRole });
  }
}
