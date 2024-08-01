using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TM.Domain.Common;
using TM.Domain.Enum;

namespace TM.Domain.Entity
{
    public class WorkContent : BaseEntity
    {
        [Required]
        public string Content { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(Assignment))]
        public string AssignmentId { get; set; } = null!;
        public virtual Assignment Assignment { get; set; } = null!;

        public WorkStatus Status { get; set; } = WorkStatus.OnProgress;
    }
}
