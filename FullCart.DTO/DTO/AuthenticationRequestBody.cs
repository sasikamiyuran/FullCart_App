using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FullCart.DTO.DTO
{
    public class AuthenticationRequestBody
    {
        public string? UserName { get; set; } = null;
        public string? Password { get; set; } = null;
    }
}
