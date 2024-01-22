using FullCart.BLL.Interfaces;
using FullCart.DTO.DTO;
using Humanizer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FullCart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ICategoryService _service;
        public CategoriesController(ICategoryService service)
        {
            _service = service;
        }

        // GET: api/<CategoriesController>
        [HttpGet]
        public async Task<List<CategoryDto>> Get()
        {
            return await _service.GetAllCategories();
        }

        // GET api/<CategoriesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<CategoriesController>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async void Post([FromBody] CategoryDto dto)
        {
            await _service.AddCategoryAsync(dto);
        }

        // PUT api/<CategoriesController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async void Put(int id, [FromBody] CategoryDto dto)
        {
            await _service.UpdateCategoryAsync(id, dto);
        }

        // DELETE api/<CategoriesController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public void Delete(int id)
        {
        }
    }
}
