function MessagesList(props) {
    const messages = props.messages;
    const messagesEndRef = React.useRef();

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const MessageRole = ({role}) => {
        const messageRoleClass = "message-role";
        const userRoleClass = role.toLowerCase() === "assistant" ? "ai-message-icon" : "user-message-icon";
        const roleName = role.toLowerCase() === "assistant" ? "AI" : "U"

        return (
            <div className={[messageRoleClass, userRoleClass].join(" ")}>{roleName}</div>
        );
    };

    return (
        <div className="messages-list">
            {messages.map((message, index) => (
                <pre key={index}>
                    <div className="message" key={index}>
                        <MessageRole role={message.role}/>

                        <div className="message-content">
                            {message.content}
                            {/*<div dangerouslySetInnerHTML={{__html: marked.parse(message.content)}}/>*/}
                        </div>
                    </div>
                </pre>
            ))}
            <div ref={messagesEndRef}></div>
        </div>
    );
}
