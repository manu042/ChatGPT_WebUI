function ChatInput({newUserMessage}) {
    const [textAreaValue, setTextAreaValue] = React.useState("");

    const handleKeyPress = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            handleOnButtonClick();
        }
    };

    const handleOnChange = (event) => {
        setTextAreaValue(event.target.value);
    }

    const handleOnButtonClick = () => {
        if (textAreaValue.trim() !== "") {
            newUserMessage(textAreaValue);
            setTextAreaValue("");
        }
    }

    return (
        <div className="chat-input-area">
            <textarea rows="6" value={textAreaValue} onChange={handleOnChange} onKeyDown={handleKeyPress}></textarea>
            <button type="submit" onClick={handleOnButtonClick}>Send</button>
        </div>
    );
}
