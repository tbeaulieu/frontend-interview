import userEvent from "@testing-library/user-event";
import React, { useState, useEffect } from "react";
import { Link, useParams, withRouter } from 'react-router-dom';
import styled from 'styled-components';

/**
 * Once given an input, fetch the repositories we searched
 * via:
 *
 *    
 *
 * This should not kickoff a fetch for every keystroke, but rather when
 * typing stops.
 *
 * Documentation for the search api is here:
 * https://developer.github.com/v3/search/#search-repositories
 */

// The results should be displayed as cards or a list, containing at least the following info: 
// Full name | description | Stargazers Count | Open issues Count | match score1

const apiLink = "https://api.github.com/search/repositories?q="

const Repositories = ({ history }) => {
  const { id } = useParams();
  const [ searchResults, updateSearchResults ] = useState([]);
  const [ entryInfo, setEntryInfo] = useState(null);
  let searchTimer = null;


  let filterData = function (data, searchterm){
    return data.items.filter((entry) => entry.name === searchterm)[0];
  }

  let fetchRepositories = (searchTerm, allResults) => {
    fetch(apiLink+`{${searchTerm}}`)
      .then(response => response.json())
      .then(data => allResults ? updateSearchResults(data) : setEntryInfo(filterData(data, searchTerm)))
      .catch(error => console.error("There seems to be a problem with the fetch! ", error));
  }
  let checkForRepositories = (searchTerm) =>{
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function(){fetchRepositories(searchTerm, true)}, 500);
  }

  let pickRepository = () => {
    fetchRepositories(window.location.href.split('/').slice(-1)[0], false) //hacky split for fixing useparam updates.
  }

  useEffect(() => {
    history.listen(()=>{
      pickRepository();
    });
  }, []);
 
  return (
    <div>
      <input name="search-terms" onChange={(e)=> checkForRepositories(e.target.value)}/>
      {entryInfo !== null ? <EntryDetails entry={entryInfo}/> : ''} 
      {searchResults.items ? (
        <RepositorySearchResults searchResults={searchResults} />
      ) : (
        <div>Enter some text to search through some repositories</div>
      )}
    </div>
  );
};

export default withRouter(Repositories);

const ResultsContainer = styled.div`
  /* display: flex; */
  width: calc(100% - 5em);
  margin: 2em auto;
  a{
    color: black;
    text-decoration: none;
    &:hover{
      background-color: #eaeaea;
    }
  }
  .Entry{
    width:100%;
    border-bottom: 1px dotted #ccc;
    margin: 0 0 1em;
    padding: 0em;
    p{
      margin: 0;
      line-height: 1.4em;
    }
    .fullname{
      font-size: 1.5em;
      font-family: Arial, Helvetica, sans-serif;
    }

  }
`;

let RepositorySearchResults = (props) => {
  return(
    <ResultsContainer>
      {props.searchResults.items.map((entry, index) => 
          <Link to={`/repositories/${entry.name}`} key={index}>
            <div className="Entry">
              <p className="fullname">{entry.full_name}</p>
              <p className="description">{entry.description}</p>
              <p>Stargazers: {entry.stargazers_count}</p> 
              <p>Open Issues: {entry.open_issues}</p>
              <p>Match Score: {entry.score}</p>
            </div>
          </Link>
      )}
    </ResultsContainer>
  )
}

const Entry = styled.div`
    width:100%;
    padding: 1em;
    p{
      margin: 0;
      line-height: 1.4em
    }
    a{
      color: #000;
    }
    .fullname{
      font-size: 1.5em;
      font-family: Arial, Helvetica, sans-serif;
    }
`;

let EntryDetails = (props) => {
  let entry = props.entry;
  return(
    <Entry>
        <p className="fullname">{entry.full_name}</p>
        <p className="description">{entry.description}</p>
        <p>Stargazers: {entry.stargazers_count}</p> 
        <p>Open Issues: {entry.open_issues}</p>
        <p>Match Score: {entry.score}</p>
        <p><a href={entry.html_url + '/issues'}>Issues</a></p>
        <p><a href={entry.html_url + '/pulls'}>Pull Requests</a></p>
        {entry.license && <p>License: <a href={entry.license.url ?  entry.license.url : '#'}></a>{entry.license.name} SPD_IX{entry.license.spdx_id}</p>}
    </Entry>  
  )
}