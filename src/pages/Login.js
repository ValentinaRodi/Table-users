import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import  '../style/login.scss';
import { enterLogin } from '../backend/backend';

export default function Login() {
    const navigate = useNavigate();

    const [userEnterEmail, setUserEnterEmail] = useState('');
    const [userEnterPassword, setUserEnterPassword] = useState('');

    function handleUserEnterEmail(event) {
        const value = event.target.value;
        setUserEnterEmail(value);
    }

    function handleUserEnterPassword(event) {       
        const value = event.target.value;
        setUserEnterPassword(value);
    }

    function handlerClickEnter(event) {
        if (userEnterEmail === 'superuser' && userEnterPassword === 'superuser' ) {
            navigate('./main', {replace: true})  
            const data = {
                email: userEnterEmail,
                password: userEnterPassword
            }

            enterLogin(data)
            
        } else {
            event.preventDefault(); 
        };
    }
    
    return (
        <div className="form_wrap">
            <div className="form_box">
                <form className="login_form" action="">
                    <input onChange={handleUserEnterEmail} className="login_input login_input_login" type="text" placeholder="Email" />
                    <input onChange={handleUserEnterPassword} className="login_input login_input_password password_first" type="password" placeholder="Password" />
                    <div className="buttons_block">
                        <button onClick={handlerClickEnter} className="login_button">Войти</button>
                    </div>
                </form>
            </div>
        </div>
    )
  }