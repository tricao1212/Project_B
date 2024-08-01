using System.ComponentModel.DataAnnotations;
using TM.Domain.Common.IEntity;

namespace TM.Domain.Common
{
    public abstract class BaseEntity : IAuditable, IDeletable
    {
        [Key]
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public bool IsDeleted { get; set; } = false;
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; } 
        public string CreatedBy { get; set; } = string.Empty;
        public string UpdatedBy { get; set; } = string.Empty;
    }
}
