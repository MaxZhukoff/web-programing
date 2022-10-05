const handleSubmitUpdateAppointment = ({
                                         appointmentId,
                                         date,
                                         doctorName,
                                         userName,
                                         serviceTitle,
                                         content,
                                         visited
                                       }) => {
  socket.emit("messageAppointmentUpdate", {
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

socket.on("messageAppointmentUpdate", ({ data }) => {
  buildUpdateAppointment(data).then();
});

const buildUpdateAppointment = async (message) => {
    let data = {
      appointmentId: message.appointmentId, date: message.date,
      doctorName: message.doctorName, userName: message.userName,
      serviceTitle: message.serviceTitle, content: message.content, visited: true
    };
    updateAppointmentToPage(data);
}

