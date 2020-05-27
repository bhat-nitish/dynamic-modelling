using Modelling.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Managers
{
    public interface IModellingManager
    {
        Task<List<BaseModelDto>> GetAllBaseModels();

        Task<ServiceResponseDto> AddSegment(SegmentDto segment);

        Task<List<SegmentDto>> GetSegments();
    }
}
