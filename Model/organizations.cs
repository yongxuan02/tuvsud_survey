using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace tuvsud_survey.Model
{
    public class organizations
    {
        public int id { get; set; }

        public string organization_name { get; set; }

        [ForeignKey("supplier_group_id")]
        public int? supplier_group_id { get; set; }

        [ForeignKey("supplier_group_id")]
        public virtual supplier_group supplier_group { get; set; }

        [ForeignKey("industry_id")]
        public int industry_id { get; set; }

        [ForeignKey("industry_id")]
        public virtual others industry { get; set; }

        public string uen { get; set; }

        public string address { get; set; }

        public string contact_person { get; set; }

        public string contact_no { get; set; }

        public string contact_email { get; set; }

        [Column(TypeName = "TINYINT")]
        public bool status { get; set; }
        [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
        public DateTime created_dt { get; set; }

        
        public virtual IEnumerable<company_types> company_types { get; set; }

      
    }
}
