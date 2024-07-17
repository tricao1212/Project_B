using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TM.Domain.Enum;

namespace TM.Domain.Dtos.Response.User
{
    public class UserRes
    {
        public string UserName { get; set; } = null!;

        public string FullName { get; set; } = string.Empty;

        public string Phone { get; set; } = string.Empty;

        public string Avatar { get; set; } = string.Empty;

        public DateOnly Dob { get; set; }
        public Role role { get; set; }
    }
}
