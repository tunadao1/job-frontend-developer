import React from 'react';
import { searchVideo } from '../../services/YoutubeService';
import { searchAttractions } from '../../services/TicketMasterService';
import { useDispatch, useSelector } from 'react-redux';
import { 
  updateVideos,
  updateQuery
} from '../../actions/SearchActions';

import Icon from '@mdi/react'
import { mdiClose, mdiMagnify } from '@mdi/js'
import {
  Wrapper,
  Form,
  InputWrapper,
  Input,
  ClearButton,
  SearchIcon
} from './SearchBar.style';

const SearchBar = () => {
  const dispatch = useDispatch();
  const query = useSelector(state => state.query);

  const search = () => {
    searchVideo(query)
    .then(res => {
      dispatch(updateVideos(res.items));
    });
    searchAttractions(query)
    .then(res => {
      console.log(res);
    });
  }

  const handleFormSubmit = event => {
    if( event ) event.preventDefault();
    dispatch(updateVideos([]));
    search();
  }

  const handleChangeQuery = event => {
    const text = event.target.value;
    dispatch(updateQuery(text));
  }

  const clearQuery = () => dispatch(updateQuery(''));

  return (
    <Wrapper>
      <Form onSubmit={event => handleFormSubmit(event)}>
        <InputWrapper>
          {
            !!!query.length && (
              <SearchIcon>
                <Icon path={mdiMagnify}
                  size={1.5}
                />
              </SearchIcon>
            )
          }
          <Input
            placeholder="Search..."
            lenght={ query.length }
            onChange={event => handleChangeQuery(event)}
            value={ query }
          />
          {
            !!query.length && (
              <ClearButton onClick={() => clearQuery()}>
                <Icon path={mdiClose}
                  size={1.5}
                />
              </ClearButton>
            )
          }
        </InputWrapper>
      </Form>
    </Wrapper>
  )
};

export default SearchBar;