using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using tuvsud_survey.Data;
using tuvsud_survey.Model;

namespace tuvsud_survey.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserQuestionFilterController : ControllerBase
    {
        [HttpGet]
        public JsonResult Get()
        {
            int[] test = new int[] { 7,10};
            int[] test3 = new int[] { 23,8};
            int[] test2 = new int[] { 25 };
            using (var context = new TuvSudContext())
            {
                var q = context.questions.Join(context.user_question_filter, q => q.id, u => u.question_id, (q, u) => new { ques = q, user = u }).Where(s=>test.Contains(s.user.pillar_id) && test3.Contains(s.user.industry_id) && test2.Contains(s.user.question_id)).Select
                    (m =>
                        new
                        {
                            m.ques.question_name,
                            m.user.industry_id,
                            m.ques.others.name
                        }
                    ).ToList();
                return new JsonResult(q);
               }
        }
        [HttpPost]
        public JsonResult GetAddedQuestion([FromBody]user_question_filter uqf)
        {
            using (var context = new TuvSudContext())
            {
                System.Diagnostics.Debug.WriteLine(uqf.pillarList);
                var q = context.questions.Join(context.user_question_filter, q => q.id, u => u.question_id, (q, u) => new { ques = q, user = u }).Where(s => s.user.company_type_id == uqf.company_type_id && s.user.sdg_id == uqf.sdg_id && uqf.pillarList.Contains(s.user.pillar_id) && uqf.industryList.Contains(s.user.industry_id)).Select(
                    m => new
                    {
                        m.ques.question_name,
                        m.ques.id,
                        m.ques.others.name,
                        created_dt = m.ques.created_dt.ToString("dd MMM yyyy")
                    }).Distinct().ToList();
                return new JsonResult(q);

                    
            }
        }

        [HttpPost("all_question")]
        public JsonResult GetAllQueston(user_question_filter uqf)
        {
            int[] test = new int[] { 7, 10 };

            List<int> q_id = new List<int>();
            using (var context = new TuvSudContext())
            {
                var q = context.questions.Join(context.user_question_filter, q => q.id, u => u.question_id, (q, u) => new { ques = q, user = u }).Where(s => s.user.company_type_id == uqf.company_type_id && s.user.sdg_id == uqf.sdg_id && uqf.pillarList.Contains(s.user.pillar_id) && uqf.industryList.Contains(s.user.industry_id)).Select(
                 m => new
                 {
                     m.ques.question_name,
                     m.ques.id,
                     m.ques.others.name,
                     created_dt = m.ques.created_dt.ToString("dd MMM yyyy")
                 }).ToList();

                foreach(var question in q)
                {
                    q_id.Add(question.id);
                }

                var questions = context.questions.Where(s => !q_id.Contains(s.id)).ToList();

                return new JsonResult(questions);
            }
        }

        [HttpPost("addToFilter")]
        public void addToFilter(user_question_filter uqf)
        {
            var q_id = uqf.QuestionIdList;
            var p_id = uqf.pillarList;
            var i_id = uqf.industryList;
            using (var context = new TuvSudContext())
            {
                foreach (var q in q_id)
                {
                  
                        var times = p_id.Count * p_id.Count;
                        var pCounter = 0;
                        var iCounter = 0;
                        for (var i = 0; i < times; i++)
                        {
                            if (iCounter == i_id.Count)
                            {
                                iCounter = iCounter % i_id.Count;
                                pCounter = pCounter + 1;
                            }
                            user_question_filter user_Question_Filter = new user_question_filter();
                            user_Question_Filter.question_id = q;
                            user_Question_Filter.company_type_id = uqf.company_type_id;
                            user_Question_Filter.sdg_id = uqf.sdg_id;
                            user_Question_Filter.pillar_id = p_id[pCounter];
                            user_Question_Filter.industry_id = i_id[iCounter];
                            iCounter = iCounter + 1;
                            context.Add(user_Question_Filter);
                             context.SaveChanges();


                    }
                }
            }

                }

        [HttpDelete("delete")]
        public void removeQuestionFilter(user_question_filter uqf)
        {
            var q_id = uqf.QuestionIdList;
            List<int> questionid = new List<int>();

            using (var context= new TuvSudContext())
            {
                var q = context.questions.Join(context.user_question_filter, q => q.id, u => u.question_id, (q, u) => new { ques = q, user = u }).Where(s => s.user.company_type_id == uqf.company_type_id && s.user.sdg_id == uqf.sdg_id && uqf.pillarList.Contains(s.user.pillar_id) && uqf.industryList.Contains(s.user.industry_id) && q_id.Contains(s.user.question_id)).Select(
                  m => new
                  {
                      m.ques.question_name,
                      m.ques.id,
                      m.ques.others.name,
                      created_dt = m.ques.created_dt.ToString("dd MMM yyyy")
                  }).ToList();


                foreach (var question in q)
                {
                    questionid.Add(question.id);
                }
                var user_ques_filter = context.user_question_filter.Where(s => questionid.Contains(s.question_id)).ToList();

                foreach (var question in user_ques_filter)
                {
                    context.user_question_filter.Remove(question);
                }
                context.SaveChanges();

        }
            
        }
    
}
    }


