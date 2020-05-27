using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Entities
{
    public class Segment
    {
        [Column("id")]
        public long Id { get; set; }

        [Column("segment_name")]
        public string Name { get; set; }

        [Column("segment_description")]
        public string Description { get; set; }

        [Column("is_active")]
        public bool IsActive { get; set; }

        [Column("model_type")]
        public string ModelType { get; set; }

        [Column("created_by")]
        public string CreatedBy { get; set; }

        [Column("created_on")]
        public DateTime CreatedAt { get; set; }

        [Column("last_updated_by")]
        public string UpdatedBy { get; set; }

        [Column("last_updated_on")]
        public DateTime UpdatedOn { get; set; }

        public virtual ICollection<Model> Models { get; set; }
    }
}
