// Create a simple React App that displays a list of countries and their capitals
// The app should have the following features:
//
// The list of countries and capitals should be fetched from an API
// The list should be displayed in the 'CountriesPage' component
// Each country should be displayed in a separate component
// The user should be able to filter the list by capital

// import a prebuilt Select

// To filter all countries, use the '/all' endpoint
// To filter by capital city, use the '/capital/{capital}' endpoint

const BASE_URL = "https://restcountries.com/v3.1";

const FILTERABLE_CAPITALS = [
  "Tallinn",
  "Helsinki",
  "Stockholm",
  "Oslo",
  "Copenhagen",
  "Reykjavik",
] as const;
type Capital = (typeof FILTERABLE_CAPITALS)[number];

interface Country {
  name: {
    common: string;
  };
  capital: string;
}

const CountriesPage = () => {
  return <div>React Interview</div>;
};

export default CountriesPage;
