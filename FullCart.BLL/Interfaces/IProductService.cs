using FullCart.DTO.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.BLL.Interfaces
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllProducts();
        Task<ProductDto> GetProductById(int id);
        Task AddProductAsync(ProductDto productDto);
        Task UpdateProductAsync(int Id, ProductDto productDto);
        Task DeleteAsync(int productId);
    }
}
