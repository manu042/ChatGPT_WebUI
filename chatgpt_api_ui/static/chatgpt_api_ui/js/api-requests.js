async function getMessages() {
    // `/api/chats/${chat_pk}/`
    return fetch(`/api/chats/1`, {
        method: 'GET',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const messages = [];
            for (let i = 0; i < data["chat_messages"].length; i++) {
                messages.push(data["chat_messages"][i].content);
            }

            return messages;
        })
        .catch(error => {
            console.error('There was a problem with the API:', error);
            throw error;
        });
}


async function createChatMessage(chatId, content, role) {
    const url = '/api/chat_messages/';
    const csrfToken = document.cookie.split('; ').find(cookie => cookie.startsWith('csrftoken=')).split('=')[1];

    const data = {
        chat: chatId,
        content: content,
        role: role,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('New chat message created:', responseData);
        return responseData;
    } catch (error) {
        console.error('Error creating chat message:', error);
        return null;
    }
}
