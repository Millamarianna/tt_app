
import useAuth from "../hooks/useAuth";


const User = () => {

  const { isLoggedIn, setLoggedIn, auth, setAuth } = useAuth();

  return (
    <>
      <div>Nimi : {auth.first_name} {auth.last_name}</div>
      <div>Hi User</div>
      <div>Hi User</div>
    </>
  )

}

export default User