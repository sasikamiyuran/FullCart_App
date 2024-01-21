using FullCart.DTO.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.BLL.Interfaces
{
    public interface IBrandService
    {
        Task<List<BrandDto>> GetAllBrands();
        Task AddBrandAsync(BrandDto brand);
        Task UpdateBrandAsync(int Id, BrandDto brand);
    }
}
