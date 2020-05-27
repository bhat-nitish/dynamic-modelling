using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Dto
{
    public class ServiceResponseDto
    {
        public long Id { get; set; }

        public bool Success { get; set; }

        public string Message { get; set; }

        public int StatusCode { get; set; }

        public string Error { get; set; }
    }
}
