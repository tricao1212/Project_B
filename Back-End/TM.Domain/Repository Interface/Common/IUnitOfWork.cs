namespace TM.Domain.Repository_Interface
{
    public interface IUnitOfWork
    {
        ITreeRepository TreeRepo { get; }
        Task<int> CompleteAsync();
        Task BeginTransactionAsync();
        Task CommitTransactionAsync();
        Task RollbackTransactionAsync();
    }
}
