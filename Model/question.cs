using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;


namespace tuvsud_survey.Model
{
    public class question
    {
        public int id { get; set; }

        [Column(TypeName ="VARCHAR(255)")]
        public string question_name { get; set; }
        
        [Column(TypeName ="decimal(5,2)")]
        public decimal points { get; set; }

        [Column(TypeName ="TINYINT")]
        public bool show_others_option { get; set; }

        [Column(TypeName = "TINYINT")]

        public bool applicable { get; set; }

        [Column(TypeName = "TINYINT")]
        public bool status { get; set; }


        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime created_dt { get; set; }

        [ForeignKey("iso_std_id")]
        public int iso_std_id { get; set; }


        [ForeignKey("input_type_id")]
        public int input_type_id { get; set; }

        [ForeignKey("input_type_id")]
        public virtual input_types input_type { get; set; }


        [ForeignKey("iso_std_id")]

        public virtual others others { get; set; }

        public virtual IEnumerable<question_options> qolist { get; set; }

     



    }
}
