window.onload = function() {
    fetchPost();   
   }
   
   
   function fetchPost() {

    let urlParams = new URLSearchParams(window.location.search);

    let specificPosts = document.getElementsByClassName('specificPost');
    for (let specificPost of specificPosts) {
        specificPost.addEventListener('click', async function(e) {
            e.preventDefault()
            
       try {
           let response = await fetch('http://localhost:3000/posts/' + urlParams.get('id'));
           let data = response.json(); 
        
           let tweetHTML = "";
           for (let post of data) {
           console.log(post);
           
            tweetHTML += `<li class="list-group-item">`

            tweetHTML += `<p>${tweet.title}`;
            tweetHTML += `<p>${tweet.content}`;
           
            tweetHTML += `<p>${tweet.author}`;
            

            let tweetDate = new Date(tweet.date);
            tweetHTML += `<br> <span class="date">- ${tweetDate.getFullYear()}-${tweetDate.getMonth()}-${tweetDate.getDate()}</span> </p>`;
            
        

            tweetHTML += `</li>`;
            
           }
           
           document.getElementById('blogpost').innerHTML = tweetHTML; 
       } catch (message) {
           throw new Error(message);
       }
    })
}
}
   
