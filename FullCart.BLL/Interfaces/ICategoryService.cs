using FullCart.DTO.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.BLL.Interfaces
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllCategories();
        Task AddCategoryAsync(CategoryDto categoryDto);
        Task UpdateCategoryAsync(int Id, CategoryDto categoryDto);
    }
}
