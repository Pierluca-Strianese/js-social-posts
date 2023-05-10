const likedPosts = [3];
const posts = [
	{
		"id": 1,
		"content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		"media": "https://unsplash.it/600/300?image=171",
		"author": {
			"name": "Phil Mangione",
			"image": "https://unsplash.it/300/300?image=15"
		},
		"likes": 80,
		"created": "2021-06-25"
	},
	{
		"id": 2,
		"content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		"media": "https://unsplash.it/600/400?image=112",
		"author": {
			"name": "Sofia Perlari",
			"image": "https://unsplash.it/300/300?image=10"
		},
		"likes": 120,
		"created": "2021-09-03"
	},
	{
		"id": 3,
		"content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		"media": "https://unsplash.it/600/400?image=234",
		"author": {
			"name": "Chiara Passaro",
			"image": "https://unsplash.it/300/300?image=20"
		},
		"likes": 78,
		"created": "2021-05-15"
	},
	{
		"id": 4,
		"content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		"media": "https://unsplash.it/600/400?image=24",
		"author": {
			"name": "Luca Formicola",
			"image": null
		},
		"likes": 56,
		"created": "2021-04-03"
	},
	{
		"id": 5,
		"content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
		"media": "https://unsplash.it/600/400?image=534",
		"author": {
			"name": "Alessandro Sainato",
			"image": "https://unsplash.it/300/300?image=29"
		},
		"likes": 95,
		"created": "2021-03-05"
	}
];

const eleContainer = document.querySelector('#container');
renderPosts(posts, eleContainer);


function renderPosts(arrPosts, eleContainer) {
	eleContainer.innerHTML = arrPosts.reduce((postsHtml, objPost) => postsHtml + generatePostHtml(objPost), '');

	const listLikeButtons = eleContainer.querySelectorAll('.like_button');
	listLikeButtons.forEach(likeButton => likeButton.addEventListener('click', manageLike));
}

function generatePostHtml(objPost) {
	return `
		<div class="p-4 bg-light">
			<div class="mb-3">
				<div class="post-meta">
					<div class="me-3">
						${objPost.author.image ? getProfileImageHtml(objPost) : getNameInitials(objPost.author.name)}
					</div>
					<div class="post-meta__data">
						<div class="fw-bold">${objPost.author.name}</div>
						<div class="fs-6">${formatIsoToItalianDate(objPost.created)}</div>
					</div>
				</div>
			</div>
			<div class="mb-2">${objPost.content}</div>
			<div class="mb-2">
				<img src="${objPost.media}" alt="">
			</div>
			<div class="post__footer">
				<div class="likes js-likes">
					<div class="likes__cta">
						<a class="like_button ${manageClassLike(objPost)} js-like-button" data-postid="${objPost.id}">
							<i class="like_button__icon fas fa-thumbs-up" aria-hidden="true"></i>
							<span class="fw-bold">Mi Piace</span>
						</a>
					</div>
					<div class="likes__counter">
						Piace a <b id="like-counter-${objPost.id}" class="js-likes-counter">${objPost.likes}</b> persone
					</div>
				</div>
			</div>
		</div>
	`;
}

function manageLike() {
	const postId = parseInt(this.dataset.postid);

	let variation;
	if (likedPosts.includes(postId)) {
		const indexPost = likedPosts.indexOf(postId);
		likedPosts.splice(indexPost, 1);
		variation = -1;
	} else {
		likedPosts.push(postId);
		variation = 1;
	}

	const objPost = posts.find(post => post.id == postId);
	objPost.likes += variation;

	console.log(likedPosts);

	renderPosts(posts, eleContainer);
}

function manageClassLike(objPost) {
	return likedPosts.includes(objPost.id) ? 'like-button_liked' : '';
}

function formatIsoToItalianDate(isoString) {
	return isoString.split('-').reverse().join('/');
}

function getNameInitials(name) {
	return name.split(' ').reduce((initials, namePart) => initials + namePart[0].toUpperCase(), '');
}

function getProfileImageHtml(objPost) {
	return `<img class="profile-pic" src="${objPost.author.image}" alt="${objPost.author.name}">`;
}
