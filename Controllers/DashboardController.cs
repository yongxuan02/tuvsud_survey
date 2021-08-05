using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tuvsud_survey.Data;

namespace tuvsud_survey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        [HttpGet]
        public JsonResult Get()
        {
            using (var context = new TuvSudContext())
            {

                var totalQuestions = context.questions.Count();
                var companies = (from o in context.organizations
                                 join ct in context.company_types on o.id equals ct.organizations_id 
                                 join ot in context.others on ct.company_type_id equals ot.id
                                 join oty in context.others_type on ot.others_type_id equals oty.id
                                 where oty.type_name == "Company Type"
                                 group o by ot.name into ctGrp
                                 select new
                                 {
                                     name = ctGrp.Key,
                                     count = ctGrp.Count()
                                 }).ToList();
                List<string> labels = new List<string>();
                List<int> data = new List<int>(); foreach (var c in companies)
                {
                    labels.Add(c.name);
                    data.Add(c.count);
                }
 
                return new JsonResult(new { question = totalQuestions, labels,data });
            }
        }
    }
}
