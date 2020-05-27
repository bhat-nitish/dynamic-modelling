using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Entities
{
    public class BaseModelParameter
    {
        [Column("id")]
        public long Id { get; set; }

        [Column("model_id")]
        public long ModelId { get; set; }

        [Column("parameter_name")]
        public string ParameterName { get; set; }

        [Column("display_name")]
        public string DisplayName { get; set; }

        [Column("min_value")]
        public string MinValue { get; set; }

        [Column("max_value")]
        public string Maxvalue { get; set; }

        [Column("default_value")]
        public string DefaultValue { get; set; }

        [Column("type")]
        public string ParameterType { get; set; }

        [Column("description")]
        public string Description { get; set; }

        public virtual BaseModel Model { get; set; }
    }
}
