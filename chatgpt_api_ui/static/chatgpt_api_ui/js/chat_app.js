class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: ["Test 1", "Test 2"],
        };
        // this.newMessage = this.newMessage.bind(this);
    }

    componentDidMount() {
        // const uuidPattern = /^\/[a-f0-9-]+\/$/;
        const pkPattern = /^\/\d+\/$/;
        if (pkPattern.test(window.location.pathname)) {
            const chatPK = window.location.pathname.replace(/^\/|\/$/g, '');

            this.setState({chatPK}, () => {
                console.log(this.state.chatPK);
            })
        }

        getMessages()
            .then((messages) => {
                this.setState({messages});
            })
            .catch((error) => {
                console.error('Error fetching messages:', error);
            });
    }

    newUserMessage = (userMessage) => {
        const updatedMessages = [...this.state.messages, userMessage];
        this.setState({messages: updatedMessages});
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
