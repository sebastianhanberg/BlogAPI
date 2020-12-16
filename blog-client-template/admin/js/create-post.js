let form = document.getElementById('create-tweet-form');
form.addEventListener('submit', createTweet);

async function createTweet(e) {
    e.preventDefault();

   
    // this => is the form it self
    
    // console.log(formatFormData(formData));
    let formData = new FormData(this);
    // You can retrive the for data by selecting the components individually OR use new FormData() 
        
    
    let object = {
        title: formData.get('title'),
        content: formData.get('content'),
        author: formData.get('author')
    }
    console.log(object);
    console.log(JSON.stringify(object));

    try {
        await fetch('http://localhost:3000/posts/', {
            method: 'POST', // GET, POST, PATCH, DELETE
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object) // body data type must match "Content-Type" header
        });

        window.location.replace('index.html') // redirects to the index.html page
    } catch (message) {
        throw new Error(message);
    }
}


function formatFormData(formData) {
    let obj = {};
    for (let key of formData.keys()) {
        obj[key] = formData.get(key);
    }

    return obj;
}