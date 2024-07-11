using System.ComponentModel.DataAnnotations;

namespace TM.Domain.Dtos.Request.Tree
{
    public class UpdateTreeReq
    {
        [Required]
        public string Name { get; set; } = null!;

        public string Image { get; set; } = string.Empty;

        public int Age { get; set; }

        [Required]
        public double Heigh { get; set; }

        [Required]
        public string Position { get; set; } = null!;

        public string Description { get; set; } = string.Empty;
    }
}
