using System.ComponentModel.DataAnnotations;
using TM.Domain.Enum;

namespace TM.Domain.Dtos.Request.User
{
    public class RegisterReq
    {
        [Required]
        public string UserName { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;

        [Required]
        public string FullName { get; set; } = null!;

        [Phone]
        public string? Phone { get; set; }

        public string? Avatar { get; set; }

        public DateTime? Dob { get; set; }

        [Required]
        public Role Role { get; set; }
    }
}
