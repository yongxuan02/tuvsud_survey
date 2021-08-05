using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;


namespace tuvsud_survey.Model
{
    public class input_types
    {
        public int id { get; set; }

        [Column(TypeName = "VARCHAR(80)")]
        public string input_type_name { get; set; }
    }
}
