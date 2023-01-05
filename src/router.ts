import { Router } from "express";
import { appCheckVerification } from "./middleweares";
import getRoutes from "./routes/get";
import postRoutes from "./routes/post";

const router = Router();

router.get("/", getRoutes.home);
router.get("/user", getRoutes.userByQuery)
router.get("/user/publications", getRoutes.userPublications);
router.get("/user/publication", getRoutes.userPublication);
router.get("/user/habit", getRoutes.userPublicationsByHabit);
router.get("/graphics/rating", getRoutes.graphicsRating);
router.get("/habit", getRoutes.findHabit)

router.post("/publication", [appCheckVerification], postRoutes.publication);
router.post("/user", postRoutes.user);
router.post("/habit", [appCheckVerification], postRoutes.habit);

router.put("/publication", postRoutes.publication);
router.put("/user", postRoutes.user);
router.put("/habit", postRoutes.habit);

router.delete("/publication", postRoutes.publication);
router.delete("/user", postRoutes.user);
router.delete("/habit", postRoutes.habit);

export default router;
