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
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        public OrderService(IOrderRepository repository, IProductRepository productRepository, IMapper mapper)
        {
            _repository = repository;
            _productRepository = productRepository;
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

        public async Task<List<OrderItemProductDto>> GetOrderProductItemsByProductIdAsync(int orderId)
        {
            List<OrderItemProductDto> orderItemProductDtoList = new List<OrderItemProductDto>();
            var order = await _repository.GetOrderByIdAsync(orderId);
            foreach (var item in order.OrderItems)
            {
                OrderItemProductDto dto = new OrderItemProductDto();
                dto.ProductId = item.ProductId;
                var product = await _productRepository.GetById(dto.ProductId);
                dto.Name = product != null ? product.Name : "-- the product is not available --";
                dto.OrderItemId = item.OrderItemId;
                dto.Quantity = item.Quantity;
                dto.Price = item.Price;

                orderItemProductDtoList.Add(dto);
            }

            return orderItemProductDtoList;
        }

        public async Task UpdateOrderAsync(int Id, string orderStatus)
        {
            var order = await _repository.GetById(Id);
            order.Status = orderStatus;
            await _repository.UpdateAsync(order);
        }
    }
}
