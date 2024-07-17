using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TM.Domain.Dtos.Request.User
{
    public class UpdateUserReq
    {
        public string FullName { get; set; } = string.Empty;

        [Phone]
        public string Phone { get; set; } = string.Empty;

        public string Avatar { get; set; } = string.Empty;

        public DateOnly Dob { get; set; }
    }
}
