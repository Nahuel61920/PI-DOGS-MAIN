import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAllDogs, getAllTemperament, postDog } from "../../actions/actions";
import style from "../CardDogs/cardDogs.module.css";
import styles from "./form.module.css";
import stylesBack from "../CardDogDetail/cardDogDetail.module.css";

const checkUndefined = (input) => {
    if (!input.temperament.length) return true;
    for (let el in input) {
        if (input[el] === undefined) {
        return true;
        }
        return false;
    }
};

const checkZero = (arr) => {
    return arr.find((el) => Number(el) === 0); // comprueba si es 0
};

const checkLimit = (arr, limit) => {
  return arr.filter((el) => el > limit).length; // comprueba si es mayor que el limite
};

const checkNaN = (arr) => {
  return arr.filter((el) => isNaN(Number(el))).length; // comprueba si es NaN
};

const checkMinMax = (min, max) => {
  const nMax = Number(max);
  const nMin = Number(min);
  if (nMin > nMax || nMin === nMax) return false; // comprueba si es mayor al menor
  return true;
};

const checkNegatives = (arr) => {
  return arr.filter((el) => Number(el) < 0).length; // comprueba si es negatives
};

const validate = (input) => {
  const regexUrl =
    /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(jpg|jpeg|png)/i;
  const regexName = /^[a-zA-Z ]+$/;
  const {
    name,
    heightMax,
    heightMin,
    weightMax,
    weightMin,
    life_spanMin,
    life_spanMax,
    image,
  } = input;
  const numbers = [heightMax, heightMin, weightMax, weightMin, life_spanMin, life_spanMax];
  const errors = {};

  //check undefined
  if (checkUndefined(input)) {
    errors.allFields = "All fields are required";
  }
  //check name
  if (!regexName.test(name)) {
    errors.name = "Invalid name format";
  } else if (name.length < 4) {
    errors.name = "Name must be at least 4 characters";
  } else if (name[0] !== name[0].toUpperCase()) {
    errors.name = "Name must start with an uppercase letter";
  }

  //check negatives
  if (checkNegatives(numbers)) {
    errors.negatives = "Negative numbers are not valid";
  } 
  //check min-max
  if (!checkMinMax(weightMin, weightMax)) {
    errors.weight = "The max must be greater than the min";
  }
  if (!checkMinMax(heightMin, heightMax)) {
    errors.height = "The max must be greater than the min";
  }
  //check number type
  else if (checkNaN(numbers)) {
    errors.nan = "The weight, height and life span inputs must be a number";
  }
  //check min
  if (checkZero(numbers)) {
    errors.zero = "The value must be greater than zero"; 
  }
  //check max
  if (checkLimit([weightMin, weightMax], 100)) {
    errors.tooHeavy = "The weight can't be more than 100Kg";
  }
  if (checkLimit([heightMin, heightMax], 200)) {
    errors.tooTall = "The height can't be more than 2m";
  }
  if (checkLimit([life_spanMax, life_spanMin], 30)) {
    errors.tooOld = "The life span can't be more than 30 years";
    }
  if (input.image && !regexUrl.test(image)) { // test
    errors.url = "Only jpg, jpeg, and png urls are allowed";
  }

  return errors;
};

function CharacterCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { temperamen, dogsFilter  } = useSelector((state) => state);
  

  const initialState = {
    name: "",
    weightMin: "",
    weightMax: "",
    heightMin: "",
    heightMax: "",
    image: "",
    life_spanMin: "",
    life_spanMax: "",
    temperament: [],
  };
  const [errors, setErrors] = useState({
    allFields: "All fields are required",
  });
  const [input, setInput] = useState(initialState);
  
  useEffect(() => {
    dispatch(getAllTemperament());
    dispatch(getAllDogs());
  }, [dispatch]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleDelete = (e) => {
    setInput({
      ...input,
      temperament: input.temperament.filter((c) => c !== e.target.name),
    });
  };

  const handleSelect = (e) => {
    const { value } = e.target;
    if (input.temperament.includes(value))
      return alert("You've already selected that temperament");
    if (input.temperament.length < 6) {
      setInput({
        ...input,
        temperament: [...input.temperament, value],
      });
      setErrors(
        validate({
          ...input,
          temperament: [...input.temperament, value],
        })
      );
    } else alert("You've reached the max amount of temperaments");
  };

  const handleSubmit = (e) => {
    const namefilterd = dogsFilter.filter((el) => el.name === input.name);
    if (namefilterd.length) {
        e.preventDefault();
        alert("You can't use a name that already exists");
    } else {
    e.preventDefault();
    dispatch(postDog(input));
    console.log(input);
    alert("Dog created successfully");
    setInput(initialState);
    navigate("/home");
    }
  };

  

  return (
    <div className={styles.container}>
      <div className={stylesBack.button_back}>
          <Link to={`/home`}>
              <button>
                <span className={stylesBack.icon}>
                  ⬅️
                </span>
                <span className={stylesBack.label}>Back</span>
              </button>
          </Link>
      </div>
      <div className={styles.info}>
        <h1 className={styles.title}>Create your own dog</h1>
        
        <div className ={style.card}>
            <div className={style.card_container}>
                <div className={style.name}>
                    {
                        input.name.length > 0 ?
                        <h1>{input.name}</h1>
                        : <h1>Name</h1>
                    }
                </div>
                    <img
                        src={
                          input.image.length
                            ? input.image
                            : "https://www.publicdomainpictures.net/pictures/340000/nahled/dog-silhouette.png"
                        }
                        alt="dog profile"
                        className={style.image}
                      />
                <div className={style.container__info}>
                    <p>Peso: Min: {input.weightMin.length > 0 ? input.weightMin : "0"} Kg - Max: {input.weightMax.length > 0 ? input.weightMax : "0"} Kg</p>
                </div>
                <div className={style.temperament}>
                  {input.temperament.map((temperament) => (
                    <p key={temperament}>{temperament}</p>
                  ))}
                </div>
            </div>
        </div>
        <div className={styles.tempsContainer}>
          {input.temperament.map((temp) => (
            <div className={styles.tempsSelected} key={temp}>
              <button name={temp} onClick={handleDelete}>
                X
              </button>
              <p>{temp}</p>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className={styles.formBox}>
        <label key="nameInput">Name</label>
        <input
          id="nameInput"
          type="text"
          value={input.name}
          name="name"
          onChange={handleChange}
        />
        {errors.name && <span className={styles.error}>{errors.name} </span>}

        <label key="heightInput">Height</label>

        <div className={styles.inputs}>
          <input
            id="heightInput"
            type="number"
            value={input.heightMin}
            name="heightMin"
            onChange={handleChange}
            placeholder="Min "
          />
          <input
            id="heightInput"
            type="number"
            value={input.heightMax}
            name="heightMax"
            onChange={handleChange}
            placeholder="Max "
          />
        </div>

        {errors.height && (
          <span className={styles.error}>{errors.height} </span>
        )}
        {errors.tooTall && (
          <span className={styles.error}>{errors.tooTall} </span>
        )}

        <label key="weightInput">Weight</label>
        
        <div className={styles.inputs}>
          <input
            id="weightInput"
            type="number"
            value={input.weightMin}
            name="weightMin"
            onChange={handleChange}
            placeholder="Min "
          />

          <input
            id="weightInput"
            type="number"
            value={input.weightMax}
            name="weightMax"
            onChange={handleChange}
            placeholder="Max "
          />
        </div>

        {errors.weight && (
          <span className={styles.error}>{errors.weight} </span>
        )}
        {errors.tooHeavy && (
          <span className={styles.error}>{errors.tooHeavy} </span>
        )}
        <label key="lifeInput">Life span</label>

        <div className={styles.inputs}>
          <input
            id="lifeInput"
            type="number"
            value={input.life_spanMin}
            name="life_spanMin"
            onChange={handleChange}
            placeholder="Life Span Min "
          />

          <input
            id="lifeInput"
            type="number"
            value={input.life_spanMax}
            name="life_spanMax"
            onChange={handleChange}
            placeholder="Life Span Max "
          />
        </div>

        {errors.negatives && (
          <span className={styles.error}>{errors.negatives}</span>
        )}
        {errors.nan && <span className={styles.error}>{errors.nan} </span>}
        {errors.tooOld && (
          <span className={styles.error}>{errors.tooOld} </span>
        )}
        {errors.zero && <span className={styles.error}>{errors.zero} </span>}
        <label key="imageInput">Image</label>

        <input
          id="imageInput"
          type="text"
          value={input.image}
          name="image"
          onChange={handleChange}
          placeholder="Url "
        />
        {errors.url && <span className={styles.error}>{errors.url} </span>}
        <label key="tempsInput">Temperaments</label>
        <select className={styles.select} id="tempsInput" onChange={handleSelect}>
          {!input.temperament.length ? (
            <option>Select Temperament</option>
          ) : (
            <option disabled={true}>Select Temperament</option>
          )}

          {temperamen.map((temp) => {
            return (
              <option key={temp.name} value={temp.name}>
                {temp.name}{" "}
              </option>
            );
          })}
        </select>
        {Object.keys(errors).length ? (
          <div >
            <button type="submit" disabled={true} className={styles.btn_disabled}>
              Create
            </button>
          </div>
        ) : (
          <div>
            <button type="submit" className={styles.btn}>
              Create
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default CharacterCreate;