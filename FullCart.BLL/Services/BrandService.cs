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
    public class BrandService : IBrandService
    {
        private readonly IBrandRepository _repository;
        private readonly IMapper _mapper;
        public BrandService( IBrandRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddBrandAsync(BrandDto brandDto)
        {
            Brand brand = _mapper.Map<Brand>(brandDto);
            await _repository.AddAsync(brand);
        }

        public async Task<List<BrandDto>> GetAllBrands()
        {
            var res = await _repository.GetList();

            return _mapper.Map<List<BrandDto>>(res);
        }

        public async Task UpdateBrandAsync(int Id, BrandDto brandDto)
        {
            var brand = _mapper.Map<Brand>(brandDto);
            await _repository.UpdateAsync(brand);
        }
    }
}
