using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using TM.Domain.Common;

namespace TM.Domain.Entity
{
    public class Position : BaseEntity
    {
        [Required]
        public double Lat { get; set; }

        [Required]
        public double Lng { get; set; }

        [ForeignKey(nameof(Tree))]
        public string TreeId { get; set; } = null!;

        public Tree Tree { get; set; } = null!;

    }
}
