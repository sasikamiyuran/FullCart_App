using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.DTO.DTO
{
    public class AuthenticationResponse
    {
        public bool Success { get; set; }
        public string? Token { get; set; } = null;
        public int? StatusCode { get; set; } = null;
    }
}
