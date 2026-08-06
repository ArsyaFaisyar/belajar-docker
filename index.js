require("dotenv").config();
const app = require("./src/app.js")
const PORT = process.env.PORT || 3060

app.listen(3060, () => {
  console.log(`Server running on : http://localhost:${PORT}`);
});
