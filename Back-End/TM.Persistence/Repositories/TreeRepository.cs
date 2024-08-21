using Microsoft.EntityFrameworkCore;
using TM.Domain.Dtos.Response.TypeTree;
using TM.Domain.Entity;
using TM.Domain.Repository_Interface;
using TM.Persistence.Common;

namespace TM.Persistence.Repositories
{
    public class TreeRepository : Repository<Tree>, ITreeRepository
    {
        public TreeRepository(DbContext dbContext) : base(dbContext)
        {
        }
        public override async Task<IEnumerable<Tree>> GetAllAsync()
        {
            var trees = await _dbSet.Include(x => x.Assignments.Where(y => y.IsDeleted == false)).ThenInclude(u => u.WorkContent)
                               .Include(x => x.Position)
                               .Include(x => x.TypeTree)
                               .AsNoTracking()
                               .Where(x => x.IsDeleted == false)
                               .ToListAsync();
            foreach (var tree in trees)
            {
                if (tree.TypeTree?.IsDeleted == true)
                {
                    tree.TypeTree = new TypeTree {};
                }
            }
            return trees;
        }

        public override async Task<IEnumerable<Tree>> FindAllAsync()
        {
            return await _dbSet.Include(x => x.Assignments).ThenInclude(u => u.WorkContent)
                               .Include(x => x.Position)
                               .Include(x => x.TypeTree)
                               .Where(x => x.IsDeleted == false)
                               .ToListAsync();
        }

        public override async Task<Tree?> GetByIdAsync(string id)
        {
            return await _dbSet.Include(x => x.Assignments.Where(y => y.IsDeleted == false)).ThenInclude(u => u.WorkContent)
                               .Include(x => x.Position)
                               .Include(x => x.TypeTree)
                               .AsNoTracking()
                               .Where(x => x.IsDeleted == false)
                               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public override async Task<Tree?> FindByIdAsync(string id)
        {
            return await _dbSet.Include(x => x.Assignments).ThenInclude(u => u.WorkContent)
                               .Include(x => x.Position)
                               .Include(x => x.TypeTree)
                               .Where(x => x.IsDeleted == false)
                               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<string> GenerateUniqueTreeCode()
        {
            var lastTree = await _dbSet
            .OrderByDescending(t => t.TreeCode)
            .FirstOrDefaultAsync();

            int nextNumber = 1;

            if (lastTree != null && lastTree.TreeCode.StartsWith("T"))
            {
                string numberPart = lastTree.TreeCode.Substring(1);
                if (int.TryParse(numberPart, out int lastNumber))
                {
                    nextNumber = lastNumber + 1;
                }
            }

            return $"T{nextNumber:D5}";
        }
    }
}
