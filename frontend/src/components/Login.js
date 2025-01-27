import React from 'react';
import logo from './../logo.svg';
import './../App.css';
import "@material-tailwind/react/tailwind.css";
import { isLogged } from '../constants';

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import CardFooter from "@material-tailwind/react/CardFooter";
import Input from "@material-tailwind/react/Input";
import Button from "@material-tailwind/react/Button";
import H5 from "@material-tailwind/react/Heading5";

var API = process.env.REACT_APP_API;

export const Login = () => {

    const handleSubmit = async (e) => {
        if(e.target.username.value === "" || e.target.password.value === "")
            window.location = "/";
        e.preventDefault();
        await e.preventDefault();
        fetch(`${API}/graphql`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `mutation{
                    auth(username:"${e.target.username.value}",password:"${e.target.password.value}")
                    {
                      accessToken
                      refreshToken
                    }
                  }`,
            }),
        })
            .then(res => res.json()).then(res => {
                if (res.data.auth == null)
                {
                    localStorage.setItem(isLogged,false);
                    window.location = "/";
                }
                else
                {
                    localStorage.setItem(isLogged,true);
                    window.location = "/home";
                }
                    
            });
    }

    if (localStorage.getItem(isLogged) === "true") {
        window.location = "/home";
        return;
    }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
            </header>
            <form className="LoginForm" onSubmit={handleSubmit}>
                <Card>
                    <CardHeader color="lightBlue" size="lg">
                        <H5 color="white">Inicio de Sesión</H5>
                    </CardHeader>

                    <CardBody>
                        <div className="mt-4 mb-8 px-4">
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                color="lightBlue"
                                placeholder="Usuario"
                                outline={true}
                            />
                        </div>
                        <div className="mb-4 px-4">
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                color="lightBlue"
                                placeholder="Contraseña"
                                outline={true}
                            />
                        </div>
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-center">
                            <Button
                                id="btnLogin"
                                color="lightBlue"
                                buttonType="button"
                                size="lg"
                                ripple="dark"
                            >
                                Iniciar Sesión
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </form>
        </div>
    );
}