using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TM.Domain.Common;

namespace TM.Domain.Entity
{
    public class Tree : BaseEntity
    {
        [Required]
        public string Name { get; set; } = null!;

        public string? TreeCode { get; set; }

        public string? Image {  get; set; }

        public double Age { get; set; }

        [Required]
        public double Heigh { get; set; }

        [Required]
        public double Diameter { get; set; }

        public int PlantYear { get; set; }

        public Position Position { get; set; } = null!;

        [ForeignKey(nameof(TypeTree))]
        public string TypeTreeId { get; set; } = null!;

        public TypeTree TypeTree { get; set; } = null!;

        public string Description { get; set; } = string.Empty;

        public ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
    }
}
