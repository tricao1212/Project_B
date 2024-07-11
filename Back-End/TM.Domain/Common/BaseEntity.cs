using System.ComponentModel.DataAnnotations;
using TM.Domain.Common.IEntity;

namespace TM.Domain.Common
{
    public abstract class BaseEntity : IAuditable, IDeletable
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public bool IsDeletable { get; set; } = false;
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime UpdateAt { get; set; } = DateTime.Now;
        public string CreateBy { get; set; } = string.Empty;
        public string UpdateBy { get; set; } = string.Empty;
    }
}
