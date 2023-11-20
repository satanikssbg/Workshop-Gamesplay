import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import useForm from "../../hooks/useForm";

const RegisterFormKeys = {
    Email: 'email',
    Password: 'password',
    ConfirmPassword: 'confirm-password',
}

export default function Register() {
    const { registerSubmitHandler } = useContext(AuthContext);

    const { values, onChange, onSubmit } = useForm(registerSubmitHandler, {
        [RegisterFormKeys.Email]: '',
        [RegisterFormKeys.Password]: '',
        [RegisterFormKeys.ConfirmPassword]: '',
    });

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={onSubmit}>
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name={RegisterFormKeys.Email} onChange={onChange} value={values[RegisterFormKeys.Email]} />

                    <label htmlFor="pass">Password:</label>
                    <input type="password" id="register-password" name={RegisterFormKeys.Password} onChange={onChange} value={values[RegisterFormKeys.Password]} />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input type="password" id="confirm-password" name={RegisterFormKeys.ConfirmPassword} onChange={onChange} value={values[RegisterFormKeys.ConfirmPassword]} />

                    <input className="btn submit" type="submit" defaultValue="Register" />

                    <p className="field">
                        <span>
                            If you already have profile click <a href="#">here</a>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}