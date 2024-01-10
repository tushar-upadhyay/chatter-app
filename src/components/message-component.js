
export const Message = ({ message, deleteMessage }) => {
    return (
        <div className="message-container">
            <div className="flex align-items-center">
                <h4>~{message.source}</h4>
                <div className='message-font'>{new Date(message.timestamp).toLocaleTimeString()}</div>
                <button className='button remove-button' onClick={deleteMessage}> Delete</button>
            </div>
            <div className='message-font'>
                {message.text}
            </div>
        </div>
    )
}