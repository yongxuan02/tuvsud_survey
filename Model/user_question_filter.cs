using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;


namespace tuvsud_survey.Model
{
    public class user_question_filter
    {
        public int id { get; set; }

        [ForeignKey("question_id")]
        public int question_id { get; set; }

        [ForeignKey("company_type_id")]
        public int company_type_id { get; set; }

        [ForeignKey("sdg_id")]
        public int sdg_id { get; set; }
        [ForeignKey("pillar_id")]
        public int pillar_id { get; set; }
        [ForeignKey("industry_id")]
        public int industry_id { get; set; }
        [ForeignKey("organizations_id")]
        public int? organizations_id { get; set; }

        [NotMapped]
        public List<int> pillarList { get; set; }

        [NotMapped]
        public List<int> industryList { get; set; }


        [NotMapped]
        public List<int> QuestionIdList { get; set; }
    }
}
