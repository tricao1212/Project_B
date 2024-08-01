using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TM.Domain.Dtos.Response.WorkContent;

namespace TM.Domain.Dtos.Response.User
{
    public class UserAssignment
    {
        public string Id { get; set; } = null!;
        public string TreeId { get; set; } = null!;
        public List<WorkContentRes>? WorkContent { get; set; } = new List<WorkContentRes>();
        public string? CreatedBy { get; set; }
    }
}
