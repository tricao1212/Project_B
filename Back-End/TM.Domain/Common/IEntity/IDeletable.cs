namespace TM.Domain.Common.IEntity
{
    public interface IDeletable
    {
        bool IsDeleted { get; set; }
    }
}
