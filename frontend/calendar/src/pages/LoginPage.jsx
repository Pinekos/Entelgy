import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const USERS_URL = 'http://localhost:8081/api/users';
const EVENTS_URL = 'http://localhost:8081/api/events';

export const LoginPage = () => {
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState('');

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

        if (registerData.password !== registerData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const response = await fetch(`${USERS_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registerData)
        });

        const result = await response.json();
        console.log(result);
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await axios.post(`${USERS_URL}/login`, loginData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            console.log('Login successful:', response.data);
            const user = response.data;
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = `${EVENTS_URL}/${user.id}`;

        } catch (error) {
            if (error.response) {
                console.log('Error data:', error.response.data);
                console.log('Error status:', error.response.status);
                setError('Credenciales inválidas');
            } else if (error.request) {
                console.log('Error request:', error.request);
                setError('No se recibió respuesta del servidor');
            } else {
                console.log('Error', error.message);
                setError('Error al enviar la solicitud');
            }
        }
    };

    return (
        <div className="login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="username"
                                value={registerData.username}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={registerData.email}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={registerData.password}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirmar Contraseña"
                                name="confirmPassword"
                                value={registerData.confirmPassword}
                                onChange={handleRegisterChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta"
                            />
                        </div>
                    </form>
                </div>
                <div className="col-md-6 login-form-2">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLoginSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Iniciar sesión"
                            />
                        </div>
                    </form>
                    {error && <div className="alert alert-danger mt-2">{error}</div>}
                </div>
            </div>
        </div>
    );
};
