import React, {Component} from 'react';
import './styles.css'
import {connect} from "react-redux";
import {handlerGetCharacterByName, handlerGetInitialList} from "../../actions/kitsu";
import {DebounceInput} from "react-debounce-input";
import history from "../../helpers/history";
import ListCard from "../ListCard";
import LoadingSpin from "../LoadingSpin";

class CharacterList extends Component {
  state = {
    txtSearch: this.props.match.params.text || '',
    typed: false,
  }

  componentDidMount() {
    if (this.props.match.params.text) {
      this.props.handlerGetCharacterByName({name: this.props.match.params.text, number: this.props.match.params.number || 0});
    } else {
      this.props.handlerGetInitialList(this.props.match.params.number || 0)
    }
  }

  searchUserHandler = (txt) => {
    this.setState({
      txtSearch: txt,
    })
    if (txt === '') {
      this.props.handlerGetInitialList(0);
      history.push('/');
    } else {
      this.props.handlerGetCharacterByName({name: txt, number: 0});
      history.push(`/search/${txt}`);
    }
  }

  changePagination = (number = null, txt = null, action = null) => {
    if(number && !txt && !action){
      if(number === 1){
        this.props.handlerGetInitialList(0);
        history.push('/');
      } else {
        this.props.handlerGetInitialList(number);
        history.push(`/page/${number}`);
      }
    }
    if(number && !txt && action){
      if(action === 'next'){
        this.props.handlerGetInitialList(parseInt(number) + 1);
        history.push(`/page/${parseInt(number) + 1}`);
      } else {
        if((parseInt(number) - 1) === 1){
          this.props.handlerGetInitialList(0);
          history.push('/');
        } else {
          this.props.handlerGetInitialList(parseInt(number) - 1);
          history.push(`/page/${parseInt(number) - 1}`);
        }
      }
    }
    if(number && txt && !action){
      if(number === 1){
        this.props.handlerGetCharacterByName({name: txt, number: 0});
        history.push(`/search/${txt}`);
      } else {
        this.props.handlerGetCharacterByName({name: txt, number: number});
        history.push(`/search/${txt}/page/${number}`);
      }
    }
    if(number && txt && action){
      if(action === 'next'){
        this.props.handlerGetCharacterByName({name: txt, number: parseInt(number) + 1});
        history.push(`/search/${txt}/page/${parseInt(number) + 1}`);
      } else {
        if((parseInt(number) - 1) === 1){
          this.props.handlerGetCharacterByName({name: txt, number: 0});
          history.push(`/search/${txt}`);
        } else {
          this.props.handlerGetCharacterByName({name: txt, number: parseInt(number) - 1});
          history.push(`/search/${txt}/page/${parseInt(number) - 1}`);
        }
      }
    }
  }


  render() {
    const { match } = this.props;
    let pages = [
      {number: 1, onlyLg: false},
      {number: 2, onlyLg: false},
      {number: 3, onlyLg: false},
      {number: 4, onlyLg: true},
      {number: 5, onlyLg: true},
      {number: 6, onlyLg: true}
    ];
    const {kitsu} = this.props;
    if(kitsu.pagCount > 0){
      pages = [
        {number: 1, onlyLg: false},
        {number: 2, onlyLg: false},
        {number: 3, onlyLg: false},
        {number: 4, onlyLg: true},
        {number: 5, onlyLg: true},
        {number: 6, onlyLg: true}
      ];
      if(match.params.number && match.params.number !== 1){
        const plus = match.params.number;
        pages = [
          {number: 1 + (plus - 1), onlyLg: false},
          {number: 2 + (plus - 1), onlyLg: false},
          {number: 3 + (plus - 1), onlyLg: false},
          {number: 4 + (plus - 1), onlyLg: true},
          {number: 5 + (plus - 1), onlyLg: true},
          {number: 6 + (plus - 1), onlyLg: true}
        ];
      }
    }
    return (
      <div>
        <div className={'divSearchInput'}>
          <label className={'labelSearch'} htmlFor={'search-personagem'}>Nome do Personagem</label>
          <DebounceInput
            className={'inputSearch'}
            id={'search-personagem'}
            minLength={1}
            value={this.state.txtSearch}
            debounceTimeout={500}
            onChange={event => this.searchUserHandler(event.target.value)}/>
        </div>
        <div className={'listContainer'}>
          <div className={'listHeader'}>
            <div className={'firstHeader'}>Personagem</div>
            <div className={'secondHeader'}>Descricao</div>
          </div>
          {kitsu.loading ? (
            <LoadingSpin />
          ) : (
            <React.Fragment>
              {kitsu.characters.length === 0 && !kitsu.loading && (
                <div style={{width: '100%', textAlign: 'center', marginTop: 32, marginBottom: 32}}><span
                  style={{fontSize: 24}}>Nenhum resultado encontrado para "<strong>{this.state.txtSearch}</strong>"</span>
                </div>
              )}
            </React.Fragment>
          )}
          {kitsu.characters.map(a => (
            <ListCard key={a.id} data={a} />
          ))}
        </div>
        <div className={'paginationContainer'}>
          <ul className={'paginationUl'}>
            {match.params.number === 1 || !match.params.number ? (
              <li
                className={'paginationLiBack paginationLiBackDisabled'}/>
            ) : (
              <li
                onClick={() => this.changePagination(match.params.number, match.params.text, 'back')}
                className={'paginationLiBack'}/>
            )}
            {pages.map(a => (
              <React.Fragment key={a.number}>
                {a.onlyLg ? (
                  <li
                    onClick={() => this.changePagination(a.number, match.params.text)}
                    className={a.number === parseInt(match.params.number) ?
                      ('paginationLiItem paginationHover only-lg paginationLiItemActive') :
                      ('paginationLiItem paginationHover only-lg')
                    }>
                    {a.number}
                  </li>
                ) : (
                  <li
                    onClick={() => this.changePagination(a.number, match.params.text)}
                    className={a.number === parseInt(match.params.number) || (a.number === 1 && !match.params.number) ?
                      ('paginationLiItem paginationHover paginationLiItemActive') :
                      ('paginationLiItem paginationHover')
                    }>
                    {a.number}
                  </li>
                )}
              </React.Fragment>
            ))}
            <li
              onClick={() => this.changePagination(match.params.number || 1, match.params.text, 'next')}
              className={'paginationLiNext'}/>
          </ul>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handlerGetInitialList: (e) => dispatch(handlerGetInitialList(e)),
    handlerGetCharacterByName: (e) => dispatch(handlerGetCharacterByName(e)),
  }
}

function mapStateToProps({kitsu}) {

  return {
    kitsu,
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(CharacterList);
