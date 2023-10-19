import { React, userContext } from "react";
import { AuthCtx } from "../context/authContext";

function Home() {

    const { user } = userContext
    return (
        <>
        <h1>Bienvenidos!!</h1>
        </>
    )

};

export default Home;