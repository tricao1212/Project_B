namespace TM.Domain.Dtos.Response.Tree
{
    public class GetTreeRes
    {
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? Image { get; set; }
        public int Age { get; set; }
        public double Heigh { get; set; }
        public string? Position { get; set; }
        public string? Description { get; set; }
        public DateTime CreatedAt { get; set; } 
        public DateTime UpdatedAt { get; set; }
        public string CreatedBy { get; set; } = string.Empty;
        public string UpdatedBy { get; set; } = string.Empty;
    }
}
