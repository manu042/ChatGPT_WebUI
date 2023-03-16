function ChatInput({handleInputChange, inputValue, onButtonClick}) {

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onButtonClick();
        }
    };

    return (
        <div className="chat-input-area">
            <textarea rows="6" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyPress}></textarea>
            <button type="submit" onSubmit={onButtonClick}>Send</button>
        </div>
    );
}
