using TM.Domain.Dtos.Response.Assignment;
using TM.Domain.Enum;

namespace TM.Domain.Dtos.Response.User
{
    public class UserRes
    {
        public string? Id { get; set; } 
        public string? UserName { get; set; } 

        public string? FullName { get; set; } 

        public string? Phone { get; set; } 

        public string? Avatar { get; set; } 

        public DateTime? Dob { get; set; }

        public Role Role { get; set; }

        public List<UserAssignment>? Assignments { get; set; } = new List<UserAssignment>();

    }
}
