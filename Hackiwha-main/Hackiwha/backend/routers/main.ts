import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("index.html", {
    title: "Home",
  });
});

const mainRouterConfig = {
  router,
  path: "/",
};

export { mainRouterConfig };
