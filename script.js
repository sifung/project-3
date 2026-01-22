// Family Social Media Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sample family members data
    const familyMembers = [
        { name: "Mandeep", role: "Child", photo: "pic/mandeep.jpg" },
        { name: "Hira", role: "Child", photo: "pic/hira.jpg" },
        { name: "Kaushik", role: "Child", photo: "pic/kaushik.jpg" },
        { name: "Padumi", role: "Child", photo: "pic/padumi.jpg" },
        { name: "Satarupa", role: "Child", photo: "pic/satarupa.jpg" },
        { name: "Priya", role: "Child", photo: "pic/priya.jpg" },
        { name: "Lwthwma", role: "Child", photo: "pic/lwthwma.jpg" },
        { name: "Debojit", role: "Child", photo: "pic/debojit.jpg" },
        { name: "Mithinga", role: "Child", photo: "pic/mithinga.jpg" },
        { name: "Nayan", role: "Child", photo: "pic/nayan.jpg" }
    ];

    // Load family gallery
    const galleryGrid = document.querySelector('.gallery-grid');
    familyMembers.forEach(member => {
        const img = document.createElement('img');
        img.src = member.photo;
        img.alt = member.name;
        img.title = `${member.name} (${member.role})`;
        galleryGrid.appendChild(img);
    });

    // Post functionality with multimedia support
    const postForm = document.querySelector('.post-form');
    const postInput = postForm.querySelector('textarea');
    const postsContainer = document.querySelector('.posts-container');
    const mediaInputs = document.querySelectorAll('.media-input');
    const mediaPreview = document.querySelector('.media-preview');
    let selectedMedia = null;

    // Handle media selection
    mediaInputs.forEach(input => {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (!file) return;
            
            selectedMedia = {
                file: file,
                type: this.dataset.type
            };
            
            displayMediaPreview(file, this.dataset.type);
        });
    });

    function displayMediaPreview(file, type) {
        mediaPreview.innerHTML = '';
        const reader = new FileReader();
        
        reader.onload = function(e) {
            let mediaElement;
            if (type === 'image') {
                mediaElement = document.createElement('img');
                mediaElement.src = e.target.result;
            } else if (type === 'video') {
                mediaElement = document.createElement('video');
                mediaElement.src = e.target.result;
                mediaElement.controls = true;
            } else if (type === 'audio') {
                mediaElement = document.createElement('audio');
                mediaElement.src = e.target.result;
                mediaElement.controls = true;
            }
            
            mediaPreview.appendChild(mediaElement);
        };
        
        reader.readAsDataURL(file);
    }

    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const postText = postInput.value.trim();
        
        if (postText || selectedMedia) {
            createPost(postText, selectedMedia);
            postInput.value = '';
            mediaPreview.innerHTML = '';
            selectedMedia = null;
            mediaInputs.forEach(input => input.value = '');
        }
    });

    function createPost(text, media = null) {
        const post = document.createElement('div');
        post.className = 'post';
        
        let mediaContent = '';
        if (media) {
            const mediaURL = URL.createObjectURL(media.file);
            if (media.type === 'image') {
                mediaContent = `<div class="post-media"><img src="${mediaURL}" alt="Posted image"></div>`;
            } else if (media.type === 'video') {
                mediaContent = `<div class="post-media"><video controls><source src="${mediaURL}" type="video/mp4"></video></div>`;
            } else if (media.type === 'audio') {
                mediaContent = `<div class="post-media"><audio controls><source src="${mediaURL}" type="audio/mpeg"></audio></div>`;
            }
        }

        post.innerHTML = `
            <div class="post-header">
                <img src="pic/mandeep.jpg" alt="User">
                <div>
                    <h3>Mandeep</h3>
                    <small>Just now</small>
                </div>
            </div>
            <div class="post-content">
                ${text ? `<p>${text}</p>` : ''}
                ${mediaContent}
            </div>
            <div class="post-actions">
                <button class="like-btn">0</button>
                <button class="comment-btn">Comment</button>
            </div>
            <div class="comment-section" style="display:none">
                <div class="comment-input">
                    <input type="text" placeholder="Write a comment...">
                    <button class="post-comment">Post</button>
                </div>
                <div class="comments-container"></div>
            </div>
        `;
        postsContainer.prepend(post);
        
        // Add like functionality
        const likeBtn = post.querySelector('.like-btn');
        likeBtn.addEventListener('click', function() {
            const isLiked = this.classList.contains('liked');
            const currentLikes = parseInt(this.textContent) || 0;
            
            if (isLiked) {
                this.classList.remove('liked');
                this.textContent = currentLikes - 1;
            } else {
                this.classList.add('liked');
                this.textContent = currentLikes + 1;
            }
        });
        
        // Add comment functionality
        const commentBtn = post.querySelector('.comment-btn');
        const commentSection = post.querySelector('.comment-section');
        
        commentBtn.addEventListener('click', function() {
            commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
        });

        const postCommentBtn = post.querySelector('.post-comment');
        const commentInput = post.querySelector('.comment-input input');
        
        postCommentBtn.addEventListener('click', function() {
            const commentText = commentInput.value.trim();
            if (commentText) {
                const commentContainer = post.querySelector('.comments-container');
                const comment = document.createElement('div');
                comment.className = 'comment';
                comment.innerHTML = `
                    <div class="comment-header">
                        <img src="pic/mandeep.jpg" width="30" height="30">
                        <strong>Mandeep</strong>
                    </div>
                    <div class="comment-text">${commentText}</div>
                `;
                commentContainer.appendChild(comment);
                commentInput.value = '';
            }
        });
    }

    // Sample initial posts
    createPost("Welcome to our family social network! Let's stay connected.");
    createPost("Happy to have everyone here. Share your updates!");
});
