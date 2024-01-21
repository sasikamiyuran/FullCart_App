using AutoMapper;
using FullCart.DAL.Entities;
using FullCart.DTO.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.Utility.Utility
{
    public class AutoMapperProfiles 
    {
        public class AutoMapperProfile : Profile
        {
            public AutoMapperProfile()
        {
            CreateMap<Brand, BrandDto>().ReverseMap();
            CreateMap<BrandDto, Brand>().ReverseMap();
        }
    }
}
}
