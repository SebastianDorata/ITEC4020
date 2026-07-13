// Example of Callback Hell
function getUser(callback) {
  setTimeout(() => {
    console.log("✅ User data received");
    callback({ id: 1, name: "Alice" });
  }, 1000);
}

function getPosts(userId, callback) {
  setTimeout(() => {
    console.log(`✅ Posts for user ${userId} received`);
    callback([{ id: 101, title: "Post 1" }, { id: 102, title: "Post 2" }]);
  }, 1000);
}

function getComments(postId, callback) {
  setTimeout(() => {
    console.log(`✅ Comments for post ${postId} received`);
    callback(["Great post!", "Thanks for sharing"]);
  }, 1000);
}

// Nested callbacks (Callback Hell 😵)
getUser(function(user) {
  getPosts(user.id, function(posts) {
    getComments(posts[0].id, function(comments) {
      console.log("Final Comments:", comments);
    });
  });
});
