const express = require("express");
const port = 3000;
const { 
    connectPostgres, 
    connectMongo
 } = require("./database");

const app = express();

connectPostgres();
connectMongo(); 


const authorRoutes = require("./routes/author");
app.use("/api/author", authorRoutes);



const postRoutes = require("./routes/posts");
app.use("/api/posts", postRoutes);


app.listen(port, () => {
  console.log(`Server running on port` , port);
});
