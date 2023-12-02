import { Router } from "express";
import { EmployeController } from "../controllers/EmployeController";
import passport from "passport";
const router = Router();

router.get("/", EmployeController.getAll);
router.put("/:id", EmployeController.updateOne);
router.get("/:id", EmployeController.getOne);
router.post("/register", EmployeController.register);
router.delete("/:id", EmployeController.deleteOne);
router.post("/login", EmployeController.login);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  EmployeController.profile
);
//commentaires
router.get("/:employeeId/comments", EmployeController.getCommentsByEmployeeId);
router.post("/:employeeId/comments", EmployeController.createComment);

// Demission routes
router.get(
  "/:employeeId/demissions",
  EmployeController.getDemissionsByEmployeeId
);
router.post("/:employeeId/demissions", EmployeController.createDemission);
export default router;
