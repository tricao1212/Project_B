using Microsoft.EntityFrameworkCore;
using TM.Domain.Entity;
using TM.Domain.Repository_Interface;
using TM.Persistence.Common;

namespace TM.Persistence.Repositories
{
    public class AssignmentRepository : Repository<Assignment>, IAssignmentRepository
    {
        public AssignmentRepository(DbContext dbContext) : base(dbContext) { }

        public override async Task<IEnumerable<Assignment>> GetAllAsync()
        {
            return await _dbSet.Include(x => x.WorkContent.Where(w => w.IsDeleted == false))
                               .AsNoTracking()
                               .Where(x => x.IsDeleted == false)
                               .ToListAsync();
        }

        public override async Task<IEnumerable<Assignment>> FindAllAsync()
        {
            return await _dbSet.Include(x => x.WorkContent.Where(w => w.IsDeleted == false))
                               .Where(x => x.IsDeleted == false)
                               .ToListAsync();
        }

        public override async Task<Assignment?> GetByIdAsync(string id)
        {
            return await _dbSet.Include(x => x.WorkContent.Where(w => w.IsDeleted == false))
                               .AsNoTracking()
                               .Where(x => x.IsDeleted == false)
                               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public override async Task<Assignment?> FindByIdAsync(string id)
        {
            return await _dbSet.Include(x => x.WorkContent.Where(w => w.IsDeleted == false))
                               .Where(x => x.IsDeleted == false)
                               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Assignment?> FindAssignmentByUserAndTree(string userId, string treeId)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.UserId == userId && x.TreeId == treeId);
        }
    }
}
