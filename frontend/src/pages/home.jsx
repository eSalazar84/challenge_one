import { React, userContext } from "react";
import { AuthCtx } from "../context/authContext";

function Home() {

    const { user } = userContext
    return (
        <>
        <h1>Bienvenido!! {user} </h1>
        </>
    )

};

export default Home;