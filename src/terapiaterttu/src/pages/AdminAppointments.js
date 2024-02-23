
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from 'react';


const AdminAppointments = () => {
  const [fetchAgain, setFetchAgain] = useState(0);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const { isLoggedIn, setLoggedIn, auth, setAuth } = useAuth();
  const cookie = require('cookie');

  useEffect(() => {
  const getAppointments = async () => {
    const token = cookie.parse(document.cookie).jwt;
    const response = await fetch("https://damp-basin-12729-bd0230035c83.herokuapp.com/appt", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      let apptData = await response.json();
      console.log("getAppointmets:" + apptData);
      setAppointments(apptData);
    }
    else {
      console.log("getAppointments, response not ok");
    }
  };
  getAppointments();
}, [])



  return (
    <div>
      {appointments.map(function(data) {
      return (
        <div key={data._id}>
          Appointment date:  {data.date}
        </div>
      )
    })}
    </div>
  )

}

export default AdminAppointments