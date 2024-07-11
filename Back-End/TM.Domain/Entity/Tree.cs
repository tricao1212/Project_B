using System.ComponentModel.DataAnnotations;
using TM.Domain.Common;

namespace TM.Domain.Entity
{
    public class Tree : BaseEntity
    {
        [Required]
        public string Name { get; set; } = null!;

        public string Image {  get; set; } = string.Empty;

        [Required]
        public int Age { get; set; }

        [Required]
        public double Heigh { get; set; }

        [Required]
        public string Position { get; set; } = null!;

        public string Description { get; set; } = string.Empty;
        public ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
    }
}
