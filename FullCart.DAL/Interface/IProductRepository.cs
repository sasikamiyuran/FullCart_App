using FullCart.DAL.Entities;
using FullCart.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.DAL.Interface
{
    public interface IProductRepository : IGenericRepository<Product>
    {
    }
}
