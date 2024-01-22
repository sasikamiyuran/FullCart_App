using FullCart.BLL.Interfaces;
using FullCart.Domain.Entities;
using FullCart.DTO.DTO;
using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FullCart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _service;
        public ProductsController(IProductService service)
        {
            _service = service;
        }

        // GET: api/<ProductsController>
        [HttpGet]
        public async Task<List<ProductDto>> Get()
        {
            return await _service.GetAllProducts();
        }

        // GET api/<ProductsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ProductsController>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async void Post([FromBody] ProductDto dto)
        {
            await _service.AddProductAsync(dto);
        }

        // PUT api/<ProductsController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async void Put(int id, [FromBody] ProductDto dto)
        {
            await _service.UpdateProductAsync(id, dto);
        }

        // DELETE api/<ProductsController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public void Delete(int id)
        {
        }
    }
}
