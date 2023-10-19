import { React, useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {

    const [alertMail, setAlertMail] = useState();
    const [alertPass, serAlertPass] = useState();

    const handleChange = (e) => {
        e.preventDefault();

    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <>
        <form action="POST" onSubmit={handleSubmit} >           
            <label htmlFor="">mail
                <input type="email" required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" onChange={handleChange} />
            </label>
            <label htmlFor="">contraseña
                <input type="password" required minLength="8" onChange={handleChange} />
            </label>
            <input type="submit" value="Ingresar" />
            <Link to={'/register'}><input type="button" value="Registrate"/></Link> 
        </form>
        </>
    )
}

export default LoginForm;