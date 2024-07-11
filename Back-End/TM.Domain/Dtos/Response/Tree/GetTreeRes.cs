namespace TM.Domain.Dtos.Response.Tree
{
    public class GetTreeRes
    {
        public string? Id { get; set; } 
        public string Name { get; set; } = null!;
        public string Image { get; set; } = string.Empty;
        public int Age { get; set; }
        public double Heigh { get; set; }
        public string Position { get; set; } = null!;
        public string Description { get; set; } = string.Empty;
    }
}
