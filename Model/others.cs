using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace tuvsud_survey.Model
{
    public class others
    {
        public int id { get; set; }
        [Column(TypeName="VARCHAR(80)")]
        public string name { get; set; }

        [Column(TypeName ="VARCHAR(255)")]
        public string info { get; set; }

        [Column(TypeName = "TINYINT")]
        public bool status { get; set; }

        [Column(TypeName = "DATETIME")]
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime created_dt { get; set; }


        [ForeignKey("others_type_id")]
        public int others_type_id { get; set; }

        [ForeignKey("others_type_id")]
        public others_type others_type { get; set; }


    }
}
