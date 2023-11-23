import { Router } from "express";
import { EmployeController } from "../controllers/EmployeController";
import passport from "passport";
const router = Router();

 router.get("/", EmployeController.getAll);
 router.get("/:id", EmployeController.getOne);
router.post("/register", EmployeController.register);
router.post("/login", EmployeController.login);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  EmployeController.profile
);

export default router;
