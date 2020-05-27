using Modelling.Dto;
using Modelling.Entities;
using Modelling.Repository;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

namespace Modelling.Managers
{
    public class ModellingManager : IModellingManager
    {
        private IModellingRepository _repository;

        public ModellingManager(IModellingRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<BaseModelDto>> GetAllBaseModels()
        {
            List<BaseModel> baseModels = await _repository.GetAllBaseModels();
            return baseModels.Select(bm => new BaseModelDto()
            {
                Id = bm.Id,
                DisplayName = bm.DisplayName,
                FunctionName = bm.FunctionName,
                ModelType = bm.ModelType,
                Parameters = bm.ModelParameters.Select(mp => new BaseModelParameterDto()
                {
                    Id = mp.Id,
                    DefaultValue = mp.DefaultValue,
                    Description = mp.Description,
                    DisplayName = mp.DisplayName,
                    MaxValue = mp.Maxvalue,
                    MinValue = mp.MinValue,
                    ModelId = mp.ModelId,
                    ParameterName = mp.ParameterName,
                    ParameterType = mp.ParameterType
                }).ToList(),
                Path = bm.Path,
                Y_Var_Type = bm.Y_Var_Type
            }).ToList();
        }

        public BaseModelDto MapBaseModelDto(BaseModel bm)
        {
            BaseModelDto baseModelDto = new BaseModelDto();
            baseModelDto.Id = bm.Id;
            baseModelDto.DisplayName = bm.DisplayName;
            baseModelDto.FunctionName = bm.FunctionName;
            baseModelDto.ModelType = bm.ModelType;
            baseModelDto.Parameters = bm.ModelParameters.Select(mp => new BaseModelParameterDto()
            {
                Id = mp.Id,
                DefaultValue = mp.DefaultValue,
                Description = mp.Description,
                DisplayName = mp.DisplayName,
                MaxValue = mp.Maxvalue,
                MinValue = mp.MinValue,
                ModelId = mp.ModelId,
                ParameterName = mp.ParameterName,
                ParameterType = mp.ParameterType
            }).ToList();
            baseModelDto.Path = bm.Path;
            baseModelDto.Y_Var_Type = bm.Y_Var_Type;
            return baseModelDto;
        }

        private async Task<List<Model>> MapNStepModels(SegmentDto segment)
        {

            Model parentModel = new Model()
            {
                BaseModelId = 1,
                Name = segment.Models.FirstOrDefault().Name,
                CreatedAt = DateTime.Now,
                CreatedBy = "admin",
                UpdatedBy = "admin",
                UpdatedOn = DateTime.Now,
                ModelType = segment.ModelType,
                ModelConfig = JsonConvert.SerializeObject(new List<ModelParamDto>()),
            };

            List<Model> models = segment.Models.FirstOrDefault().Models.Select(m => new Model()
            {
                BaseModelId = m.BaseModel.Id,
                Name = m.Name,
                CreatedAt = DateTime.Now,
                CreatedBy = "admin",
                UpdatedBy = "admin",
                UpdatedOn = DateTime.Now,
                ModelType = segment.ModelType,
                ModelConfig = JsonConvert.SerializeObject(m.Parameters),
                ParentModel = parentModel
            }).ToList();

            List<Model> response = new List<Model>();
            response.Add(parentModel);
            response.AddRange(models);
            return response;
        }

        private async Task<List<Model>> MapOneStepModel(SegmentDto segment)
        {
            return segment.Models.Select(m => new Model()
            {
                BaseModelId = m.BaseModel.Id,
                Name = m.Name,
                CreatedAt = DateTime.Now,
                CreatedBy = "admin",
                UpdatedBy = "admin",
                UpdatedOn = DateTime.Now,
                ModelType = segment.ModelType,
                ModelConfig = JsonConvert.SerializeObject(m.Parameters),
                ParentId = 0,
            }).ToList();
        }

        private List<ModelDto> MapOneStepModelDto(Segment segment)
        {
            return segment.Models.Select(m => new ModelDto()
            {
                Id = m.Id,
                SegmentId = m.SegmentId,
                BaseModel = MapBaseModelDto(m.BaseModel),
                BaseModelId = m.BaseModel.Id,
                ModelType = m.ModelType,
                Name = m.Name,
                Parameters = JsonConvert.DeserializeObject<List<ModelParamDto>>(m.ModelConfig).Select(param => new ModelParamDto()
                {
                    BaseModelId = param.BaseModelId,
                    BaseModelParamId = param.BaseModelParamId,
                    Value = param.Value
                }).ToList()
            }).ToList();
        }


        private List<ModelDto> MapNstepModelDto(Segment segment)
        {
            List<ModelDto> models = new List<ModelDto>();
            Model parentModel = segment.Models.FirstOrDefault(m => m.ParentId <= 0);
            ModelDto parentModelDto = new ModelDto()
            {
                Id = parentModel.Id,
                SegmentId = parentModel.SegmentId,
                ModelType = parentModel.ModelType,
                Name = parentModel.Name,
                Parameters = new List<ModelParamDto>()
            };
            parentModelDto.Models = segment.Models.Where(m => m.ParentId > 0).Select(m => new ModelDto()
            {
                Id = m.Id,
                SegmentId = m.SegmentId,
                BaseModel = MapBaseModelDto(m.BaseModel),
                BaseModelId = m.BaseModel.Id,
                ModelType = m.ModelType,
                Name = m.Name,
                Parameters = JsonConvert.DeserializeObject<List<ModelParamDto>>(m.ModelConfig).Select(param => new ModelParamDto()
                {
                    BaseModelId = param.BaseModelId,
                    BaseModelParamId = param.BaseModelParamId,
                    Value = param.Value
                }).ToList()

            }).ToList();
            models.Add(parentModelDto);
            return models;
        }

        public async Task<ServiceResponseDto> AddSegment(SegmentDto segment)
        {
            try
            {
                Segment newSegment = new Segment();
                newSegment.Name = segment.Name;
                newSegment.Description = segment.Description;
                newSegment.ModelType = segment.ModelType;
                newSegment.IsActive = true;
                newSegment.CreatedAt = DateTime.Now;
                newSegment.CreatedBy = "admin";
                newSegment.UpdatedBy = "admin";
                newSegment.UpdatedOn = DateTime.Now;

                switch (segment.ModelType)
                {
                    case ModelTypes.OneStep: newSegment.Models = await MapOneStepModel(segment); break;
                    case ModelTypes.NStep: newSegment.Models = await MapNStepModels(segment); break;
                }

                long segmentId = await _repository.AddSegment(newSegment);
                return new ServiceResponseDto()
                {
                    Id = segmentId,
                    Error = string.Empty,
                    Message = "Segment Added",
                    StatusCode = (int)HttpStatusCode.OK,
                    Success = true
                };
            }
            catch (Exception e)
            {
                return new ServiceResponseDto()
                {
                    Message = "Error adding segment",
                    StatusCode = (int)HttpStatusCode.OK,
                    Success = false
                };
            }
        }

        public async Task<List<SegmentDto>> GetSegments()
        {
            try
            {
                List<Segment> segments = await _repository.GetAllSegments();
                List<SegmentDto> response = segments.Select(s => new SegmentDto()
                {
                    Id = s.Id,
                    Description = s.Description,
                    Name = s.Name,
                    ModelType = s.ModelType,
                    IsActive = s.IsActive,
                    Models = GetModelForSegment(s)
                }).ToList();
                return response;
            }
            catch (Exception e)
            {
                return new List<SegmentDto>();
            }
        }

        private List<ModelDto> GetModelForSegment(Segment segment)
        {
            List<ModelDto> models = new List<ModelDto>();
            switch (segment.ModelType)
            {
                case ModelTypes.OneStep: models = MapOneStepModelDto(segment); break;
                case ModelTypes.NStep: models = MapNstepModelDto(segment); break;
            }
            return models;
        }



    }
}
