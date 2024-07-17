using Microsoft.EntityFrameworkCore;
using TM.Domain.Entity;
using TM.Domain.Repository_Interface;
using TM.Persistence.Common;

namespace TM.Persistence.Repositories
{
    public class UserRepository : Repository<User>, IUserRepository
    {
        public UserRepository(DbContext dbContext) : base(dbContext)
        {
        }

        public async Task<User> GetByUserName(string userName)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.UserName == userName);
        }
    }
}
