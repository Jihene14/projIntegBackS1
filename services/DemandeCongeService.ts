import LeaveRequest from "../models/DemandeConge";

const DemandeCongeService = {
  createLeaveRequest: async (employeeId: number, data: any) => {
    try {
      const leaveRequest = await LeaveRequest.create({
        ...data,
        employeeId,
        status: 'pending',
      });
      return leaveRequest;
    } catch (error) {
      throw error;
    }
  },

  getAllLeaveRequests: () => LeaveRequest.findAll(),

  getLeaveRequestById: (leaveRequestId: number) => LeaveRequest.findByPk(leaveRequestId),

  updateLeaveRequestStatus: async (leaveRequestId: number, status: 'approved' | 'rejected') => {
    try {
      const leaveRequest = await LeaveRequest.findByPk(leaveRequestId);

      if (leaveRequest) {
        leaveRequest.status = status;
        await leaveRequest.save();
      }
    } catch (error) {
      throw error;
    }
  },
  acceptLeaveRequest: async (leaveRequestId: number) => {
    try {
      const leaveRequest = await LeaveRequest.findByPk(leaveRequestId);

      if (leaveRequest) {
        leaveRequest.status = 'approved';
        await leaveRequest.save();
      }
    } catch (error) {
      throw error;
    }
  },
  rejectLeaveRequest: async (leaveRequestId: number) => {
    try {
      const leaveRequest = await LeaveRequest.findByPk(leaveRequestId);

      if (leaveRequest) {
        leaveRequest.status = 'rejected';
        await leaveRequest.save();
      }
    } catch (error) {
      throw error;
    }
  },
};

export default DemandeCongeService;
