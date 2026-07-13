// Functions return Promises
function getUser() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let success = true; // flip to false to test error
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

// ✅ Async function to handle sequence
async function showUserComments() {
  try {
    const user = await getUser();         // waits until user is fetched
    const posts = await getPosts(user.id); // waits until posts are fetched
    const comments = await getComments(posts[0].id); // waits for comments

    console.log("Final Comments:", comments);
  } catch (error) {
    console.error("Error caught:", error);
  } finally {
    console.log("Process finished.");
  }
}

// Run async function
showUserComments();
