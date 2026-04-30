import app from "./app.js";

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`VoteVerse API running on http://localhost:${PORT}`);
});
