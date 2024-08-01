using TM.Domain.Entity;

namespace TM.Domain.Repository_Interface
{
    public interface ITreeRepository : IRepository<Tree>
    {
        Task<string> GenerateUniqueTreeCode();
    }
}
