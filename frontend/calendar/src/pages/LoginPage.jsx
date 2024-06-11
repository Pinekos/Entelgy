import React, { useEffect, useState } from 'react';
import { findAllUsers } from '../services/UserService';
import './LoginPage.css';
import axios from 'axios';

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

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const result = await findAllUsers();
        if (result && result.data && result.data._embedded && result.data._embedded.users) {
            setUsers(result.data._embedded.users);
            console.log(result.data._embedded.users);
        } else {
            console.log('No users found');
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

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

    // He probado de varias formas, pero no consigo que funcione el login
    /*
        const handleLoginSubmit = async (e) => {
            e.preventDefault();
    
            const response = await axios.post(`${USERS_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });
    
            if (response.ok) {
                const user = await response.json();
                console.log(user);
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = `${EVENTS_URL}/${user.id}/events`;
            } else {
                alert('Login failed. Please check your credentials.');
            }
        };
    
        /*const handleLoginSubmit = async (e) => {
            e.preventDefault();
            try {
                const response = await UserService.login({ username, password });
                console.log('Login successful:', response.data);
            } catch (error) {
                console.error('Login failed:', error);
            }
        };*/

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/users/login', {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('Login successful:', response.data);
        
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
    }
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
                                    type="text"
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
                    </div>
                </div>
            </div>
        );
    };