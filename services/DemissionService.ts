import Demission from "../models/Demission";

const DemissionService = {
  createDemission: async (employeeId: number, reason:string) => {
    try {
      const demission = await Demission.create({
       
        employeeId,
        reason,
        submissionDate: new Date(),
        status: 'pending', // Set initial status to pending
      });
      return demission;
    } catch (error) {
      throw error;
    }
  },

  getDemissionsByEmployeeId: (employeeId: number) => Demission.findAll({ where: { employeeId } }),

  // ... (other methods)
};

export default DemissionService;
