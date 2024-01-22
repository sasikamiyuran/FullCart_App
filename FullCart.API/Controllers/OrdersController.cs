using FullCart.BLL.Interfaces;
using FullCart.DTO.DTO;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FullCart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _service;
        public OrdersController(IOrderService service)
        {
            _service = service;
        }
        // GET: api/<OrdersController>
        [HttpGet]
        public async Task<List<OrderDto>> Get()
        {
            return await _service.GetAllOrders();
        }

        // GET api/<OrdersController>/5
        [HttpGet("{id}")]
        public async Task<OrderDto> Get(int id)
        {
            return await _service.GetOrderById(id);
        }

        // POST api/<OrdersController>
        [HttpPost]
        public async void Post([FromBody] OrderDto orderDto)
        {
            await _service.AddOrderAsync(orderDto);
        }

        // PUT api/<OrdersController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<OrdersController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
