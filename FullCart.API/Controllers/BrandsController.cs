using FullCart.BLL.Interfaces;
using FullCart.DTO.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FullCart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class BrandsController : ControllerBase
    {
        private readonly IBrandService _service;
        public BrandsController(IBrandService service)
        {
            _service = service;
        }
        // GET: api/<BrandsController>
        [HttpGet]
        public async Task<List<BrandDto>> Get()
        {
            return await _service.GetAllBrands();
        }

        // GET api/<BrandsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<BrandsController>
        [HttpPost]
        public async void Post([FromBody] BrandDto value)
        {
            await _service.AddBrandAsync(value);
        }

        // PUT api/<BrandsController>/5
        [HttpPut("{id}")]
        public async void Put(int id, [FromBody] BrandDto Dto)
        {
            await _service.UpdateBrandAsync(id, Dto);
        }

        // DELETE api/<BrandsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
