using FullCart.BLL.Interfaces;
using FullCart.DTO.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FullCart.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthenticationController(IAuthService authService)
        {
            _authService = authService; 
        }

        [HttpPost("Authenticate")]
        public async Task<AuthenticationResponse> Authenticate(AuthenticationRequestBody authenticationRequest)
        {
            var token = await _authService.GenerateToken(authenticationRequest.UserName, authenticationRequest.Password);

            if (token == null)
            {
                return new AuthenticationResponse { StatusCode = 401, Success = false };
            }

            return new AuthenticationResponse { Success = true, StatusCode = 200, Token = token };
        }
    }
}
