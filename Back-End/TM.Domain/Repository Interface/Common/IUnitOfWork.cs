namespace TM.Domain.Repository_Interface
{
    public interface IUnitOfWork
    {
        ITreeRepository TreeRepo { get; }
        IUserRepository UserRepo { get; }
        IAssignmentRepository AssignmentRepo { get; }
        IPositionRepository PositionRepo { get; }
        ITypeTreeRepository TypeTreeRepo { get; }
        IWorkContentRepository WorkContentRepo { get; }
        Task<int> CompleteAsync();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
    }
}
