﻿using TM.Domain.Dtos.Response.Tree;

namespace TM.Domain.Dtos.Response.TypeTree
{
    public class TypeTreeRes
    {
        public string? Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<TreeDtos>? ListTrees { get; set; } = new List<TreeDtos>();
    }
}
