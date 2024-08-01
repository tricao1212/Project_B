using TM.Domain.Entity;

namespace TM.Domain.Repository_Interface
{
    public interface IWorkContentRepository: IRepository<WorkContent>
    {
        Task<WorkContent?> FindByContent(string content);
    }
}
