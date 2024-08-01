using System.ComponentModel.DataAnnotations;
using TM.Domain.Common;
using TM.Domain.Enum;

namespace TM.Domain.Entity
{
    public class User : BaseEntity
    {
        [Required]
        public string UserName { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        public string? FullName { get; set; }

        [Phone]
        public string? Phone { get; set; }

        public string? Avatar { get; set; }

        public DateTime? Dob { get; set; }

        [Required]
        public Role Role { get; set; }
        public ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
    }
}
