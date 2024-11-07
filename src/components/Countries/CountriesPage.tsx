import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

// Create a simple React App that displays a list of countries and their capitals
// The app should have the following features:
//
// The list of countries and capitals should be fetched from an API
// The list should be displayed in the 'CountriesPage' component
// Each country should be displayed in a separate component
// The user should be able to filter the list by capital

// To get all countries, use the '/all' endpoint
// To filter by capital city, use the '/capital/{capital}' endpoint

interface Country {
  name: {
    common: string;
  };
  capital: string;
}

const BASE_URL = "https://restcountries.com/v3.1";

export const FILTERABLE_CAPITALS = [
  "Tallinn",
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Reykjavik",
] as const;
export type Capital = (typeof FILTERABLE_CAPITALS)[number];

const CountriesPage = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCapital, setSelectedCapital] = useState<string>("");

  const fetchAllCountries = async () => {
    try {
      const response = await axios(`${BASE_URL}/all`);
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchOneCountry = async (country: string) => {
    try {
      const response = await axios(`${BASE_URL}/capital/${country}`);
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    selectedCapital
      ? fetchOneCountry(selectedCapital as string)
      : fetchAllCountries();
  }, [selectedCapital]);

  const CountryCard = () => {
    return (
      <>
        {countries?.map((country) => (
          <ListItem disablePadding key={country.name.common}>
            <ListItemButton>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {country.name.common}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {country.capital}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </ListItemButton>
          </ListItem>
        ))}
      </>
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 560,
        bgcolor: "background.paper",
        padding: "24px",
        margin: "auto",
        borderRadius: "12px",
      }}
    >
      <List>
        <FormControl fullWidth>
          <InputLabel id="simple-input-label">Filter by Capital</InputLabel>
          <Select
            labelId="capital-select-label"
            id="capital-select"
            label="Capital"
            value={selectedCapital}
            onChange={(event) =>
              setSelectedCapital(event?.target.value as string)
            }
          >
            {FILTERABLE_CAPITALS.map((capital) => (
              <MenuItem key={capital} value={capital}>
                {capital}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <CountryCard />
      </List>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={fetchAllCountries}
        sx={{ margin: "20px 0" }}
        fullWidth
      >
        {" "}
        Show all cities
      </Button>
    </Box>
  );
};

export default CountriesPage;
