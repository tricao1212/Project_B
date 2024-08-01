using TM.Domain.Dtos.Response.WorkContent;

namespace TM.Domain.Dtos.Response.Tree
{
    public class TreeAssignment
    {
        public string Id { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public List<WorkContentRes>? WorkContent { get; set; } = new List<WorkContentRes>();
        public string? CreatedBy { get; set; }
    }
}
