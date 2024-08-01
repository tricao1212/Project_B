using System.ComponentModel.DataAnnotations;
using TM.Domain.Common;

namespace TM.Domain.Entity
{
    public class TypeTree : BaseEntity
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        public ICollection <Tree> ListTrees { get; set; } = new List<Tree>(); 
    }
}
