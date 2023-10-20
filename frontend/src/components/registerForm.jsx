import { React, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginForm from "./loginForm";
import { createUser } from "../services/authServices";

function RegisterForm() {
    const navigate = useNavigate();

    const [alertMail, setAlertMail] = useState();
    const [alertPass, serAlertPass] = useState();

    const handleChange = (e) => {
        e.preventDefault();
        const product = ((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        return product
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const newUsr = {
            user: e.target.user.value,
            email:e.target.email.value,
            password:e.target.password.value
        }
        await createUser(newUsr);
        <Link to={'/home'} />
    }

    return (
        <>
            <form action="POST" onSubmit={handleSubmit} >
                <label htmlFor="email">E-mail
                    <input type="email" id="email" name="email" required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" onChange={handleChange} />
                </label>
                {/* <label htmlFor="repeatEmail">Repita el e-mail
                    <input type="email" id="repeatEmail" name="repeatEmail" required pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$" onChange={handleChange} />
                </label> */}
                <label htmlFor="user">Username
                    <input type="text" id="user" name="user" required onChange={handleChange}/>
                </label>
                <label htmlFor="password">Contraseña
                    <input type="password" id="password" name="password" required minLength="8" onChange={handleChange}/>
                </label>
                {/* <label htmlFor="repeatPassword">Repetir Contraseña
                    <input type="password" id="repeatPassword" name="repeatPassword" required minLength="8" />
                </label> */}

                <input type="submit" value="Continuar" />
                <Link to={'/'}><input type="button" value="Volver" /></Link>
            </form>
        </>
    )
}

export default RegisterForm;