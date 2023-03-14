class ApiCall {
    static getMessages() {
        return fetch('/get_messages/', {
            method: 'GET',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data.messages;
            })
            .catch(error => {
                console.error('There was a problem with the API:', error);
                throw error;
            });
    }

    static chatCompletion(question) {
        const csrfToken = document.cookie.split('; ').find(cookie => cookie.startsWith('csrftoken=')).split('=')[1];
        const formData = new FormData();
        formData.append('message', question);

        return fetch('/chat_completion/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            },
            // body: JSON.stringify({question})
            body: formData
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                return data.message;
            })
            .catch(error => {
                console.error('There was a problem with the API:', error);
                throw error;
            });
    }
}


class MessagesList extends React.Component {
    constructor(props) {
        super(props);
        this.messagesEndRef = React.createRef();
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.messagesEndRef.current.scrollIntoView({behavior: "smooth"});
    }

    render() {
        const {messages} = this.props;

        return (
            <div className="messages-list">
                <pre>
                    {messages.map((message, index) => (
                        <div className="message" key={index}>
                            {message}
                        </div>
                    ))}
                    <div ref={this.messagesEndRef}/>
                </pre>
            </div>
        );
    }
}


class ChatInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        const {inputText, onInputSubmit} = this.props;
        if (inputText.trim() !== "") {
            onInputSubmit(inputText);
        }
    }

    handleKeyPress(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            this.handleSubmit(event);
        }
    }

    render() {
        const {inputText, onInputChange} = this.props;

        return (
            <div className="chat-input-area">
                <textarea rows="6" value={inputText} onChange={onInputChange} onKeyDown={this.handleKeyPress}></textarea>
                <button type="submit" onSubmit={this.handleSubmit}>Send</button>
                {/*<div className="spinner"></div>*/}
            </div>
        );
    }
}


class Chat_ui extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            inputText: '',
            chatUUID: '',
        };
        this.getMessages = this.getMessages.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const uuidPattern = /^\/[a-f0-9-]+\/$/;
        if (uuidPattern.test(window.location.pathname)) {
            const chatUUID = window.location.pathname.replace(/^\/|\/$/g, '');

            this.setState({chatUUID}, () => {
                console.log(this.state.chatUUID);
            })
        }

        this.getMessages();
    }

    getMessages() {
        ApiCall.getMessages()
            .then((messages) => {
                this.setState({messages});
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
            });
    }

    handleInputChange(event) {
        const inputText = event.target.value;
        this.setState({inputText});
    }

    handleSubmit(inputText) {
        const userMessage = inputText//{text: inputText, author: 'user'};
        const messages = [...this.state.messages, userMessage];
        this.setState({messages, inputText: ''});

        ApiCall.chatCompletion(inputText)
            .then((answer) => {
                const botMessage = answer //{text: answer, author: 'bot'};
                const updatedMessages = [...this.state.messages, botMessage];
                this.setState({messages: updatedMessages});
            })
            .catch((error) => {
                console.error('Error asking question:', error);
            });
    }

    render() {
        const {messages, inputText} = this.state;

        return (
            <React.Fragment>
                <MessagesList messages={messages}/>
                <ChatInput
                    inputText={inputText}
                    onInputChange={this.handleInputChange}
                    onInputSubmit={() => this.handleSubmit(inputText)}
                />
            </React.Fragment>
        );
    }
}


const chatApp = ReactDOM.createRoot(document.getElementById('app'));
chatApp.render(<Chat_ui/>);
