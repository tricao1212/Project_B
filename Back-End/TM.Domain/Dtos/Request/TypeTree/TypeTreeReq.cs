using System.ComponentModel.DataAnnotations;

namespace TM.Domain.Dtos.Request.TypeTree
{
    public class TypeTreeReq
    {
        [Required]
        public string Name { get; set; } = null!;
    }
}
