import * as React from "react";

/**
 * Once given an input, fetch the repositories we searched
 * via:
 *
 * https://api.github.com/search/repositories?q={}
 *
 * This should not kickoff a fetch for every keystroke, but rather when
 * typing stops.
 *
 * Documentation for the search api is here:
 * https://developer.github.com/v3/search/#search-repositories
 */

const Repositories = () => {
  let searchResults;
  return (
    <div>
      <input name="search-terms" />
      {searchResults ? (
        <RepositorySearchResults searchResults={searchResults} />
      ) : (
        <div>Enter somee test to search github repositories</div>
      )}
    </div>
  );
};

export default Repositories;
