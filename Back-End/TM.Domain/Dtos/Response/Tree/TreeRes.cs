using TM.Domain.Dtos.Response.Assignment;
using TM.Domain.Dtos.Response.TypeTree;
using TM.Domain.Entity;

namespace TM.Domain.Dtos.Response.Tree
{
    public class TreeRes
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? TreeCode { get; set; } 
        public string? Image { get; set; }
        public double Age { get; set; }
        public double Heigh { get; set; }
        public double Diameter { get; set; }
        public int PlantYear { get; set; }
        public double Lat { get; set; }
        public double Lng { get; set; }
        public string? TypeTree { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; }
        public string? CreatedBy { get; set; } 
        public string? UpdatedBy { get; set; } 
        public List<TreeAssignment>? Assignments { get; set; } = new List<TreeAssignment> ();
    }
}
