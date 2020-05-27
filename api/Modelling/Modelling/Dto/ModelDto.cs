using System;
using System.Collections.Generic;

namespace Modelling.Dto
{
    public class ModelDto
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public long BaseModelId { get; set; }

        public long SegmentId { get; set; }

        public string ModelType { get; set; }

        public long ParentId { get; set; }

        public BaseModelDto BaseModel { get; set; }

        public List<ModelParamDto> Parameters { get; set; }

        public ModelDto ParentModel { get; set; }

        public List<ModelDto> Models { get; set; }
    }

    public class ModelParamDto
    {
        public long BaseModelId { get; set; }

        public long BaseModelParamId { get; set; }

        public string Value { get; set; }
    }
}
