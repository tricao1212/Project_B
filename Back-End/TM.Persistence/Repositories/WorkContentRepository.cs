using Microsoft.EntityFrameworkCore;
using TM.Domain.Entity;
using TM.Domain.Repository_Interface;
using TM.Persistence.Common;

namespace TM.Persistence.Repositories
{
    public class WorkContentRepository : Repository<WorkContent>, IWorkContentRepository
    {
        public WorkContentRepository(DbContext dbContext) : base(dbContext) { }

        public async Task<WorkContent?> FindByContent(string content)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.Content == content);
        }
    }
}
