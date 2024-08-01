using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TM.Domain.Entity;
using TM.Domain.Repository_Interface;
using TM.Persistence.Common;

namespace TM.Persistence.Repositories
{
    public class PositionRepository : Repository<Position>, IPositionRepository
    {
        public PositionRepository(DbContext dbContext) : base(dbContext) { }
    }
}
