class ChatApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: ["Test 1", "Test 2"],
            inputValue: "",
        };
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

        // createChatMessage("1", "test", "user").then();
    }

    handleInputChange = (event) => {
        this.setState({inputValue: event.target.value});
    };

    handleButtonClick = (value) => {
        if (this.state.inputValue.trim() !== "") {
            console.log("Button clicked with value:", value);
            // Do something with the value, e.g. update the state of Chat_ui
            const newMessage = this.state.inputValue;
            const updatedMessages = [...this.state.messages, newMessage];
            // this.setState({messages: updatedMessages, inputValue: ""});
            this.setState({messages: updatedMessages, inputValue: ""}, () => {
                console.log(this.state.messages);
            });
        }
    };

    render() {
        return (
            <React.Fragment>
                <MessagesList messages={this.state.messages}/>
                <ChatInput
                    handleInputChange={this.handleInputChange}
                    inputValue={this.state.inputValue}
                    onButtonClick={this.handleButtonClick}
                />
            </React.Fragment>);
    }
}


const chatApp = ReactDOM.createRoot(document.getElementById('app'));
chatApp.render(<ChatApp/>);
