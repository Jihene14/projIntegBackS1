import { Request, Response, NextFunction } from "express";
import { sign } from "jsonwebtoken";
import EmployeService from "../services/EmployeService";
import jwtKey from "../auth/constant";
import Employe from "../models/Employe";
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
     await  user.save()
      res.send(user)
    }
    else
    {
      res.status(404).json({ message: "user not find" });
    }
    
  },
  deleteOne : async (req: Request, res: Response, next: NextFunction) => {
    const { params } = req;
    const {
      body: { email, nom, prenom, poste, adresse, departement, role },
    } = req;
    let user = await EmployeService.getOne(parseInt(params.id));
    if (user) {
     await user.destroy()
     res.status(200).json({ message: "deleted" });
    }
    else
    {
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
          
          nom,
          prenom,
          poste,
          adresse,
          departement,
          role,
        },
      } = req;
      const password = email.substr(0,3)+poste;
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
};
