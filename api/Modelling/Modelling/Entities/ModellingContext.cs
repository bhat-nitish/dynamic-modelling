using Microsoft.EntityFrameworkCore;
using Modelling.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Entities
{
    public class ModellingContext : DbContext
    {
        public DbSet<BaseModel> BaseModels { get; set; }

        public DbSet<BaseModelParameter> BaseModelParameters { get; set; }

        public DbSet<Segment> Segments { get; set; }
        public DbSet<Model> Models { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseMySQL(ConnectionStringHelper.GetConnectionString());

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<BaseModel>(entity =>
            {
                entity.ToTable(name: "model_repo");
                entity.HasKey(e => e.Id);
            });

            builder.Entity<BaseModelParameter>(entity =>
            {
                entity.ToTable(name: "model_parameters");
                entity.HasKey(e => e.Id);
                entity.HasOne(g => g.Model).WithMany(u => u.ModelParameters).HasForeignKey(g => g.ModelId);
            });

            builder.Entity<Segment>(entity =>
            {
                entity.ToTable(name: "segments");
                entity.HasKey(e => e.Id);
            });

            builder.Entity<Model>(entity =>
            {
                entity.ToTable(name: "models");
                entity.HasKey(e => e.Id);
                entity.HasOne(g => g.Segment).WithMany(u => u.Models).HasForeignKey(g => g.SegmentId);
                entity.HasOne(s => s.ParentModel).WithMany().HasForeignKey(e => e.ParentId);
                entity.HasOne(g => g.BaseModel).WithMany(b => b.Models).HasForeignKey(g => g.BaseModelId);
            });
        }
    }
}
