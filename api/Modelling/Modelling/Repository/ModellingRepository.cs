using Microsoft.EntityFrameworkCore;
using Modelling.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Repository
{
    public class ModellingRepository : IModellingRepository
    {
        private readonly ModellingContext _context;
        public ModellingRepository(ModellingContext context)
        {
            _context = context;
        }

        public async Task<List<BaseModel>> GetAllBaseModels()
        {
            return await _context.BaseModels.AsNoTracking().Include(m => m.ModelParameters).ToListAsync();
        }

        public async Task<List<Segment>> GetAllSegments()
        {
            return await _context.Segments.Where(s => s.IsActive).AsNoTracking().
                Include(m => m.Models).ThenInclude(m => m.BaseModel).ThenInclude(m => m.ModelParameters).ToListAsync();
        }

        public async Task<long> AddSegment(Segment segment)
        {
            using (var transaction = _context.Database.BeginTransaction())
            {
                try
                {
                    await _context.Segments.AddAsync(segment);
                    await _context.SaveChangesAsync();
                    transaction.Commit();
                    return segment.Id;
                }
                catch (Exception e)
                {
                    return 0;
                }
            }
        }
    }
}
