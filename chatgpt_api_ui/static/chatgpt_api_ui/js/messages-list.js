function MessagesList(props) {
    const messages = props.messages;
    const messagesEndRef = React.useRef();

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({behavior: 'smooth'});
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="messages-list">
            <pre>
                    {messages.map((message, index) => (
                        <div className="message" key={index}>
                            {message.content}
                        </div>
                    ))}
                <div ref={messagesEndRef}></div>
                </pre>
        </div>
    );
}
