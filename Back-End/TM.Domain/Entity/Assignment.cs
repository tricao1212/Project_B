using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TM.Domain.Common;

namespace TM.Domain.Entity
{
    public class Assignment : BaseEntity
    {
        [ForeignKey(nameof(Tree))]
        public string TreeId { get; set; } = null!;

        public Tree Tree { get; set; } = null!;

        [ForeignKey(nameof(Staff))]
        public string StaffId { get; set; } = null!;

        public User Staff { get; set; } = null!;

        [Required]
        public string Content { get; set; } = null!;
    }
}
