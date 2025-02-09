import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    bmi: '',
    smoking: '',
    alcohol: '',
    stroke: '',
    difficultyWalking: '',
    sex: '',
    ageCategory: '',
    race: '',
    diabetic: '',
    physicalActivity: '',
    sleepTime: '',
    asthma: '',
    kidneyDisease: '',
    skinCancer: '',
  });


  

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "sleepTime") {
      const numValue = Number(value);
      if (numValue < 0 || numValue > 24) return; // Restrict values outside 0-24
    }

    if (name === "bmi") {
      const numValue = Number(value);
      if (numValue < 0 ) return; // Restrict values outside 0
    }
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="app-container">
      <h1 className="title">Heart Disease Questionnaire</h1>
      <form onSubmit={handleSubmit}>
      <div>
          <label>Age Category</label>
          <select
            name="ageCategory"
            value={formData.ageCategory}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="18-24">18-24</option>
            <option value="25-29">25-29</option>
            <option value="30-34">30-34</option>
            <option value="35-39">35-39</option>
            <option value="40-44">40-44</option>
            <option value="45-49">45-49</option>
            <option value="50-54">50-54</option>
            <option value="55-59">55-59</option>
            <option value="60-64">60-64</option>
            <option value="65-69">65-69</option>
            <option value="70-74">70-74</option>
            <option value="75-79">75-79</option>
            <option value="80 or older">80 or older</option>
          </select>
        </div>

        <div>
          <label>Sex</label>
          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label>BMI</label>
          <input
            type="number"
            name="bmi"
            value={formData.bmi}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Are you physically active?</label>
          <select
            name="physicalActivity"
            value={formData.physicalActivity}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label>How much sleep do you get daily? (hours)</label>
          <input
            type="number"
            name="sleepTime"
            value={formData.sleepTime}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Do you smoke?</label>
          <select
            name="smoking"
            value={formData.smoking}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label>Do you drink alcohol?</label>
          <select
            name="alcohol"
            value={formData.alcohol}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label>Have you been diagnosed with a stroke before?</label>
          <select
            name="stroke"
            value={formData.stroke}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label>Do you find it difficult to walk?</label>
          <select
            name="difficultyWalking"
            value={formData.difficultyWalking}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label>Do you have a history of asthma?</label>
          <select
            name="asthma"
            value={formData.asthma}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label>Do you have a history of diabetes?</label>
          <select
            name="diabetic"
            value={formData.diabetic}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label> Do you have a history of kidney disease?</label>
          <select
            name="kidneyDisease"
            value={formData.kidneyDisease}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label>Do you have a history of skin disease?</label>
          <select
            name="skinCancer"
            value={formData.skinCancer}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div>
          <label>Race:</label>
          <select
            name="race"
            value={formData.race}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="asian">Asian</option>
            <option value="black">Black</option>
            <option value="hispanic">Hispanic</option>
            <option value="white">White</option>
            <option value="other">Other</option>
          </select>
        </div>


        <button type="submit">Submit</button>
      </form>

      
    </div>
  );
}

export default App;
