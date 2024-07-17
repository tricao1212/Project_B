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

        public string FullName { get; set; } = string.Empty;

        [Phone]
        public string Phone { get; set; } = string.Empty;

        public string Avatar { get; set; } = string.Empty;

        public DateOnly Dob { get; set; }

        public Role Role { get; set; } = Role.Staff;
        public ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
    }
}
