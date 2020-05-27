using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Modelling.Entities
{
    public class BaseModel
    {
        [Column("id")]
        public long Id { get; set; }

        [Column("model_type")]
        public string ModelType { get; set; }

        [Column("function_name")]
        public string FunctionName { get; set; }

        [Column("path")]
        public string Path { get; set; }

        [Column("y_var_type")]
        public string Y_Var_Type { get; set; }

        [Column("display_name")]
        public string DisplayName { get; set; }

        [Column("insert_date")]
        public DateTime? InsertDate { get; set; }

        [Column("last_updated_on")]
        public DateTime? LastUpdatedOn { get; set; }

        public virtual ICollection<BaseModelParameter> ModelParameters { get; set; }

        public virtual ICollection<Model> Models { get; set; }

    }
}
