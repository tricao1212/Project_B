using System.ComponentModel.DataAnnotations;
using TM.Domain.Common.IEntity;

namespace TM.Domain.Common
{
    public abstract class BaseEntity : IAuditable, IDeletable
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public bool IsDeletable { get; set; } = true;
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 
        public string CreatedBy { get; set; } = string.Empty;
        public string UpdatedBy { get; set; } = string.Empty;
    }
}
