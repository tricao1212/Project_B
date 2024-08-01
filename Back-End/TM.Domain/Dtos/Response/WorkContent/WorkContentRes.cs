using TM.Domain.Enum;

namespace TM.Domain.Dtos.Response.WorkContent
{
    public class WorkContentRes
    {
        public string? Id { get; set; }
        public string? Content { get; set; }
        public WorkStatus Status { get; set; }
    }
}
