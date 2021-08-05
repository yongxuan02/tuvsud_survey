using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace tuvsud_survey.Model
{
    public class company_types
    {
        public int id { get; set; }

        [ForeignKey("company_type_id")]
        public int company_type_id { get; set; }

        [ForeignKey("company_type_id")]
        public virtual others company_type { get; set; }

        [NotMapped]
        public virtual string company_type_name { get; set; }

        [ForeignKey("organizations_id")]
        public int organizations_id { get; set; }

        [ForeignKey("organizations_id")]
        public virtual organizations organizations { get; set; }
    }
}
