router.get("/users/:id", (req, res) => {
  res.send(req.params);
});
router.post("/users", (req, res) => {});
router.put("/users", (req, res) => {});
