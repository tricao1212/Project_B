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
        private TreeRepository _treeRepository;
        private UserRepository _userRepository;
        private AssignmentRepository _assignmentRepository;
        private PositionRepository _positionRepository;
        private TypeTreeRepository _typeTreeRepository;
        private WorkContentRepository _workContentRepository;

        public ITreeRepository TreeRepo
        {
            get
            {
                return _treeRepository ??= new(_context);
            }
        }

        public IUserRepository UserRepo
        {
            get
            {
                return _userRepository ??= new(_context);
            }
        }

        public IAssignmentRepository AssignmentRepo
        {
            get
            {
                return _assignmentRepository ??= new(_context);
            }
        }

        public IPositionRepository PositionRepo
        {
            get
            {
                return _positionRepository ??= new(_context);
            }
        }

        public ITypeTreeRepository TypeTreeRepo
        {
            get
            {
                return _typeTreeRepository ??= new(_context);
            }
        }

        public IWorkContentRepository WorkContentRepo
        {
            get
            {
                return _workContentRepository ??= new(_context);
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
