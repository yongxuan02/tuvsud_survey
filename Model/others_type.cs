using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;


namespace tuvsud_survey.Model
{
    public class others_type
    {
        public int id { get; set;}

        [Column(TypeName ="VARCHAR(45)")]
        public string type_name { get; set; }
    }
}
