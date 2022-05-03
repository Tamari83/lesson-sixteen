let currentPage = 1;
let totalPagesAp;

function getUsers(page) {
    let requist = new XMLHttpRequest();
    requist.addEventListener('load', render);
    requist.addEventListener('error', errorRender);

    requist.open('GET', 'https://reqres.in/api/users?page=' + page);

    requist.send();
}


function render() {
    let response = this.responseText;
    let responseData = JSON.parse(response);
    let fragment = document.createDocumentFragment();

    responseData.data.forEach(item => {
        let li = document.createElement('li');
        let pEmail=document.createElement('p');
        pEmail.textContent= item.email;

        let imgUser = document.createElement('img');
        imgUser.src = item.avatar;
        imgUser.classList.add('image-block');

        li.appendChild(imgUser);
        li.appendChild(pEmail);
        li.classList.add('li-item');
        fragment.appendChild(li);
    
});

document.getElementById('ul-list').innerHTML = ' '; 
       document.getElementById('ul-list').appendChild(fragment);
       totalPagesAp=responseData.total_pages;

    }

    function errorRender(){
        let p = document.createElement('p');
        p.textContent = 'server error';
        document.getElementById('api-user-email').appendChild(p);
    }

    document.getElementById('loadPrev').addEventListener('click', function(){
        if(currentPage == 1){
            return;
        }
        currentPage -=1;
        getUsers(currentPage);
        
    });

    document.getElementById('loadNext').addEventListener('click', function(){
        if(currentPage == totalPagesAp){
            return;
        }
        currentPage +=1;
        getUsers(currentPage);
    });

getUsers(currentPage);
