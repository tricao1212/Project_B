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

        public ICollection<WorkContent> WorkContent { get; set; } = new List<WorkContent>();
    }
}
