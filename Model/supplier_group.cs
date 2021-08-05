using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace tuvsud_survey.Model
{
    public class supplier_group
    {
        public int id { get; set; }

        
        public string group_name { get; set; }

        [Column(TypeName = "TINYINT")]
        public bool status { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime created_dt { get; set; }

        [NotMapped]
        public virtual IEnumerable<organizations> orgs { get; set; }
    }
}
