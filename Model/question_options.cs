using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace tuvsud_survey.Model
{
    public class question_options
    {
        public int id { get; set; }

        [Column(TypeName = "VARCHAR(255)")]
        public string option_description { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal points { get; set; }

        [ForeignKey("question_id")]

        public int question_id { get; set; }

        [ForeignKey("question_id")]

        public virtual question question { get; set; }


    }
}
