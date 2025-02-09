import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const modelData = {
    metadata: {
      model_type: "logistic_regression",
      categorical_features: [
        "Smoking",
        "AlcoholDrinking",
        "Stroke",
        "DiffWalking",
        "Sex",
        "AgeCategory",
        "Race",
        "Diabetic",
        "PhysicalActivity",
        "Asthma",
        "KidneyDisease",
        "SkinCancer"
      ],
      numeric_features: [
        "BMI",
        "PhysicalHealth",
        "MentalHealth",
        "SleepTime",
        "GenHealth"
      ],
      baseline_risk: -2.237784032021903
    },
    feature_weights: {
      Smoking: {
        type: "categorical",
        values: {
          Yes: 0.20337573212249366,
          No: -0.21044635257519112
        }
      },
      AlcoholDrinking: {
        type: "categorical",
        values: {
          No: 0.047202007184353315,
          Yes: -0.054272627637044206
        }
      },
      Stroke: {
        type: "categorical",
        values: {
          No: -0.5539917265636719,
          Yes: 0.5469211061109664
        }
      },
      DiffWalking: {
        type: "categorical",
        values: {
          No: -0.37684008838536615,
          Yes: 0.3697694679327166
        }
      },
      Sex: {
        type: "categorical",
        values: {
          Female: -0.08999684548929685,
          Male: 0.0829262250365982
        }
      },
      AgeCategory: {
        type: "categorical",
        values: {
          "55-59": -0.10233583263990613,
          "80 or older": 0.6133858909929535,
          "65-69": 0.6246891916099535,
          "75-79": 0.9208797699200035,
          "40-44": -0.711619878006496,
          "70-74": 0.7096279138740962,
          "60-64": 0.43319262615643267,
          "50-54": -0.49285982295875214,
          "45-49": -0.8763721383298052,
          "18-24": -0.27930565489593406,
          "35-39": -0.36908681598784016,
          "30-34": -0.2896283205700656,
          "25-29": -0.1876375496173672
        }
      },
      Race: {
        type: "categorical",
        values: {
          White: 0.5298019440211238,
          Black: -0.1303107208169778,
          Asian: -0.20451842278173998,
          "American Indian/Alaskan Native": -0.2505751572089424,
          Other: 0.2614216353539811,
          Hispanic: -0.21288989902014643
        }
      },
      Diabetic: {
        type: "categorical",
        values: {
          Yes: 0.7577631559024847,
          No: 0.03590314284586798,
          "No, borderline diabetes": -0.6958684521274043,
          "Yes (during pregnancy)": -0.10486846707357611
        }
      },
      PhysicalActivity: {
        type: "categorical",
        values: {
          Yes: -0.132275888315965,
          No: 0.12520526786326594
        }
      },
      Asthma: {
        type: "categorical",
        values: {
          Yes: 0.04284975429317735,
          No: -0.04992037474586859
        }
      },
      KidneyDisease: {
        type: "categorical",
        values: {
          No: -0.37564436006632484,
          Yes: 0.36857373961365
        }
      },
      SkinCancer: {
        type: "categorical",
        values: {
          Yes: 0.047838950742418486,
          No: -0.0549095711951043
        }
      },
      BMI: {
        type: "numeric",
        weight: 0.003444954268588153
      },
      SleepTime: {
        type: "numeric",
        weight: 0.023616495560605116
      }
    }
  };

  // You can now use the `modelData` object in your JavaScript code to access the metadata and feature weights.

  const [weightsData, setWeightsData] = useState(null);
  const [probability, setProbability] = useState(null);
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
  const [user_risk, setUserRisk] = useState(null);

  // Calculate the weighted sum
  function calculateProbability() {
    console.log('Calculating probabilities');
    const { metadata, feature_weights } = modelData;
    let weightedSum = metadata.baseline_risk;

    // Create a mapping between form fields and model features
    const fieldToFeatureMap = {
      smoking: 'Smoking',
      alcohol: 'AlcoholDrinking',
      stroke: 'Stroke',
      difficultyWalking: 'DiffWalking',
      sex: 'Sex',
      ageCategory: 'AgeCategory',
      race: 'Race',
      diabetic: 'Diabetic',
      physicalActivity: 'PhysicalActivity',
      asthma: 'Asthma',
      kidneyDisease: 'KidneyDisease',
      skinCancer: 'SkinCancer',
      bmi: 'BMI',
      sleepTime: 'SleepTime'
    };

    // Calculate weighted sum for categorical and numeric features
    for (let field in formData) {
      let value = formData[field];
      const featureName = fieldToFeatureMap[field];
      
      if (featureName in feature_weights) {
        const featureData = feature_weights[featureName];

        // Handle categorical features
        if (featureData.type === 'categorical') {
          // Capitalize first letter of value
          value = value.charAt(0).toUpperCase() + value.slice(1);
          weightedSum += featureData.values[value] || 0;
        }
        // Handle numeric features
        else if (featureData.type === 'numeric') {
          weightedSum += featureData.weight * Number(value);
        }
      }
    }

    // Apply the logistic regression formula (sigmoid function)
    const probability = 1 / (1 + Math.exp(-weightedSum));

    // Convert to percentage
    return (probability * 100).toFixed(2);
  }

  useEffect(() => {
    const fetchData = async () => {
    console.log('Fetching data...');
      try {
        const response = await fetch('/heart_disease_model.json');  // Correct path
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);  // Log the data to the console
        setWeightsData(data);
      } catch (error) {
        console.error('Error loading weights:', error);  // Log any errors
      }
    };

    fetchData();  // Call the function to fetch data
  }, []);


  

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
    const risk = calculateProbability();
    setUserRisk(risk);
    console.log(`Your risk of heart disease is ${risk}%`);
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
            <option value="american indian/alaska native"> American Indian/Alaska Native</option>
            <option value="black">Black</option>
            <option value="hispanic">Hispanic</option>
            <option value="white">White</option>
            <option value="other">Other</option>
          </select>
        </div>


        <button type="submit">Submit</button>
      </form>

      {user_risk && (
        <div className="risk-result">
          <h2>Your Risk Assessment</h2>
          <p>Based on your responses, your risk of heart disease is {user_risk}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
