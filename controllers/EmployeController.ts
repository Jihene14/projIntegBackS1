import { Request, Response, NextFunction } from "express";
import { sign } from "jsonwebtoken";
import EmployeService from "../services/EmployeService";
import DemissionService from "../services/DemissionService";
import jwtKey from "../auth/constant";
import Employe from "../models/Employe";
import Demission from "../models/Demission";

export const EmployeController = {
  getAll: async (_req: Request, res: Response, _next: NextFunction) => {
    const Employes = await EmployeService.getAll();
    res.send(Employes);
  },

  updateOne: async (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    const {
      body: { email, nom, prenom, poste, adresse, departement, role },
    } = req;
    let user = await EmployeService.getOne(parseInt(params.id));
    if (user) {
      user.email = email;
      user.nom = nom;
      user.prenom = prenom;
      user.poste = poste;
      user.adresse = adresse;
      user.departement = departement;
      user.role = role;
      await user.save();
      res.send(user);
    } else {
      res.status(404).json({ message: "user not find" });
    }
  },
  deleteOne: async (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    const {
      body: { email, nom, prenom, poste, adresse, departement, role },
    } = req;
    let user = await EmployeService.getOne(parseInt(params.id));
    if (user) {
      await user.destroy();
      res.status(200).json({ message: "deleted" });
    } else {
      res.status(404).json({ message: "user not find" });
    }
  },

  getOne: async (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    const user = await EmployeService.getOne(parseInt(params.id));
    res.send(user);
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        body: { email, password },
      } = req;
      console.log({ email, password });
      const user = await EmployeService.login(email, password);
      console.log(password);
      console.log(email);
      console.log(user?.calendrier);

      if (user === null) {
        res.status(405).json({ message: "mail or password bad" });
      } else {
        const token = sign({ user: user }, jwtKey);

        res.json({ message: "Logged in successfully", token, user });
      }
    } catch (e) {
      console.log(e);
      res.send(e);
    }
  },

  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        body: {
          email,
          password,
          nom,
          prenom,
          poste,
          adresse,
          departement,
          role,
        },
      } = req;
      const user = await EmployeService.register(
        email,
        password,
        nom,
        prenom,
        poste,
        adresse,
        departement,
        role
      );
      if (user !== null) {
        const token = sign({ id: user.id }, jwtKey);

        res.status(200).send({ message: "registered in successfully", token });
      }
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "bel7a9 Error" });
    }
  },

  profile: async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as number;
    const profile = await EmployeService.getOne(user);
    res.json(profile);
  },
  getCommentsByEmployeeId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { employeeId } = req.params;
      const comments = await EmployeService.getCommentsByEmployeeId(
        parseInt(employeeId)
      );
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  },

  // Ajouter une méthode pour créer un commentaire pour un employé
  createComment: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeId } = req.params;
      const { content } = req.body;
      const newComment = await EmployeService.createComment(
        parseInt(employeeId),
        content
      );
      res
        .status(201)
        .json({ message: "Comment created successfully", data: newComment });
    } catch (error) {
      next(error);
    }
  },

  getDemissionsByEmployeeId: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { employeeId } = req.params;
      const demissions = await DemissionService.getDemissionsByEmployeeId(
        parseInt(employeeId)
      );
      res.status(200).json(demissions);
    } catch (error) {
      next(error);
    }
  },
  getAllDemission: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const demissions = await DemissionService.getAllDemission();
      res.status(200).json(demissions);
    } catch (error) {
      res.send(error);
    }
  },

  /*getAllDemissions: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const demissions = await EmployeService.getAllDemissions();
      res.json(demissions);
    } catch (error) {
      next(error);
    }
  },*/

  // Add a method to create a demission for an employee
  createDemission: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeId } = req.params;
      const { reason } = req.body;
      const newDemission = await DemissionService.createDemission(
        parseInt(employeeId),
        reason
      );
      res.status(201).json({
        message: "Demission submitted successfully",
        data: newDemission,
      });
    } catch (error) {
      next(error);
    }
  },
  approveDemission: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { demissionId } = req.params;
      const approvedDemission = await DemissionService.approveDemission(
        parseInt(demissionId)
      );
      res
        .status(200)
        .json({
          message: "Demission request approved successfully",
          data: approvedDemission,
        });
    } catch (error) {
      next(error);
    }
  },

  rejectDemission: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { demissionId } = req.params;
      const rejectedDemission = await DemissionService.rejectDemission(
        parseInt(demissionId)
      );
      res
        .status(200)
        .json({
          message: "Demission request rejected successfully",
          data: rejectedDemission,
        });
    } catch (error) {
      next(error);
    }
  },
  getAvantageEmp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeId } = req.params;
      const employee = await EmployeService.getAvantageEmp(
        parseInt(employeeId)
      );
      res.status(200).json({ data: employee });
    } catch (error) {
      next(error);
    }
  },
};
