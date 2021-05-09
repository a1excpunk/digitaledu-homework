let user = document.querySelectorAll(".user");

let Userinfo = document.querySelectorAll('.info');
let UserInfoContainer = document.querySelector('.user-info');

let postsContainer = document.querySelector('.user-posts')
let posts = document.querySelectorAll('.user-post');
let postId = document.querySelectorAll('.post-id');
let postTitle = document.querySelectorAll('.post-title');
let postBody = document.querySelectorAll('.post-body');

let infoExitBtn = document.querySelector('.info-exit-icon')
let postExitBtn = document.querySelector('.post-exit-icon')
let postBtn = document.querySelector('.post-button')

// Names
function fetchNames(data) {
    for (let i = 0; i < data.length; i++) {
        let name = data[i]['name'];
        user[i].innerText = name
    }
}

fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((json) => fetchNames(json))
    .catch(err => console.error(err))

    
//Info
function fetchPersonalInfo(data) {
    console.log(data);
    let username = data[0]['username'];
    let email = data[0]['email'];
    let phone = data[0]['phone'];
    let website = data[0]['website'];
    let bs = data[0]['company']['bs'];
    let catchPhrase = data[0]['company']['catchPhrase'];
    let name = data[0]['company']['name'];
    let city = data[0]['address']['city'];
    let street = data[0]['address']['street'];
    let suite = data[0]['address']['suite'];
    let zipcode = data[0]['address']['zipcode'];

    let info = [username, catchPhrase, website, email, phone, name, bs, city, street, suite, zipcode]
    for (let i = 0; i < info.length; i++) {
        Userinfo[i].innerHTML = info[i]
    }
}
user.forEach(btn => btn.addEventListener('click', function () {
    let indexOfBtn = Array.from(btn.parentNode.children).indexOf(btn);
    fetch(`https://jsonplaceholder.typicode.com/users?id=${indexOfBtn + 1}`)
        .then((response) => response.json())
        .then((json) => fetchPersonalInfo(json))
        .catch(err => console.error(err))

    UserInfoContainer.classList.remove('hidden')
}))



// Posts
let indexOfBtn;

function fetchPosts(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
        let postIdByUser = data[i]['id'];
        let title = data[i]['title']
        let body = data[i]['body']
        postId[i].innerText = `POST ${postIdByUser - (indexOfBtn * 10)}`;
        postTitle[i].innerText = title;
        postBody[i].innerText = body;
    }
}

user.forEach(btn => btn.addEventListener('click', function () {
    indexOfBtn = Array.from(btn.parentNode.children).indexOf(btn);
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${indexOfBtn + 1}`)
        .then((response) => response.json())
        .then((json) => fetchPosts(json))
        .catch(err => console.error(err))
}))


// Buttons

infoExitBtn.addEventListener('click', function () {
    UserInfoContainer.classList.add('hidden')
})
postExitBtn.addEventListener('click', function () {
    postsContainer.classList.add('hidden')
})

postBtn.addEventListener('click', function () {
    postsContainer.classList.remove('hidden')
})