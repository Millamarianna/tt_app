
import useAuth from "../hooks/useAuth";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';


const AdminCreateAppointments = () => {
  const [apiError, setApiError] = useState();
  const [fetchAgain, setFetchAgain] = useState(0);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const { isLoggedIn, setLoggedIn, auth, setAuth } = useAuth();
  const cookie = require('cookie');
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const [customersLoading, setCustomersLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  useEffect(() => {
    const fetchCustomers = () => {
      fetch("https://fam-backend-base.azurewebsites.net/users")
        .then((res) => res.json())
        .then((data) => {
          setCustomers(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchCustomers();
  }, [fetchAgain])

  useEffect(() => {
    if (customers.length === 0) {
      setFetchAgain(fetchAgain + 1);
    }
    else {
      console.log(customers);
      setCustomersLoading(false);
    }
  }, [])

  const handleSelectChange = (e) => {
    setSelectedCustomer(e.target.value);
  };

  const onFormSubmit = async (data) => {
    data = { ...data, cancelled: false };
    const id = selectedCustomer;
    const response = await fetch(`https://fam-backend-base.azurewebsites.net/appt/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const result = await response.json();
      console.log("onnistui");
    } else {
      let errorResponse = await response.json();
      setApiError(errorResponse["detail"]);
      console.log("ei onnistunut:" + errorResponse["detail"]);
    }
  };

  const onErrors = (errors) => console.error(errors);

  return (
    <div className="mx-auto p-10 rounded-lg shadow-2xl">
      <h2 className="text-xl text-primary text-center font-bold my-2">
        Uusi ajanvaraus
      </h2>

      <Form.Select aria-label="Default select example" onChange={handleSelectChange} value={selectedCustomer}>
        <option>Asiakas</option>
        {customers.map(function (data) {
          return (
            <option key={data._id} value={data._id}>{data.first_name} {data.last_name}</option>
          )
        })}
      </Form.Select>

      <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
        <div className="flex flex-col justify-center items-center">
          <input
            type="text"
            placeholder="00/00/0000"
            className="input input-bordered input-accent w-full max-w-xs m-3"
            name="date"
            autoComplete="off"
            {...register("date", { required: "The date is required" })}
          />
          {errors?.date && errors.date.message}

          <input
            type="text"
            placeholder="00:00"
            className="input input-bordered input-accent w-full max-w-xs m-3"
            name="time"
            autoComplete="off"
            {...register("time", { required: "The time is required" })}
          />
          {errors?.time && errors.time.message}

          <input
            type="text"
            placeholder="00"
            className="input input-bordered input-accent w-full max-w-xs m-3"
            name="duration"
            autoComplete="off"
            {...register("duration", { required: "The duration is required" })}
          />
          {errors?.duration && errors.duration.message}

          <button className="btn btn-outline btn-accent m-3 btn-block">
            Tee ajanvaraus
          </button>
        </div>
      </form>

      {apiError && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{apiError}</span>
          </div>
        </div>
      )}
    </div>
  );
};


export default AdminCreateAppointments