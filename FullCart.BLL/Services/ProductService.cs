using AutoMapper;
using FullCart.BLL.Interfaces;
using FullCart.DAL.Context;
using FullCart.DAL.Entities;
using FullCart.DAL.Interface;
using FullCart.Domain.Entities;
using FullCart.DTO.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.BLL.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _repository;
        private readonly IMapper _mapper;
        public ProductService( IProductRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddProductAsync(ProductDto productDto)
        {
            Product brand = _mapper.Map<Product>(productDto);
            await _repository.AddAsync(brand);
        }

        public async Task DeleteAsync(int productId)
        {
            var product = await _repository.GetById(productId);

            await _repository.DeleteAsync(product);
        }

        public async Task<List<ProductDto>> GetAllProducts()
        {
            var res = await _repository.GetList();

            return _mapper.Map<List<ProductDto>>(res);
        }

        public async Task<ProductDto> GetProductById(int id)
        {
            var category = await _repository.Get(product => product.ProductId == id);

            return _mapper.Map<ProductDto>(category);
        }

        public async Task UpdateProductAsync(int Id, ProductDto productDto)
        {
            var product = _mapper.Map<Product>(productDto);
            await _repository.UpdateAsync(product);
        }
    }
}
