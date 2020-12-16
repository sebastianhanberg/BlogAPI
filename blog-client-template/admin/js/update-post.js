window.onload = function() {
    prefillForm();
    updateTweet();
}

async function prefillForm() {
    let urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams.get('id'));

    try {
        let response = await fetch('http://localhost:3000/posts/' + urlParams.get('id'));
        let data = await response.json();
        // console.log(data.content);

        document.getElementById('title-textarea').value = data.title;
        document.getElementById('content-textarea').value = data.content;
        document.getElementById('author-textarea').value = data.author;
        

    } catch (message) {
        throw new Error(message);
    }
}


function updateTweet() {
    let urlParams = new URLSearchParams(window.location.search);
    
    
    let form = document.getElementById('update-post-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault()

        let formData = new FormData(this);
        let object = {
            title: formData.get('title'),
            content: formData.get('content'),
            author: formData.get('author')
        }
        
        console.log(object);
        console.log(JSON.stringify(object));
    
        try {
            await fetch('http://localhost:3000/posts/' + urlParams.get('id'), {
                method: 'PATCH', // GET, POST, PATCH, DELETE
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(object) // body data type must match "Content-Type" header
            });
            
            window.location.replace('../admin/index.html') // redirects to the admin/index.html page
        } catch (message) {
            throw new Error(message);
        }
    });
    
}



