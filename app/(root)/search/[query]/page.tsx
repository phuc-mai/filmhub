import Navbar from "@components/Navbar";
import SearchResults from "@components/SearchResults";

const SearchPage = ({ params }: { params: { query: string } }) => {
  const search = params.query;
  
  return (
    <>
      <Navbar />
      <SearchResults query={search}/>
    </>
  );
};

export default SearchPage;
