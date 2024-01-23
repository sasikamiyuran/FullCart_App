using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.DTO.DTO
{
    public class OrderItemProductDto: ProductDto
    {
        public int OrderItemId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

        public static implicit operator List<object>(OrderItemProductDto v)
        {
            throw new NotImplementedException();
        }
    }
}
