import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

export default function Faq() {
  const faqs = [
    {
      q: "1. I have superannuated from the services of NALCO. I have not received the PRMBS card. How to get the same?",
      a: "A. You are requested to meet the 'Designated Nodal Officer' along with following details: I. Employee No, II. Date of Birth (Self), III. Date of Superannuation, IV. Joint Photograph Self & Spouse, V. Spouse's Date of Birth, VI. Last place of posting, VII. Membership fee (in case not deposited), VIII. Emergency Address and contact no."
    },
    {
      q: "2. My Doctor has prescribed for Indoor Treatment. How I can get the Credit letter?",
      a: "Unlike for serving employees, Credit letters are not issued to ex-employees at present. You should avail the treatment on cash payment basis and submit the bills for reimbursement."
    },
    {
      q: "3. I have submitted Medical Claim through Courier. But I am not getting any information regarding settlement of my claim?",
      a: "A. You can contact Nodal Officer or visit the 'Hamesha Nalconian' website & register to view the status of your claim."
    },
    {
      q: "4. I am a chronic patient and regularly submit my claims. How I can know that what Limit or balance in PRMBS?",
      a: "A. You may kindly contact the designated Nodal Officer or visit 'Hamesha Nalconian' website & register and check the status of your claim."
    },
    {
      q: "5. I would like to undergo Executive Health Check up. How to undertake the same? What facilities are available in PRMBS, for the same?",
      a: "A. You may kindly undergo 'Executive Health Check Up', but each individual test should be advised and billed separately. Please note that no reimbursement can be made against a consolidated advice or bill for health check up packages at present."
    },
    {
      q: "6. I would like to undergo Dental Treatment. How I can do that? What facilities are available in PRMBS?",
      a: "A. You may undertake Dental Treatment and get reimbursement as per applicable – NALCO rates/CGHS rates/ Empanelled Hospital rates within entitlement of OPD."
    },
    {
      q: "7. I had undergone Eye Treatment and Doctor has prescribed Spectacle? What facilities are available in PRMBS for the same?",
      a: "A. You may avail reimbursement of Rs.4000/- within your OPD entitlement once every two years for the glasses of the spectacles."
    },
    {
      q: "8. How I will get my payment directly in my Bank Account?",
      a: "A. For the same, an ECS form is required to be submitted. ECS Form is to be duly signed by Bank. The ECS form may be downloaded from 'Hamesha Nalconian' website or may be taken from designated Nodal Officer."
    },
    {
      q: "9. I am an old aged Person and Doctor has advised me for Naturopathy Treatment. Is the claim admissible under PRMBS.",
      a: "A. No, the claim is not admissible within the existing framework of PRMBS."
    }
  ];

  return (
    <div className="page active" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <NavBar />
      <div className="container" style={{ flex: 1, padding: '40px 20px', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <h1 style={{ color: '#b71c1c', borderBottom: '2px solid #e2e8f0', paddingBottom: '10px', marginBottom: '30px' }}>FAQ</h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {faqs.map((faq, index) => (
            <div key={index} style={{ background: 'white', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#1e293b', lineHeight: '1.5' }}>{faq.q}</h3>
              <p style={{ margin: '0', color: '#3b82f6', fontSize: '15px', lineHeight: '1.6' }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
