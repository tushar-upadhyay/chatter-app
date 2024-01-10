import { useContext, useEffect, useState } from "react"
import { MessagesContext } from "../contexts/messages-context"
import { Message } from "./message-component";
import { apiService } from "../services/api-service";
import { ListConfig } from "./list-config-component";

export const Messages = () => {

    const [page, setPage] = useState(1);
    const resultsPerPage = 5;
    const { messages, setMessages } = useContext(MessagesContext);

    const [paginatedMessages, setPaginatedMessages] = useState([]);


    useEffect(() => {
        if (messages.data) {
            setPaginatedMessages(messages.data.slice((page - 1) * resultsPerPage, (page) * resultsPerPage));
        }
    }, [messages]);

    const handlePageChange = (page) => {
        setPage(page);
        setPaginatedMessages(messages.data.slice((page - 1) * resultsPerPage, (page) * resultsPerPage));
    }

    const deleteMessage = async (id, index) => {
        await apiService.deleteMessage(id);
        const _messages = [...messages.data];
        _messages.splice(index, 1);
        setMessages({ ...messages, data: _messages });
    }

    const handleSort = (sortDir) => {
        const _messages = [...messages.data];
        setPage(1);
        _messages.sort((m1, m2) => (new Date(m1.timestamp).getTime() - new Date(m2.timestamp).getTime()) * sortDir);
        setMessages({ sortDir, data: _messages });
    }

    return (
        <div>
            <ListConfig page={page} handleSort={handleSort} handlePageChange={handlePageChange} totalNumberOfMessages={messages.data.length || 1} />
            <div className="message-list">
                {paginatedMessages.map((message, index) => <Message message={message} deleteMessage={() => deleteMessage(message.id, index)} key={message.id} />)
                }
            </div>
        </div>
    )
}