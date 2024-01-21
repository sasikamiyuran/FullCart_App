using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.DTO.DTO
{
    public class BrandDto
    {
        public int BrandId { get; set; }
        public string Name { get; set; }
        public string ImagePath { get; set; }
    }
}
