using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Modelling.Dto;
using Modelling.Managers;

namespace Modelling.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ModellingController : ControllerBase
    {

        private readonly ILogger<ModellingController> _logger;

        private readonly IModellingManager _manager;

        public ModellingController(ILogger<ModellingController> logger, IModellingManager manager)
        {
            _logger = logger;
            _manager = manager;
        }

        [HttpGet("basemodels")]
        public async Task<List<BaseModelDto>> GetBaseModels()
        {
            return await _manager.GetAllBaseModels();
        }

        [HttpPost("segments")]
        public async Task<ServiceResponseDto> AddSegment([FromBody] SegmentDto segment)
        {
            return await _manager.AddSegment(segment);
        }


        [HttpGet("segments")]
        public async Task<List<SegmentDto>> GetSegments()
        {
            return await _manager.GetSegments();
        }
    }
}