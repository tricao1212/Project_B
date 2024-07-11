using System.ComponentModel.DataAnnotations;

namespace TM.Domain.Dtos.Request.Tree
{
    public class CreateTreeReq
    {
        [Required]
        public string? Name { get; set; }

        public string Image { get; set; } = string.Empty;

        public int Age { get; set; }

        [Required]
        public double Heigh { get; set; }

        [Required]
        public string Position { get; set; } = null!;

        public string Description { get; set; } = string.Empty;
    }
}
