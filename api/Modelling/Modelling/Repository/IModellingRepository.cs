using Modelling.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Repository
{
    public interface IModellingRepository
    {
        Task<List<BaseModel>> GetAllBaseModels();

        Task<long> AddSegment(Segment segment);

        Task<List<Segment>> GetAllSegments();
    }
}
