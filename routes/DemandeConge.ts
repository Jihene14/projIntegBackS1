import { Router } from "express";

import { congeController } from "../controllers/congeController";

const router = Router();




// LeaveRequest routes
router.post("/:employeeId/leave-request", congeController.createLeaveRequest);
router.get("/leave-requests", congeController.getAllLeaveRequests);
router.get("/leave-requests/:leaveRequestId", congeController.getLeaveRequestById);
router.patch("/leave-requests/:leaveRequestId", congeController.updateLeaveRequestStatus);
router.patch("/accept-leave-request/:leaveRequestId", congeController.acceptLeaveRequest); 
router.patch("/reject-leave-request/:leaveRequestId", congeController.rejectLeaveRequest); 

export default router;
