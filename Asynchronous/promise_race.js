function getUser() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("✅ User data received");
      resolve({ id: 1, name: "Alice" });
    }, 2000); // takes 2s
  });
}

function timeout(ms) {
  return new Promise((_, reject) => {
    setTimeout(() => reject("❌ Request timed out"), ms);
  });
}

// Race: whichever finishes first wins
Promise.race([getUser(), timeout(1500)])
  .then((user) => {
    console.log("Winner:", user);
  })
  .catch((err) => {
    console.error("Error caught:", err);
  });
