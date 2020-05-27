using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Dto
{
    public class SegmentDto
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public bool IsActive { get; set; }

        public string ModelType { get; set; }

        public virtual ICollection<ModelDto> Models { get; set; }

    }
}
