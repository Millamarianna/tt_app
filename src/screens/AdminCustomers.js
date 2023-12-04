import { Text, useState, useEffect } from 'react';

const AdminCustomers = () => {
  const [fetchAgain, setFetchAgain] = useState(0);
  const [customersLoading, setCustomersLoading] = useState(true);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = () => {
      fetch("https://damp-basin-12729-bd0230035c83.herokuapp.com/users")
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

  return (
    <div>
      {customers.map(function(data) {
      return (
        <div key={data._id}>
          Customer name:  {data.first_name}
        </div>
      )
    })}
    </div>
  )

}

export default AdminCustomers