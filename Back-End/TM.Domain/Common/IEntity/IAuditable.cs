namespace TM.Domain.Common.IEntity
{
    public interface IAuditable
    {
        DateTime CreateAt { get; set; }
        DateTime UpdateAt { get; set; }
        string CreateBy { get; set; }
        string UpdateBy { get; set; }
    }
}
