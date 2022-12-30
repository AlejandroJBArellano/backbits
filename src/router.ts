import { Router } from "express";
import getRoutes from "./routes/get";
import postRoutes from "./routes/post";
import putRoutes from "./routes/post";
import deleteRoutes from "./routes/post";

const router = Router();

router.get("/", getRoutes.home);
router.get("/user", getRoutes.userByQuery)
router.get("/user/publications", getRoutes.userPublications);
router.get("/user/publication", getRoutes.userPublication);
router.get("/user/habit", getRoutes.userPublicationsByHabit);
router.get("/graphics/rating", getRoutes.graphicsRating);
router.get("/habit", getRoutes.findHabit)

router.post("/publication", postRoutes.publication);
router.post("/user", postRoutes.user);
router.post("/habit", postRoutes.habit);

router.put("/publication", putRoutes.publication);
router.put("/user", putRoutes.user);
router.put("/habit", putRoutes.habit);

router.delete("/publication", deleteRoutes.publication);
router.delete("/user", deleteRoutes.user);
router.delete("/habit", deleteRoutes.habit);

export default router;
