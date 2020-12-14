window.onload = function() {
    tableData();   
   }

let tableBody = document.querySelector('#table tbody');
   
   async function tableData() {
   
       try {
           let response = await fetch('http://localhost:3000/posts');
           let data = await response.json();
            console.log(data); 
   
            
        let tableRowHTML = "";
        for (let tweet of data.reverse()) {
            
        console.log(tweet);
        
        let tweetDate = new Date(tweet.date);

        tableRowHTML +=
                '<tr>' +
                '<td>' + `<p>${tweet.title} </td>` +
                '<td>' + `<p>${tweet.content} </td>` +
                '<td>' + `<p>${tweet.author} </td>` +
                '<td>' + `<p class="date">${tweetDate.getFullYear()}-${tweetDate.getMonth()}-${tweetDate.getDate()}</p> </td>` +
                
           
            `<td><a href="admin/update-post.html?id=${tweet['_id']}">Update</a> | <a href="#" class="delete-tweet-btn" data-id="${tweet['_id']}">Delete</a> </td>`;
            
                '</tr>';
        
        
        
        }
        tableBody.innerHTML += tableRowHTML;

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
