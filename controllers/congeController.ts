import { Request, Response, NextFunction } from "express";
import DemandeCongeService from "../services/DemandeCongeService";

export const congeController = {
  createLeaveRequest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeId } = req.params;
      const newLeaveRequest = await DemandeCongeService.createLeaveRequest(parseInt(employeeId), req.body);
      res.status(201).json({ message: 'Leave request created successfully', data: newLeaveRequest });
    } catch (error) {
      next(error);
    }
  },

  getAllLeaveRequests: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const leaveRequests = await DemandeCongeService.getAllLeaveRequests();
      res.status(200).json(leaveRequests);
    } catch (error) {
      next(error);
    }
  },

  getLeaveRequestById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { leaveRequestId } = req.params;
      const leaveRequest = await DemandeCongeService.getLeaveRequestById(parseInt(leaveRequestId));

      if (leaveRequest) {
        res.status(200).json(leaveRequest);
      } else {
        res.status(404).json({ message: 'Leave request not found' });
      }
    } catch (error) {
      next(error);
    }
  },

  updateLeaveRequestStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { leaveRequestId } = req.params;
      const { status } = req.body;

      await DemandeCongeService.updateLeaveRequestStatus(parseInt(leaveRequestId), status);
      res.status(200).json({ message: 'Leave request status updated successfully' });
    } catch (error) {
      next(error);
    }
  },
  acceptLeaveRequest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { leaveRequestId } = req.params;

      await DemandeCongeService.acceptLeaveRequest(parseInt(leaveRequestId));
      res.status(200).json({ message: 'Leave request approved successfully' });
    } catch (error) {
      next(error);
    }
  },

  rejectLeaveRequest: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { leaveRequestId } = req.params;

      await DemandeCongeService.rejectLeaveRequest(parseInt(leaveRequestId));
      res.status(200).json({ message: 'Leave request rejected successfully' });
    } catch (error) {
      next(error);
    }
  },
};
