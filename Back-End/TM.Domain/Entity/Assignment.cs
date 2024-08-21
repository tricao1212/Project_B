using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TM.Domain.Common;

namespace TM.Domain.Entity
{
    public class Assignment : BaseEntity
    {
        [Required]
        [ForeignKey(nameof(Tree))]
        public string TreeId { get; set; } = null!;

        public virtual Tree Tree { get; set; } = null!;

        [Required]
        [ForeignKey(nameof(User))]
        public string UserId { get; set; } = null!;

        public virtual User User { get; set; } = null!;

        public DateTime DeadLine { get; set; }

        public bool IsRequest { get; set; } = false;

        public DateTime? FinishedAt { get; set; }

        public int Progress { get; set; } = 0;

        public ICollection<WorkContent> WorkContent { get; set; } = new List<WorkContent>();
    }
}
