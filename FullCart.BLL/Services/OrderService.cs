using AutoMapper;
using FullCart.BLL.Interfaces;
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
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repository;
        private readonly IMapper _mapper;
        public OrderService(IOrderRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task AddOrderAsync(OrderDto orderDto)
        {
            Order order = _mapper.Map<Order>(orderDto);
            await _repository.AddAsync(order);
        }

        public Task DeleteAsync(int orderId)
        {
            throw new NotImplementedException();
        }

        public async Task<List<OrderDto>> GetAllOrders()
        {
            var res = await _repository.GetAllOrdersAsync();

            return _mapper.Map<List<OrderDto>>(res);
        }

        public async Task<OrderDto> GetOrderById(int id)
        {
            var category = await _repository.GetOrderByIdAsync(id);

            return _mapper.Map<OrderDto>(category);
        }

        public Task UpdateOrderAsync(int Id, OrderDto orderDto)
        {
            throw new NotImplementedException();
        }
    }
}
