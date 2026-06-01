import userImg from '../assets/user.jpg';

const retirees = [
  ['Pravat Kumar Subudhi', 'Superintendent (Elect)'],
  ['Madan Mohan Sahoo', 'Superintendent Gr.II'],
  ['Saligram Upadhyay', 'Engineer'],
  ['Suresh Chandra Bose', 'Sr. Manager'],
  ['Pramod Kumar Nayak', 'Officer'],
  ['Rajendro Prasad Tanti', 'Technician'],
  ['Karunakar Sethi', 'Foreman'],
  ['Krushna Chandra Moharana', 'Operator'],
  ['Manoj Kumar Nayak', 'Sr. Engineer'],
  ['Ratikanta Panda', 'Officer Gr.I'],
  ['Cheru Gochhayat', 'Manager'],
  ['Rameswar Hansdah', 'Technician Gr.II'],
  ['Kailash Chandra Sethy', 'Retired Employee'],
  ['Kishore Kumar Sethi', 'Retired Employee'],
  ['Iswar Chandra Besra', 'Retired Employee'],
  ['Ajit Kumar Behera', 'Retired Employee'],
  ['Chhatish Chandra Naik', 'Retired Employee'],
  ['Parsu Jani', 'Retired Employee'],
  ['Prabhat Kumar Padhy', 'Retired Employee'],
  ['Kailash Chandra Pradhan', 'Retired Employee'],
  ['Sukanta Kumar Nayak', 'Retired Employee'],
  ['Tushar Kumar Mishra', 'Retired Employee'],
  ['Saroj Kumar Sahoo', 'Retired Employee'],
  ['Dumbi Samad', 'Retired Employee'],
  ['Duryodhan Majhi', 'Retired Employee'],
  ['Sananda Chandra Parida', 'Retired Employee'],
  ['Prafulla Kumar Sahu', 'Retired Employee'],
  ['AIAYA KUMAR DEHURY', 'Retired Employee'],
  ['Dr. Sunil Kumar Lochab', 'Retired Employee'],
  ['Binav Krushna Mahapatra', 'Retired Employee'],
  ['Kailash Chandra Behera', 'Retired Employee'],
  ['Chamar Singh', 'Retired Employee'],
  ['JAYAKRUSHNA TUDU', 'Retired Employee'],
  ['Parsuram Dalnayak', 'Retired Employee'],
  ['Subrat Kumar Mishra', 'Retired Employee'],
  ['Naba Kishore Behera', 'Retired Employee'],
  ['Baklabhusan Naik', 'Retired Employee'],
  ['Krushna Mohan Samal', 'Retired Employee'],
  ['Naresh Chandra Dehury', 'Retired Employee'],
  ['Harekrushna Besra', 'Retired Employee'],
  ['Dhirendra Kumar Behera', 'Retired Employee'],
  ['Palani Murugan', 'Retired Employee'],
  ['Appana Panda', 'Retired Employee'],
  ['Budhuram Singh', 'Retired Employee'],
  ['Keshaba Charan Das', 'Retired Employee'],
  ['Sachidananda Jena', 'Retired Employee'],
  ['Mahendra Prasad Jena', 'Retired Employee'],
  ['Bharat Kumar Jena', 'Retired Employee'],
];

export default function PeopleGrid() {
  return (
    <div>
      <div className="section-title">
        <div className="title-accent"></div>
        <h2>Superannuation – This Month</h2>
        <div className="title-bar"></div>
      </div>
      <div className="people-grid" id="peopleGrid">
        {retirees.map((p, i) => (
          <div className="person card" key={i}>
            <div className="avatar" style={{ background: `url('${userImg}') center/cover no-repeat` }}></div>
            <div className="person-info">
              <h4>{p[0]}</h4>
              <p>{p[1]}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
