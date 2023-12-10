import Demission from "../models/Demission";
import Employe from "../models/Employe";




const DemissionService = {
  createDemission: async (employeeId: number, data:any) => {
    try {
      const demission = await Demission.create({
       
        employeeId,
        ...data,
        submissionDate: new Date(),
        status: 'pending', // Set initial status to pending
      });
      return demission;
    } catch (error) {
      throw error;
    }
  },
  getAllDemission: async () => {
    try {
      const demissions = await Demission.findAll();
      console.log(demissions);
      
      return demissions;
    } catch (error) {
      console.log(error);
      
      throw error;
    }
  },
  getDemissionsByEmployeeId: (employeeId: number) => Demission.findAll({ where: { employeeId } }),

  //getAllDemissions: () => Demission.findAll(),
  
  approveDemission: async (demissionId: number) => {
    try {
      const demission = await Demission.findByPk(demissionId, {
        include: [{ model: Employe }],
      });
  
      if (!demission) {
        throw new Error("Demission not found");
      }
  
      if (demission.status === 'pending') {
        // Mettre à jour le statut et supprimer l'employé s'il est approuvé
        demission.status = 'approved';
        await demission.save();
  
        // Ensure that the employee is loaded
        const employee = demission.employee;
   
        if (employee) {
          // Supprimer l'employé avec onDelete: 'CASCADE' dans la définition de l'association
          await employee.destroy();
        } else {
          throw new Error("Employee not found for the demission");
        }
      }
      
      return demission;
    } catch (error) {
      throw error;
    }
  },
  
  

  rejectDemission: async (demissionId: number) => {
    try {
      const demission = await Demission.findByPk(demissionId);
      if (!demission) {
        throw new Error("Demission not found");
      }

      if (demission.status === 'pending') {
        // Mettre à jour le statut sans supprimer l'employé s'il est rejeté
        demission.status = 'rejected';
        await demission.save();
      }
     
      
      return demission;
    } catch (error) {
      throw error;
    }
  },
};

export default DemissionService;
