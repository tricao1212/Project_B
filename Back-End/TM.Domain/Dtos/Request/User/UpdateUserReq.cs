using System.ComponentModel.DataAnnotations;
using TM.Domain.Enum;

namespace TM.Domain.Dtos.Request.User
{
    public class UpdateUserReq
    {
        [Required]
        public string FullName { get; set; } = null!;

        [Phone]
        public string? Phone { get; set; }

        public DateTime? Dob { get; set; }

        [Required]
        public Role Role { get; set; }
    }
}
