class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: {},
            messages: [],
        };
    }

    async componentDidMount() {
        const pkPattern = /^\/\d+\/$/;
        if (pkPattern.test(window.location.pathname)) {
            const chatPK = window.location.pathname.replace(/^\/|\/$/g, '');

            this.setState({chatPK}, async () => {
                try {
                    const chat = await getChatData(this.state.chatPK);
                    const messages = chat["chat_messages"];
                    this.setState({chat, messages});
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            });
        } else {
            console.log("Invalid URL pattern.");
        }
    }

    newUserMessage = async (userMessage) => {
        const updatedMessages = [...this.state.messages, {content: userMessage, role: "user"}];
        this.setState({messages: updatedMessages});

        try {
            await chatCompletion(this.state.chat["chat_id"], userMessage, "user")

            const chat = await getChatData(this.state.chatPK);
            const messages = chat["chat_messages"];
            this.setState({chat, messages});

        } catch (error) {
            console.error("Error sending message to server:", error);
        }
    }

    render() {
        return (
            <React.Fragment>
                <MessagesList messages={this.state.messages}/>
                <ChatInput newUserMessage={this.newUserMessage}/>
            </React.Fragment>);
    }
}


const chatApp = ReactDOM.createRoot(document.getElementById('app'));
chatApp.render(<ChatApp/>);
