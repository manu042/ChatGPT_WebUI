function MessagesList(props) {
    const messages = props.messages;

    const handleDeleteButton = () => {
        console.log("Delete")
    }

    return (
        <div className="messages-list">
            <pre>
                    {messages.map((message, index) => (
                        <div className="message" key={index}>
                            {message}
                            {/*<button onClick={handleDeleteButton}>Test</button>*/}
                        </div>
                    ))}
                {/*<div ref={this.messagesEndRef}/>*/}
                </pre>
        </div>
    );
}
