using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tuvsud_survey.Model;
using tuvsud_survey.Data;

namespace tuvsud_survey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionOptionsController : ControllerBase
    {
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            using (var context = new TuvSudContext())
            {
                var answer_options = context.question_options.Where(s => s.question_id == id).ToList();
                return new JsonResult(answer_options);

            }
        }
        [HttpPost]
        public void Post([FromBody]question_options qo)
        {

            using (var context = new TuvSudContext())
            {
                    context.Add(qo);
                    context.SaveChanges();
                }
        }


        [HttpPut]
        public void Put([FromBody]question_options qo)
        {

            using (var context = new TuvSudContext())
            {

                        var questionOptions = context.question_options.Where(x => x.id == qo.id).FirstOrDefault();
                        questionOptions.points = qo.points;
                        questionOptions.option_description = qo.option_description;
                        
                        context.SaveChanges();
                }
        }



    }
}
