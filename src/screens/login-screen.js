import { useState } from "react";
import { useNavigate } from "react-router";

export const LoginScreen = () => {
    const [token, setToken] = useState('');

    const navigator = useNavigate();
    const setTokenToLocalStorage = () => {
        localStorage.setItem('authToken', token);
        navigator('/');
    }

    return (
        <div className="flex justify-content-center">
            <div className="flex" style={{ flexDirection: 'column' }}>
                <input onChange={e => setToken(e.target.value)} placeholder="Enter Token" />
                <br />
                <button className="button add-button" onClick={setTokenToLocalStorage}> Submit </button>
                <p>Test Token : nEacDw7hM8dvvqS7</p>
            </div>
        </div>
    )
}