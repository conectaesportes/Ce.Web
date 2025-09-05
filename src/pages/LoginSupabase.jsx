import "./Login.scss";
import "./Auth.scss";
import { useState } from "react";
import { supabase } from "../services/supabaseClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";

import Header from "./Components/Header";
// import { useNavigate } from "react-router-dom";

export default function LoginSupabase() {
    const { user, setUser } = useAuth();
    const [currentScreen, setCurrentScreen] = useState(0);
    // const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        passwordConfirm: "",
    });

    console.log(currentScreen);
    console.log(user);

    if(user) {
        navigate("/dashboard");
    }

    const handleChangeValues = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
    };

    const handleFormRegisterSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);

        if (values.password !== values.passwordConfirm)
            toast.error("As senhas não se coincidem.");
        if (values.password.length < 6)
            toast.error("A senha deve ter pelo menos 6 caracteres.");

        let { data: {user}, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
        });

        if (error) {
            console.log(error);
            return;
        }

        setUser(user);
        // navigate("/dashboard");
        // setLoading(false);
        toast.success("Cadastro realizado com sucesso");
    };

    const handleFormLoginSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);

        let { data: {user}, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });

        // let { user, error } = await supabase.auth.signIn({
        //     email: values.email,
        //     password: values.password,
        // });

        if (error) {
            console.log(error);
            toast.error("Credenciais inválidas.");
            // setLoading(false);
            return;
        }

        setUser(user);
        // setLoading(false);
        toast.success("Login realizado com sucesso");
        navigate("/dashboard");
    };

    // eslint-disable-next-line no-unused-vars
    const handleSignOut = async () => {
        // setLoading(true);
        let { error } = await supabase.auth.signOut();

        if (error) {
            console.log(error);
            return;
        }
        toast.success("Usuário deslogado com sucesso");
        setUser();
        // setLoading(false);
    };

    return (
        <div className="Login page">
            {<Header></Header>}
            {<ToastContainer/>}
            {!user && currentScreen === 0 && (
                <div className="container-body">
                    
                    <div className="container-left"></div>
                    <div className="container-right ">
                        <div className="container-form">
                            <h2 className="title">Entre na{"\n"}sua conta</h2>
                            <form onSubmit={handleFormLoginSubmit}>
                                <label htmlFor="mail">E-mail de acesso:</label>
                                <input
                                    id="mail"
                                    name="email"
                                    type="email"
                                    placeholder="jogador@quadralivre.com"
                                    value={values.email}
                                    onChange={handleChangeValues}
                                />
                                <label htmlFor="password">Senha:</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={values.password}
                                    onChange={handleChangeValues}
                                />
                                <button type="submit" className="button-green">
                                    Entrar
                                </button>
                                <button
                                    type="submit"
                                    className="google-register"
                                >
                                    <i className="fa-brands fa-google"></i>
                                    Entrar com o Google
                                </button>
                            </form>
                            {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
                            <p>
                                Não tem uma conta?{" "}
                                <a
                                    onClick={() => {
                                        setCurrentScreen(1);
                                        setValues({
                                            email: "",
                                            password: "",
                                            passwordConfirm: "",
                                        });
                                    }}
                                >
                                    Cadastre-se
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {!user && currentScreen === 1 && (
                <div className="container-body">
                    <div className="container-left"></div>
                    <div className="container-right">
                        <div className="container-form">
                            <h2 className="title">Registre-se</h2>
                            <form onSubmit={handleFormRegisterSubmit}>
                                <label htmlFor="mail">
                                    Digite seu melhor e-mail:
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="jogador@quadralivre.com"
                                    value={values.email}
                                    onChange={handleChangeValues}
                                />
                                <label htmlFor="password">Senha:</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="••••••••••••"
                                    value={values.password}
                                    onChange={handleChangeValues}
                                />
                                <label>Confirme sua senha:</label>
                                <input
                                    type="password"
                                    name="passwordConfirm"
                                    placeholder="••••••••••••"
                                    value={values.passwordConfirm}
                                    onChange={handleChangeValues}
                                />
                                <button type="submit" className="button-green">
                                    Cadastrar
                                </button>
                                <button
                                    type="submit"
                                    className="google-register"
                                >
                                    <i className="fa-brands fa-google"></i>
                                    Entrar com o Google
                                </button>
                            </form>
                            <p>
                                Já tem uma conta?{" "}
                                <a
                                    onClick={() => {
                                        setCurrentScreen(0);
                                        setValues({
                                            email: "",
                                            password: "",
                                            passwordConfirm: "",
                                        });
                                    }}
                                >
                                    Faça login
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
