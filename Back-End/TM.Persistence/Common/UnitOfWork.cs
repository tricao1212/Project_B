using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TM.Domain.Repository_Interface;
using TM.Persistence.Data;
using TM.Persistence.Repositories;

namespace TM.Persistence.Common
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
        public UnitOfWork(TMDbContext context)
        {
            _context = context;

        }

        private TreeRepository TreeRepository;
        public ITreeRepository TreeRepo
        {
            get
            {
                return TreeRepository ??= new(_context);
            }
        }

        private UserRepository UserRepository;
        public IUserRepository UserRepo
        {
            get
            {
                return UserRepository ??= new(_context);
            }
        }

        public Task BeginTransactionAsync()
        {
            throw new NotImplementedException();
        }

        public Task CommitTransactionAsync()
        {
            throw new NotImplementedException();
        }

        public Task<int> CompleteAsync()
        {
            throw new NotImplementedException();
        }

        public Task RollbackTransactionAsync()
        {
            throw new NotImplementedException();
        }
    }
}
