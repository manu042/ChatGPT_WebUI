function ChatInput({newUserMessage}) {
    const [textAreaValue, setTextAreaValue] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleOnButtonClick().then();
        }
    };

    const handleOnChange = (event) => {
        setTextAreaValue(event.target.value);
    }

    const handleOnButtonClick = async () => {
        if (textAreaValue.trim() !== "" && !isLoading) {
            setIsLoading(true);
            setTextAreaValue("");
            await newUserMessage(textAreaValue);
            setIsLoading(false);
        }
    }

    return (
        <div className="chat-input-area">
            <textarea rows="6" value={textAreaValue} onChange={handleOnChange} onKeyDown={handleKeyPress}></textarea>
            <button type="submit" onClick={handleOnButtonClick}>Send</button>
            <div className={`spinner ${isLoading ? 'visible' : 'hidden'}`}></div>
        </div>
    );
}
