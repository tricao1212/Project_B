using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TM.Domain.Dtos.Response.WorkContent;

namespace TM.Domain.Dtos.Response.Tree
{
    public class AssignmentDtos
    {
        public int Id { get; set; }
        public string UserId { get; set; } = null!;
        public ICollection<WorkContentRes>? WorkContent { get; set; }
        public string? CreatedBy { get; set; }
    }
}
