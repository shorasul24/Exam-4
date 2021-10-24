// Elements Dom list 
const elUserList = document.querySelector('.users__list');
const elPostsList = document.querySelector('.posts__list');
const elCommentsList = document.querySelector('.comments__list');

// Elements Template
const elUsersTemplate = document.querySelector('.users__template').content;
const elPostsTemplate = document.querySelector('.posts__template').content;
const elCommentsTemplate = document.querySelector('.comments__template').content;

// Elements Links 

const usersLink = 'https://jsonplaceholder.typicode.com/users';
const postsLink = 'https://jsonplaceholder.typicode.com/posts';
const commentsLink = 'https://jsonplaceholder.typicode.com/comments?postId=';
const geoLink = 'https://www.google.com/maps/place/';

//ARR
let users = [];
let posts = [];
let comments = [];


// RenderUsers 
function renderUsers(arr, node) {
   node.innerHTML = null;

   const fragmentList = document.createDocumentFragment();

   arr.forEach((user) => {
      const clonedUsersTemplate = elUsersTemplate.cloneNode(true);

      clonedUsersTemplate.querySelector('.btn__post').dataset.userId = user.id;
      clonedUsersTemplate.querySelector('.username').textContent = user.username;
      clonedUsersTemplate.querySelector('.user__full--name').textContent = user.name;
      clonedUsersTemplate.querySelector('.user__email').href = 'mailto:' + user.email;
      clonedUsersTemplate.querySelector('.user__email').textContent = user.email;
      clonedUsersTemplate.querySelector('.user__website').href = user.website;
      clonedUsersTemplate.querySelector('.user__address').textContent =
      user.address.street +
      ' ' +
      user.address.suite +
      ' ' +
      user.address.city +
      ' ' +
      user.address.zipcode;
      clonedUsersTemplate.querySelector('.user__geo').href = geoLink + user.address.geo.lat + ' ' + user.address.geo.lng;

      fragmentList.appendChild(clonedUsersTemplate);
   })
   node.appendChild(fragmentList);
}

// RenderPosts

function renderPosts(arr, node) {
   node.innerHTML = null;

   const fragmentList = document.createDocumentFragment()
   arr.forEach((post) =>{
      const clonedPostsTemplate = elPostsTemplate.cloneNode(true);

      clonedPostsTemplate.querySelector('.btn__comment').dataset.postsID = post.id;
      clonedPostsTemplate.querySelector('.post__title').textContent = post.title;
      clonedPostsTemplate.querySelector('.post__text').textContent = post.body;

      fragmentList.appendChild(clonedPostsTemplate);
   })
   node.appendChild(fragmentList);
}


// RenderComments

function renderComments(arr, node) {
   node.innerHTML = null;

   const fragmentList = document.createDocumentFragment();

   arr.forEach((comment) => {
      const clonedCommentTemplate = elCommentsTemplate.cloneNode(true);

      clonedCommentTemplate.querySelector('.comments__item').dataset.commentID = comment.postId;
      clonedCommentTemplate.querySelector('.comment__title').textContent = comment.name;
      clonedCommentTemplate.querySelector('.user__email--comment').href = 'mailto:' + comment.email;
      clonedCommentTemplate.querySelector('.user__email--comment').textContent = comment.email;
      clonedCommentTemplate.querySelector('.comment__text').textContent = comment.body;

      fragmentList.appendChild(clonedCommentTemplate);
   })
   node.appendChild(fragmentList);
}

// Async Users

async function getUsers(){
   const res = await fetch(usersLink);
   const data = await res.json();

   users = data;
   renderUsers(users, elUserList);
}

// Async Posts 

async function getPosts() {
   const res = await fetch(postsLink);
   const data = await res.json();

   posts = data;
}

// Async Comments

async function getComments(page) {
   const res = await fetch(commentsLink + page);
   const data = await res.json();
   
   comments = data;
   
   renderComments(comments, elCommentsList);
}


// Click List
elUserList.addEventListener('click', (evt)=> {
	if (evt.target.matches('.btn__post')) {
		const userId = evt.target.dataset.userId;

		const foundPost = posts.filter((post) => post.userId == userId);

		renderPosts(foundPost, elPostsList);
	}
});

// Click List 
elPostsList.addEventListener('click', (evt) => {
   if(evt.target.matches('.btn__comment')) {
      const postId = evt.target.dataset.postsID;

      const foundComment = Number(comments.find((comment) => postId === comment.postId),);

      getComments(postId);
   }
});

getUsers();
getPosts();