import React from "react";
import {
  Container,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const MainPage = () => {
  const [gender, setGender] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [names, setNames] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const createNationality = () => {
    let nationality;
    if (country === "Nepal") {
      return (nationality = "Nepali");
    } else if (country === "Germany") {
      return (nationality = "German");
    } else if (country === "France") {
      return (nationality = "French");
    } else if (country === "United-States") {
      return (nationality = "English");
    } else {
      return (nationality = "none");
    }
  };

  const handleClick = async () => {
    setLoading(true);
    const nationality = createNationality();
    const payload = {
      nationality,
      country,
      gender,
    };

    try {
      const randomNamesResponse = await axios.get(
        `https://fastapi-name-generator-production.up.railway.app/generate`,
        { params: { ...payload, count: 10 } }, // Cambiado de 5 a 10
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = randomNamesResponse.data.random_names;
      setNames(data);
    } catch (error) {
      const data = await error.data.err_message;
      setNames([data]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xl"
      className="h-screen w-full bg-gradient-to-r from-purple-900 to-purple-400 animated-gradient flex flex-col justify-center items-center"
    >
      <div className="flex justify-between items-center w-full p-4">
        <h5 className="text-white text-3xl font-bold">Programacion para internet -API</h5>
      </div>
      <div className="flex justify-center w-full">
        <h3 className="text-purple-600 font-bold mb-2 text-center text-5xl rounded-full inline-block p-8">
          Generador de Nombres con API
        </h3>
      </div>
      <p className="text-purple-300 text-center p-5 pt-10 text-2xl">
        Genera diez nombres dependiendo de la nacionalidad y del generado con FastAPI
      </p>
      <Container className="p-10 w-3/5 bg-purple-300 rounded-xl shadow-md m-10">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="country-label" className="text-blue-900">
                Country
              </InputLabel>
              <Select
                labelId="country-label"
                id="country-select"
                value={country}
                label="Country"
                className="text-blue-900"
                onChange={handleCountry}
              >
                <MenuItem value={"none"}>...</MenuItem>
                <MenuItem value={"France"}>France</MenuItem>
                <MenuItem value={"United-States"}>United States</MenuItem>
                <MenuItem value={"Germany"}>Germany</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="gender-label" className="text-white">
                Genero
              </InputLabel>
              <Select
                labelId="gender-label"
                id="gender-select"
                value={gender}
                label="Gender"
                className="text-blue-900"
                onChange={handleGender}
              >
                <MenuItem value={"none"}>......</MenuItem>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleClick}
            className="bg-purple-500 hover:bg-blue-900 text-white font-bold py-2 px-4 border-b-4 border-blue-900 hover:border-green-500 rounded-full w-1/3"
          >
            Generar los nombres
          </button>
        </div>
      </Container>
      <div className="text-center p-10 text-3xl text-purple-300">
        {loading ? (
          <CircularProgress
            color="inherit"
            sx={{ color: "yellow" }}
            className="animate-spin"
          />
        ) : (
          names.length > 0 && (
            <>
              Nombres Obtenidos:{" "}
              {names.map((name, index) => (
                <span
                  key={index}
                  className="text-white font-bold bg-purple-500 p-3 rounded-full mx-2 text-base"
                >
                  {name}
                </span>
              ))}
            </>
          )
        )}
      </div>
      <footer className="text-center text-white p-4">
        <p>Hecho por Said Omar Hernández Grande</p>
      </footer>
    </Container>
  );
};

export default MainPage;
