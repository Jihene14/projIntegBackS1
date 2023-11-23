import CalendrierEmp from "../models/CalendrierEmp";
import Employe from "../models/Employe";
import bcrypt from "bcryptjs";

const EmployeService = {
  getAll: async () => {
    return await Employe.findAll( { include: [CalendrierEmp] });
  },
  getOne: (id: number) => {
    return Employe.findOne({ where: { id } ,include: [CalendrierEmp]});
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
  register: async (email: string, password: string, nom: string, prenom: string, poste: string, adresse: string, departement: string,role:string) => {
    const createdAt = new Date();
    const updatedAt = new Date()
    const hashedPassword = await bcrypt.hash(password, 10);
    const employe = await Employe.create({ email, nom, prenom, poste, adresse, departement, password: hashedPassword,role,createdAt,updatedAt });
    return employe;
  },
};

export default EmployeService;
