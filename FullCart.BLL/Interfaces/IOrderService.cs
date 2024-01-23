using FullCart.DTO.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.BLL.Interfaces
{
    public interface IOrderService
    {
        Task<List<OrderDto>> GetAllOrders();
        Task<OrderDto> GetOrderById(int id);
        Task AddOrderAsync(OrderDto orderDto);
        Task UpdateOrderAsync(int Id, string orderStatus);
        Task DeleteAsync(int orderId);
        Task<List<OrderItemProductDto>> GetOrderProductItemsByProductIdAsync(int ProductId);
    }
}
