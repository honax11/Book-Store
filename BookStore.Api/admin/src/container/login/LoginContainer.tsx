import React, { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginComponent } from "shared/components/login/Login";
import { useAuth } from "shared/hook/useAuth";
import { login } from "shared/services/auth.service";

export interface LoginResult {
    accessToken: string;
    refreshToken: string;
}

export const LoginContainer = () => {    
    const navigate = useNavigate();
    const location: any = useLocation();
    const { signin } = useAuth() as any;

    const fromPage = location.state?.from?.pathname || '/admin';

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form: any = e.target;
        const admin = {
            login: form.login.value,
            password: form.password.value
        }

        let tokens = await login(form.login.value, form.password.value);
        if (tokens.accessToken != null && tokens.refreshToken != null) {
            signin(admin, () => navigate(fromPage, { replace: true }));
        }
    }

    return (
        <LoginComponent handleSubmit={handleSubmit} />
    );
}
