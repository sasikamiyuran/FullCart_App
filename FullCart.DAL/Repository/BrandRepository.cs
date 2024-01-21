using FullCart.DAL.Context;
using FullCart.DAL.Entities;
using FullCart.DAL.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.DAL.Repository
{
    public class BrandRepository : GenericRepository<Brand>, IBrandRepository
    {
        private readonly ApplicationDbContext _context;
        public BrandRepository(ApplicationDbContext context) : base(context)
        {
            this._context = context;
        }
    }
}
