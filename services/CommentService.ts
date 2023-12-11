import Comment from "../models/Comments";

const CommentService = {
  createComment: async (employeeId: number, content: string) => {
    try {
      const comment = await Comment.create({
        employeeId,
        content,
        date: new Date(),
      });
      return comment;
    } catch (error) {
      throw error;
    }
  },

  getCommentsByEmployeeId: (employeeId: number) => Comment.findAll({ where: { employeeId } }),

 
};

export default CommentService;
