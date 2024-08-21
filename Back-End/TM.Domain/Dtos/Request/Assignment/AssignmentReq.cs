using System.ComponentModel.DataAnnotations;
using TM.Domain.Dtos.Request.WorkContent;

namespace TM.Domain.Dtos.Request.Assignment
{
    public class AssignmentReq
    {
        [Required]
        public string TreeId { get; set; } = null!;

        [Required]
        public string UserId { get; set; } = null!;

        [Required]
        public List<WorkContentReq> WorkContent { get; set; } = new List<WorkContentReq>();

        public DateTime DeadLine { get; set; }

        public bool? IsRequest { get; set; }

        public DateTime? FinishedAt { get; set; }
    }
}
