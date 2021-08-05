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
    public class QuestionsController : ControllerBase
    {
        [HttpGet]
        public JsonResult Get()
        {
            using(var context = new TuvSudContext())
            {
                var questions = context.questions.Join(context.input_types, q => q.input_type_id, og => og.id, (q, og) => new { question = q, input_types = og })
                    .Join(context.others, s => s.question.iso_std_id, o => o.id, (s, o) => new { s.question, s.input_types, other = o }).Select
                    (m => new
                        {
                            m.question.id,
                        m.question.question_name,
                        m.question.status,
                        m.input_types.input_type_name,
                            m.other.name,
                            created_dt = m.question.created_dt.ToString("dd MMM yyyy")
                        }

                    ).ToList();

         
                return new JsonResult(questions);
            }
        }
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            using (var context = new TuvSudContext())
            {
                /*                var question = context.questions.Join(context.others,q=>q.iso_std_id,o=>o.id,(q,o)=>new { question=q,other=o}).Join(context.input_types,s=>s.question.input_type_id,og=>og.id,(s,og)=> new {s.question,s.other,input_types=og }).Where(q=>q.question.id == id)
                                    .Select(m => new { 
                                        m.question.question_name,
                                        m.question.input_type_id,
                                        m.question.applicable,
                                        m.question.show_others_option,
                                        m.question.iso_std_id,
                                        m.question.points
                                    }).FirstOrDefault();
                */
                var q = context.questions.Where(s => s.id == id).FirstOrDefault();
                var qolist = context.question_options.Where(qo => qo.question_id == id).ToList();
                q.qolist = qolist;
                return new JsonResult(q);
            }
        }
        [HttpPost]
        public JsonResult Post([FromBody] question q)
        {
            using (var context = new TuvSudContext())
            {
                context.Add(q);
                context.SaveChanges();
                /*
                foreach (var qo in q.qolist)
                {
                    System.Diagnostics.Debug.WriteLine("qo id is "+qo.id);
                    qo.question_id = q.id;
                    context.question_options.Add(qo);
                    
                }
                context.SaveChanges();
                */
                return new JsonResult(q.id);
            }

        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        { 
            using(var context = new TuvSudContext())
            {
                var q = context.questions.Where(s => s.id == id).FirstOrDefault<question>();
                var qo = context.question_options.Where(s => s.question_id == id).ToList();
                foreach (var i in qo)
                {
                    context.question_options.Remove(i);
                }
                context.SaveChanges();
                context.questions.Remove(q);
                context.SaveChanges();
            }
        }
        [HttpPut("{id}")]
        public void Update(question q)
        {
            System.Diagnostics.Debug.WriteLine(q.status);
            using (var context = new TuvSudContext())
            {
                var question = context.questions.Where(s => s.id == q.id).FirstOrDefault<question>();
                question.status = q.status;
                question.question_name = q.question_name;
                question.applicable = q.applicable;
                question.show_others_option = q.show_others_option;
                question.iso_std_id = q.iso_std_id;
                question.input_type_id = q.input_type_id;
                question.points = q.points;
                context.SaveChanges();
                foreach (var qo in q.qolist) {
                    if(qo.id==0) {
                        context.question_options.Add(qo);
                    }
                    else {
                        var curr_qo = context.question_options.Where(s => s.id == qo.id).FirstOrDefault();
                        if(qo.question_id==0)
                        {
                            context.question_options.Remove(curr_qo);
                        }
                        else { 
                            curr_qo.points = qo.points;
                            curr_qo.option_description = qo.option_description;
                        }
                        
                    }
                    context.SaveChanges();
                }
                  
            }
            

        }

    }
}
