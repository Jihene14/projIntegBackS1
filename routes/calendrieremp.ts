import { Router } from "express";
import { CalandrierEmpController } from "../controllers/CalendrierEmpController";
const router = Router();

router.get("/", CalandrierEmpController.getAll);
router.get("/:id", CalandrierEmpController.getOne);
router.get("/getcalendrier/:id",CalandrierEmpController.getCalendarByTimeandId)
router.post("/ajouterHeureArriv/:id", CalandrierEmpController.AjouterHeureArriv);
router.post("/ajouterHeureDep/:id", CalandrierEmpController.AjouterHeureDep);
router.put("/modifierHeureConge/:id", CalandrierEmpController.ModifierHeureCong);

router.get("/suivrePerf/:id", CalandrierEmpController.Suivreperformance);

export default router;
