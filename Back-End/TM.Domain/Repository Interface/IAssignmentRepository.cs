using TM.Domain.Entity;

namespace TM.Domain.Repository_Interface
{
    public interface IAssignmentRepository : IRepository<Assignment>
    {
        Task<Assignment?> FindAssignmentByUserAndTree(string userId, string treeId);
    }
}
