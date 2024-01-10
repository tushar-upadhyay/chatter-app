import { useContext, useState } from "react"
import { apiService } from "../services/api-service";
import { MessagesContext } from "../contexts/messages-context";
import Modal from "./modal-component";
import { useNavigate } from "react-router";

export const MessagesInput = () => {

    const [text, setText] = useState('');
    const { refresh, setMessages, messages } = useContext(MessagesContext);
    const [isButtonDisabled, setIsDisabled] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const navigator = useNavigate();
    const postMessage = async () => {
        try {
            let res = await apiService.postMessage({ text });
            setText('');
            if (messages.sortDir === 1) {
                setMessages({ data: [...messages.data, res.response], sortDir: messages.sortDir })
            }
            else {
                setMessages({ data: [res.response, ...messages.data,], sortDir: messages.sortDir })
            }
        }
        catch (err) {
            alert('some error occured!!')
            console.log(err);
        }

    }

    const deleteAllMessages = async () => {

        setIsDisabled(true);
        setShowConfirm(false);
        const promises = [];

        for (let message of messages.data) {
            promises.push(apiService.deleteMessage(message.id));
        }

        await Promise.all(promises);
        setIsDisabled(false);
        refresh();
    }

    const logout = () => {
        localStorage.clear();
        navigator('/login');
    }

    return (
        <div className="flex">
            <input onChange={e => setText(e.target.value)} value={text} placeholder="Enter Message" />
            <button className="button add-button" onClick={postMessage}>Post!</button>
            <button disabled={isButtonDisabled} className="button remove-button" onClick={() => setShowConfirm(true)}>Delete All</button>
            <Modal isOpen={showConfirm}>
                <div>
                    <h4>Confirm delete all messages?</h4>
                    <div className="flex">
                        <button className="button add-button" onClick={() => setShowConfirm(false)}>Cancel</button>
                        <button className="button remove-button" onClick={deleteAllMessages}>Confirm</button>
                    </div>
                </div>
            </Modal>
            <button disabled={isButtonDisabled} className="button remove-button" onClick={logout}>Logout</button>
            
        </div>
    )
}