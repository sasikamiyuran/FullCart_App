using FullCart.Domain.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.DAL.Entities
{
    public class Category
    {
        public int CategoryId { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; }

        // Assuming you store the image path, adjust as needed
        public string ImagePath { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
