import { Request, Response, NextFunction } from "express";
import CalendrierEmpService from "../services/CalendrierEmpService";
import EmployeService from "../services/EmployeService";

export const CalandrierEmpController = {
  getAll: async (_req: Request, res: Response, _next: NextFunction) => {
    const calandsEmps = await CalendrierEmpService.getAll();
    res.send(calandsEmps);
  },
  getOne: async (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    const employeeCalendar = await CalendrierEmpService.getOne(
      parseInt(params.id)
    );
    res.send(employeeCalendar);
  },

  AjouterHeureArriv: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { params } = req;
    const now = new Date();
    const employeeCalendar = await CalendrierEmpService.AjouterHeureArriv(
      parseInt(params.id),
      now
    );
    res.send(employeeCalendar);
  },
  AjouterHeureDep: async (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    const now = new Date();
    const employeeCalendar = await CalendrierEmpService.AjouterHeureDep(
      parseInt(params.id),
      now
    );
    res.send(employeeCalendar);
  },

  ModifierHeureCong: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { heureConge } = req.body;
    const employeeCalendar = await CalendrierEmpService.ModifierHeureCong(
      parseInt(id),
      heureConge
    );
    res.send(employeeCalendar);
  },

  getCalendarByTimeandId: async (req: Request,
    res: Response,
    next: NextFunction) => {
      const employeeCalendar = await CalendrierEmpService.getOneByDate(parseInt(req.params.id))
      res.send(employeeCalendar)

  },


  Suivreperformance: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const { dateString } = req.query;
    if (typeof dateString !== 'string' || id === undefined) {
      res.sendStatus(400)
      return;
    }
    const date = new Date(dateString);
    const performance = await CalendrierEmpService.Suivreperformance(
      parseInt(id),
      date
    );
    res.json(performance);
  },
};
