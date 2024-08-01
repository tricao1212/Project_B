using TM.Domain.Common;

namespace TM.Domain.Repository_Interface
{
    public interface IRepository<T> where T : BaseEntity
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> FindAllAsync();
        Task<T?> GetByIdAsync(string id);
        Task<T?> FindByIdAsync(string id);
        Task CreateAsync(params T[] entities);
        Task UpdateAsync(params T[] entities);
        Task DeleteAsync(params T[] entities);
        Task SoftDeleteAsync(params T[] entities);
    }
}
