using System.ComponentModel.DataAnnotations;

namespace TM.Domain.Dtos.Request.Tree
{
    public class TreeReq
    {
        [Required]
        public string Name { get; set; } = null!;

        public double Age { get; set; }

        [Required]
        public double Heigh { get; set; }

        [Required]
        public double Diameter { get; set; }

        public int PlantYear { get; set; }

        [Required]
        public double Lat { get; set; }

        [Required]
        public double Lng { get; set; }

        [Required]
        public string TypeTree { get; set; } = null!;

        public string? Description { get; set; }
    }
}
