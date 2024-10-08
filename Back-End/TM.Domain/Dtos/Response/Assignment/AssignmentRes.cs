﻿using TM.Domain.Dtos.Response.WorkContent;

namespace TM.Domain.Dtos.Response.Assignment
{
    public class AssignmentRes
    {
        public string Id { get; set; } = null!;
        public string TreeId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public DateTime DeadLine { get; set; }
        public bool IsRequest { get; set; }
        public int Progress { get; set; }
        public DateTime? FinishedAt { get; set; }
        public List<WorkContentRes> WorkContent { get; set; } = new List<WorkContentRes>();
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }

    }
}
