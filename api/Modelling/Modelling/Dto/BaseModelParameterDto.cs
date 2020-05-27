using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Dto
{
    public class BaseModelParameterDto
    {
        public long Id { get; set; }

        public long ModelId { get; set; }

        public string ParameterName { get; set; }

        public string DisplayName { get; set; }

        public string MinValue { get; set; }

        public string MaxValue { get; set; }

        public string DefaultValue { get; set; }

        public string ParameterType { get; set; }

        public string Description { get; set; }

    }
}
