const express = require("express");
const router = express.Router();
const { pgPool } = require("../database");



router.post("/", async (request, response) => {
  const { name } = request.body;
  try {
    const result = await pgPool.query(
      "INSERT Into authors (name) Values ($1) RETURNING *",
      [name]);
    response.status(201).json(result.rows[0]);
  } 
  catch (error) 
  {
    response.status(500).json({ message: "Failed to create author", error: error.message });
  }
});


router.get("/", async (request, response) => {
  try {
    const result = await pgPool.query("SELECT * FROM authors");
    response.json(result.rows);
  } catch (error) {
    response.status(500).json({ message: "Failed to retrieve authors", error: error.message });
  }
});


router.put("/:id", async (request, response) =>
     {
  const { name } = request.body;
  try {
    const result = await pgPool.query(
      "UPDATE authors SET name = $1 Where id = $2 RETURNING *",
      [name, request.params.id]
    );
    if (result.rows.length === 0) 
        {
            return response.status(404).json({ message: "Author not found" });
   
        } response.json(result.rows[0]);
  } catch (error) {
    response.status(500).json({ message: "Failed to update author", error: error.message });
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const result = await pgPool.query("DELETE FROM authors WHERE id = $1 RETURNING *", [
      req.params.id,
    ]);
    if (result.rows.length === 0)
        {
        return res.status(404).json({ message: "Author not found" });
    
    }
     res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Failed to delete author", error: error.message });
  }
});

module.exports = router;
