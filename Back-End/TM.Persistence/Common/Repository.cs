using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TM.Domain.Common;
using TM.Domain.Repository_Interface;

namespace TM.Persistence.Common
{
    public abstract class Repository<T> : IRepository<T> where T : BaseEntity
    {
        protected DbContext _dbContext;
        protected DbSet<T> _dbSet;

        public Repository(DbContext dbContext)
        {
            _dbContext = dbContext;
            _dbSet = dbContext.Set<T>();
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.AsNoTracking()
                               .ToListAsync();
        }

        public virtual async Task<IEnumerable<T>> FindAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public virtual async Task<T?> GetByIdAsync(string id)
        {
            return await _dbSet.AsNoTracking()
                               .FirstOrDefaultAsync(x => x.Id == id);
        }

        public virtual async Task<T?> FindByIdAsync(string id)
        {
            return await _dbSet.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task CreateAsync(params T[] entities)
        {
            await _dbSet.AddRangeAsync(entities);
            await _dbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(params T[] entities)
        {
            _dbSet.UpdateRange(entities);
            await _dbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(params T[] entities)
        {
            _dbSet.RemoveRange(entities);
            await _dbContext.SaveChangesAsync();
        }

        public async Task SoftDeleteAsync(params T[] entities)
        {
            foreach (var item in entities)
            {
                item.IsDeleted = true;
            }
            _dbSet.UpdateRange(entities);
            await _dbContext.SaveChangesAsync();
        }
    }
}
