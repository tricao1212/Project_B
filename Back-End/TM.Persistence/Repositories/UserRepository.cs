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

        public override async Task<IEnumerable<User>> GetAllAsync()
        {
            return await _dbSet.Include(x => x.Assignments).ThenInclude(w => w.WorkContent.Where(w => w.IsDeleted == false))
                               .AsNoTracking()
                               .ToListAsync();
        }

        public override async Task<IEnumerable<User>> FindAllAsync()
        {
            return await _dbSet.Include(x => x.Assignments).ThenInclude(w => w.WorkContent.Where(w => w.IsDeleted == false))
                               .ToListAsync();
        }

        public override async Task<User?> GetByIdAsync(string id)
        {
            return await _dbSet.Include(x => x.Assignments).ThenInclude(w => w.WorkContent.Where(w => w.IsDeleted == false))
                               .AsNoTracking()
                               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public override async Task<User?> FindByIdAsync(string id)
        {
            return await _dbSet.Include(x => x.Assignments).ThenInclude(w => w.WorkContent.Where(w => w.IsDeleted == false))
                               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<User?> GetByUserName(string userName)
        {
            return await _dbSet.AsNoTracking()
                               .FirstOrDefaultAsync(x => x.UserName == userName);
        }
    }
}
