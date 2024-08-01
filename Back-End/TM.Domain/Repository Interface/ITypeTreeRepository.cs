using TM.Domain.Entity;

namespace TM.Domain.Repository_Interface
{
    public interface ITypeTreeRepository : IRepository<TypeTree>
    {
        Task<TypeTree?> FindByName(string name);
    }
}
