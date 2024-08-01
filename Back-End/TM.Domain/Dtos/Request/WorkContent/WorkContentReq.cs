using System.ComponentModel.DataAnnotations;
using TM.Domain.Enum;

namespace TM.Domain.Dtos.Request.WorkContent
{
    public class WorkContentReq
    {
        public string? Id { get; set; }
        [Required]
        public string Content { get; set; } = null!;

        public WorkStatus Status { get; set; }
    }
}
