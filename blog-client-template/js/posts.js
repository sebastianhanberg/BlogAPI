window.onload = function() {
    fetchAll();   
   }
   
   
   async function fetchAll() {
   
       try {
           let response = await fetch('http://localhost:3000/posts');
           let data = await response.json();
   
   
           let tweetHTML = "";
           for (let tweet of data.reverse()) {
            console.log(tweet); 
            tweetHTML += `<li class="list-group-item">`

            tweetHTML += `<p>${tweet.title}`;
            tweetHTML += `<p>${tweet.content}`;
           
            tweetHTML += `<p>${tweet.author}`;
            

            let tweetDate = new Date(tweet.date);
            tweetHTML += `<br> <span class="date">- ${tweetDate.getFullYear()}-${tweetDate.getMonth()}-${tweetDate.getDate()}</span> </p>`;
            
            tweetHTML += `<div>`;
            tweetHTML += `<a href="admin/update-post.html?id=${tweet['_id']}">Update</a> | `;
            tweetHTML += `<a href="#" class="delete-tweet-btn" data-id="${tweet['_id']}">Delete</a> `;
            tweetHTML += `</div>`;

            tweetHTML += `</li>`;

           }
           document.getElementById('blogposts').innerHTML = tweetHTML; 
       } catch (message) {
           throw new Error(message);
       }
       deleteTweet();
   }

   function deleteTweet() {
    let deleteBtns = document.getElementsByClassName('delete-tweet-btn');
    for (let deleteBtn of deleteBtns) {
        deleteBtn.addEventListener('click', async function(e) {
            e.preventDefault()

            let tweetID = "/" + this.dataset.id;
            console.log(tweetID);

            try {
                await fetch('http://localhost:3000/posts' + tweetID, {
                    method: 'DELETE', // GET, POST, PATCH, DELETE
                });

                this.parentNode.parentNode.remove();
            } catch (message) {
                throw new Error(message);
            }
        
        })
    }
}