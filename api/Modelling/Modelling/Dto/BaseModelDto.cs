using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Dto
{
    public class BaseModelDto
    {
        public long Id { get; set; }

        public string ModelType { get; set; }

        public string FunctionName { get; set; }

        public string Path { get; set; }

        public string Y_Var_Type { get; set; }

        public string DisplayName { get; set; }

        public List<BaseModelParameterDto> Parameters { get; set; }

    }
}
