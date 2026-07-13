// 1) Functions that return Promises
function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true; // simulate success/failure
      if (success) {
        console.log("✅ User data received");
        resolve({ id: 1, name: "Alice" });
      } else {
        reject("❌ Failed to fetch user");
      }
    }, 1000);
  });
}

function getPosts(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId) {
        console.log(`✅ Posts for user ${userId} received`);
        resolve([{ id: 101, title: "Post 1" }, { id: 102, title: "Post 2" }]);
      } else {
        reject("❌ Invalid userId");
      }
    }, 1000);
  });
}

function getComments(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (postId) {
        console.log(`✅ Comments for post ${postId} received`);
        resolve(["Great post!", "Thanks for sharing"]);
      } else {
        reject("❌ Invalid postId");
      }
    }, 1000);
  });
}

// 2) Promise chaining with resolve/reject + catch
getUser()
  .then((user) => getPosts(user.id))
  .then((posts) => getComments(posts[0].id))
  .then((comments) => {
    console.log("Final Comments:", comments);
  })
  .catch((err) => {
    console.error("Error caught:", err);
  })
  .finally(() => {
    console.log("Process finished.");
  });
