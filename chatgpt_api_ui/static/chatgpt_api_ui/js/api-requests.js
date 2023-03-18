async function getChatData(chat_id) {
    let response;
    try {
        response = await fetch(`/api/chats/${chat_id}`, {
            method: 'GET',
        });
    } catch (error) {
        console.error('There was a problem with the fetch call:', error);
        throw error;
    }

    if (!response.ok) {
        const error = new Error('Network response was not ok');
        console.error('There was a problem with the API:', error);
        throw error;
    }

    return await response.json();
}


async function chatCompletion(chatPK, message) {
    let response;
    const csrfToken = document.cookie.split('; ').find(cookie => cookie.startsWith('csrftoken=')).split('=')[1];

    const data = {
        chatPK: chatPK,
        message: message,
    };

    try {
        response = await fetch(`/api/chat_completion/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(data),
        });
    } catch (error) {
        console.error('There was a problem with the fetch call:', error);
        throw error;
    }

    if (!response.ok) {
        const r = await response.json();
        alert(`Error: ${r.error}`);

        const error = new Error('Network response was not ok');
        console.error('There was a problem with the API:', error);
        throw error;
    }

    return await response.json();
}
