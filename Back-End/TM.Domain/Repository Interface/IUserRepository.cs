using TM.Domain.Entity;

namespace TM.Domain.Repository_Interface
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> GetByUserName(string userName);
    }
}
