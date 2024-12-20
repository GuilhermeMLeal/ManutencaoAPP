﻿using System.ComponentModel.DataAnnotations.Schema;

namespace ToolAPI.Models
{
    public class Tool
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
    }
}