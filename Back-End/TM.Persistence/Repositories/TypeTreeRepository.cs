using Microsoft.EntityFrameworkCore;
using TM.Domain.Entity;
using TM.Domain.Repository_Interface;
using TM.Persistence.Common;

namespace TM.Persistence.Repositories
{
    public class TypeTreeRepository : Repository<TypeTree>, ITypeTreeRepository
    {
        public TypeTreeRepository(DbContext dbContext) : base(dbContext) { }

        public override async Task<IEnumerable<TypeTree>> GetAllAsync()
        {
            return await _dbSet.Include(x => x.ListTrees).ThenInclude(u => u.Position)
                               .AsNoTracking()
                               .Where(x => x.IsDeleted == false)
                               .ToListAsync();
        }

        public override async Task<IEnumerable<TypeTree>> FindAllAsync()
        {
            return await _dbSet.Include(x => x.ListTrees).ThenInclude(u => u.Position)
                               .Where(x => x.IsDeleted == false)
                               .ToListAsync();
        }

        public override async Task<TypeTree?> GetByIdAsync(string id)
        {
            return await _dbSet.Include(x => x.ListTrees).ThenInclude(u => u.Position)
                               .AsNoTracking()
                               .Where(x => x.IsDeleted == false)
                               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public override async Task<TypeTree?> FindByIdAsync(string id)
        {
            return await _dbSet.Include(x => x.ListTrees).ThenInclude(u => u.Position)
                               .Where(x => x.IsDeleted == false)
                               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<TypeTree?> FindByName(string name)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.Name == name);
        }
    }
}
