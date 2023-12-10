import AvantageEmp from "../models/AvantageEmp";
import AventageEmp from "../models/AvantageEmp";
import CalendrierEmp from "../models/CalendrierEmp";
import Demission from "../models/Demission";
import Employe from "../models/Employe";
import CommentService from "./CommentService";
import bcrypt from "bcryptjs";

const EmployeService = {
  getAll: async () => {
    return await Employe.findAll({ include: [CalendrierEmp] });
  },
  getOne: (id: number) => {
    return Employe.findOne({ where: { id }, include: [CalendrierEmp] });
  },
  login: async (email: string, password: string) => {
    const user = await Employe.findOne({
      where: { email: email },
    });
    console.log(user);

    if (user === null) {
      return null;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log(isPasswordValid);

    return isPasswordValid ? user : null;
  },
  register: async (
    email: string,
    password: string,
    nom: string,
    prenom: string,
    poste: string,
    adresse: string,
    departement: string,
    role: string
  ) => {
    const createdAt = new Date();
    const updatedAt = new Date();
    const hashedPassword = await bcrypt.hash(password, 10);
    const employe = await Employe.create({
      email,
      nom,
      prenom,
      poste,
      adresse,
      departement,
      password: hashedPassword,
      role,
      createdAt,
      updatedAt,
    });
    return employe;
  },
  getCommentsByEmployeeId: (employeeId: number) =>
    CommentService.getCommentsByEmployeeId(employeeId),

  createComment: async (employeeId: number, content: string) => {
    try {
      return await CommentService.createComment(employeeId, content);
    } catch (error) {
      throw error;
    }
  },
  getAvantageEmp :async(employeeId:number)=>{
    try {
      const employee = await Employe.findOne({
        where: { id: employeeId },
        include: AvantageEmp,
      });
      return employee;
    } catch (error) {
      throw error;
    }
  },
  
  
};

export default EmployeService;
