using AutoMapper;
using FullCart.BLL.Interfaces;
using FullCart.DAL.Context;
using FullCart.DAL.Entities;
using FullCart.DAL.Interface;
using FullCart.DTO.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.BLL.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _repository;
        private readonly IMapper _mapper;
        public CategoryService( ICategoryRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddCategoryAsync(CategoryDto categoryDto)
        {
            Category brand = _mapper.Map<Category>(categoryDto);
            await _repository.AddAsync(brand);
        }

        public async Task DeleteAsync(int categoryId)
        {
            var category = await _repository.GetById(categoryId);

            await _repository.DeleteAsync(category);
        }

        public async Task<List<CategoryDto>> GetAllCategories()
        {
            var res = await _repository.GetList();

            return _mapper.Map<List<CategoryDto>>(res);
        }

        public async Task<CategoryDto> GetCategoryById(int id)
        {
            var category = await _repository.Get(category => category.CategoryId == id);

            return _mapper.Map<CategoryDto>(category);
        }

        public async Task UpdateCategoryAsync(int Id, CategoryDto categoryDto)
        {
            var brand = _mapper.Map<Category>(categoryDto);
            await _repository.UpdateAsync(brand);
        }
    }
}
