import { useEffect, useState } from "react"
import { apiService } from "../services/api-service";
import { MessagesContext } from "../contexts/messages-context";
import { Messages } from "../components/message-list-component";
import { MessagesInput } from "../components/input-component";
import { useNavigate } from "react-router";


export const HomeScreen = () => {


    const [messages, setMessages] = useState({ data: [], sortDir: 1 });
    const [error, setError] = useState(false)
    const navigator = useNavigate();
    const refresh = async () => {

        let _messages = await apiService.getAllMessages();
        if (_messages.error) {
            setError(true);
        }
        else {
            setMessages({ ...messages, data: _messages.response });
        }

    }

    const logout = () => {
        localStorage.clear();
        navigator('/login');
    }

    useEffect(() => {
        refresh();
    }, [])

    return (
        <MessagesContext.Provider value={{ messages, setMessages, refresh }}>
            {error ?
                (
                    <div className="flex">
                        <p>
                            Invalid Token or some error occured
                        </p>
                        <button className="button remove-button" onClick={logout}>Logout?</button>
                    </div>
                )
                : (
                    <>
                        <MessagesInput />
                        <Messages />
                    </>
                )}

        </MessagesContext.Provider>
    )
}