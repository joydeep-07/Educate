// START server.js
const app = require("./src/app"); 
const connectDB = require("./src/db/db");
require("dotenv").config();
connectDB();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
