using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Entities
{
    public class Model
    {
        [Column("id")]
        public long Id { get; set; }

        [Column("name")]
        public string Name { get; set; }

        [Column("base_model_id")]
        public long BaseModelId { get; set; }

        [Column("segment_id")]
        public long SegmentId { get; set; }

        [Column("model_type")]
        public string ModelType { get; set; }

        [Column("parent_id")]
        public long ParentId { get; set; }

        [Column("created_by")]
        public string CreatedBy { get; set; }

        [Column("created_on")]
        public DateTime CreatedAt { get; set; }

        [Column("last_updated_by")]
        public string UpdatedBy { get; set; }

        [Column("last_updated_on")]
        public DateTime UpdatedOn { get; set; }

        [Column("model_config")]
        public string ModelConfig { get; set; }

        public virtual BaseModel BaseModel { get; set; }

        public Model ParentModel { get; set; }

        public virtual Segment Segment { get; set; }

    }
}
