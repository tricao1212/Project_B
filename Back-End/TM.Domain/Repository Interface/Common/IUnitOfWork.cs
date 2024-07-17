namespace TM.Domain.Repository_Interface
{
    public interface IUnitOfWork
    {
        ITreeRepository TreeRepo { get; }
        IUserRepository UserRepo { get; }
        Task<int> CompleteAsync();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
    }
}
